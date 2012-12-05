///////////////////////////////////////////////////////////
////////////       SECTION: Initial Setup       //////////
/////////////////////////////////////////////////////////
//General setup functions that might be used in multiple places...

 var async = require('async'); //lets us run js in series, etc https://github.com/caolan/async
 var fs = require('fs'); //lets use the native file system functions
 var express = require('express'); //the express web application framework http://expressjs.com/
 var routes = require('./routes'); //seperate routes for express
 var http = require('http'); //the native http methods for node http://nodejs.org/api/http.html
 var path = require('path'); //native code to work with file paths
 var dust = require('dustjs-linkedin'); //We use the dust templating engine that is now supported by linkedin
 var cons = require('consolidate'); //A standard way to work with templating languages https://github.com/visionmedia/consolidate.js
 var passport = require('passport');// An authentication engine that works with express
 var flash = require('connect-flash');//not really sure what this is for, but it handles passport errors... 
 var util = require('util'); //nodes native util functions http://nodejs.org/api/util.html


//helps us with time calculations
var moment = require('moment');
//toSource converts JavaScript objects back to source
var toSource = require('tosource');

// Underscore is a library of simple utility functions for javascript
// like jquery it likes to have a really short object name, we use two underscores because of a possible node name collision.
var __ = require("underscore");

//cron is library that handles time tasks using the cron notation
var cronJob = require('cron').CronJob;


//Random helper functions!!
//a log pretty print function. Accepts a JS obj and prints it to the console
//even if it is self-referential or otherwise insane
function prettyJSON(obj) {
	console.log(JSON.stringify(obj, null, 2));
}
//Javascript does not allow for default arguments into functions
//this handles the problem for functions
//with unpredicatable arguments
function has_default(arg, def) {
   return (typeof arg == 'undefined' ? def : arg);
}



//////////////////////////////////////////////////////////
///////////////   SECTION: Data Functions    ////////////
////////////////////////////////////////////////////////

function getTypeRight(new_value){

        if(new_value == "true"){
                return true;
        }

        if(new_value == "false"){
                return false;
        }

        float_results = parseFloat(new_value);
        if (!isNaN(float_results)){
                return float_results; //its a number!!
        } else {
                return new_value; //its a string leave it alone..
        }

}



//////////////////////////////////////////////////////////
///////////////   SECTION: Time Functions    ////////////
////////////////////////////////////////////////////////
// functions having to do with cron, time or scheduling


///////////////// SECTION Express setup ///////////////
//////////////////////////////////////////////////////
//configure our express
var app = express();

//lets turn of the dust compression!!
dust.optimizers.format = function(ctx, node) { return node };


//we use consolidate to bring in dust support for express..
app.engine('dust', cons.dust);

app.configure(function(){
  app.set('port', process.env.PORT || 8010);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(express.cookieParser());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'knMv45s_as4G45sds_secret_string',
        cookie: { maxAge: 18000000 }}));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});



function ensureAuthenticated(req, res, next) {
	return next(); // we always say yes for now...
}

var HTMLCacheGLOBAL = {};
var ModelCacheGLOBAL = {};

function buildCache(ORM,select_name){

        var object_type;
        var select_html;
        var selected_col;
	var data_cache = [];
//add code for auto-complete detection engine...

        object_type = ORM.name;
	//if we passed in a select_name, use it, otherwise use the default
	select_name = has_default(select_name, object_type + "_id");
        select_html = "<select name='" + select_name + "'>\n";

	

	console.log("object_type: " + object_type + "\n");
	console.log("select_name: " + select_name + "\n");

        ORM.findAll().success(function(things) {

                __.each(things,function(a_thing){
                        //lets determine what the variable
                        //from the table should be the label for the
                        //select box...
                        if(selected_col === undefined){
                                selected = a_thing.attributes;
                                __.each(selected,function(key,value){
                                if(key.indexOf("name") !== -1){
                                        //then this is my select variable..
                                                selected_col = key;
                //                              console.log("inside key" + key);
                                        }
                                });
                        }

                        select_html = select_html               +
                                        "<option value='"       +
                                        a_thing.id              +
                                        "'>"                    +
                                a_thing[selected_col] + "</option>\n";
			my_value = a_thing[selected_col];			

			data_cache.push({
						id: a_thing.id,
						value: my_value
					});

                });
                select_html = select_html + "</select>\n";
                HTMLCacheGLOBAL[select_name] = select_html;
		ModelCacheGLOBAL[select_name] = data_cache;
        });


}



//this is what starts the back channel communications system for us..
//var io = require('socket.io').listen(3000);
/////////////////////////////////////////////////////
/////////////////// SECTION Routes /////////////////
///////////////////////////////////////////////////


// change the dirname to where you keep your Sequelize files
var orm_dir = __dirname + '/orm/';

//init yaml
require('js-yaml');

config = require(__dirname + '/config.yaml');


//initialize Seq
Sequelize = require('sequelize');
sequelize = new Sequelize(config.database,config.user,config.password);

app.get('/', ensureAuthenticated, function(req, res){
        //Create a new object here...
        res.render('list'); //which loads the index
});

//initialize Twilio
var TwilioCapability = require('twilio-client-token');
var tc = new TwilioCapability(config.TwilioAccountSid, config.TwilioAuthToken);
tc.allowClientOutgoing('someRandomString');
var TwilioToken = tc.generate();




