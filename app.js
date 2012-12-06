/// First load the config file from config.yaml
require('js-yaml');
config = require(__dirname + '/config.yaml');

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
 dust.helper = require('dustjs-helpers'); //We use the dust templating engine that is now supported by linkedin
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
__ = require("underscore");

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


//initialize Twilio
var TwilioCapability = require('twilio-client-token');
var tc = new TwilioCapability(config.TwilioAccountSid, config.TwilioAuthToken);
tc.allowClientOutgoing('someRandomString');
var TwilioToken = tc.generate();



// change the dirname to where you keep your Sequelize files
var orm_dir = __dirname + '/orm/';

//initialize Seq
Sequelize = require('sequelize');
sequelize = new Sequelize(config.database,config.user,config.password);


//now that sequelize exists, we can load the full orm...
var ORM = require('./orm'); //will look for /orm/index.js

prettyJSON(ORM.ModelCache);

/////////////////////////////////////////////////////
/////////////////// SECTION Routes /////////////////
///////////////////////////////////////////////////


function getORM(my_ORM,ORM_Type,req,res){

        var to_template = {};



        if( typeof my_ORM['selectedValues'] != 'undefined'){
		//then this a populated ORM
		to_template = my_ORM['selectedValues'];	
	}

        to_template.Type = ORM_Type;
	my_Model = ORM[ORM_Type];

        __.each(my_Model.rawAttributes,function(this_value,this_key){
                if( typeof ORM.ModelCache[this_key] != 'undefined'){
                        //then this is a select box
                        //or something...
                        this_contents = ORM.ModelCache[this_key];
                        to_template[this_key] = {
                                is_array: true,
                                contents: this_contents
                        };
                }else{
                        //nothing here... wait for any actual values...
                }
        });

        console.log('Just made this bad boy');
        //prettyJSON(to_template);

        my_Model.findAll().success(function (instances) {

                var new_instances = [];
                var this_instance_name = '';
                __.each(instances, function(this_instance){
                        this_instance_name = '';
                        __.each(this_instance,function(this_value,this_key){
                                if(this_key.indexOf('name') !== -1){//then this field is a "name" of some kind..
                                        this_instance_name = this_instance_name + " " + this_value;
                                }
                        });
                        this_instance.instance_name = this_instance_name;
                        new_instances.push(this_instance);
                });
                to_template['instances'] = new_instances;

                res.render('html',to_template); //which loads views/Providers.dust using Type

        });

}

app.get('/API/:ORM_Type/', ensureAuthenticated, function(req, res){

	ORM_Type = req.params.ORM_Type;
	My_ORM = ORM[ORM_Type];
	getORM(My_ORM,ORM_Type,req,res);

});

app.get('/API/:ORM_Type/:id/', ensureAuthenticated, function(req, res){
	ORM_Type = req.params.ORM_Type;
	id = parseInt(req.params.id, 10);
	My_ORM = ORM[ORM_Type];
	My_ORM.find(id).success(function (LoadedORM){
		getORM(LoadedORM,ORM_Type,req,res);
	});


	//prettyJSON(ORM.ModelCache);

});

app.get('/', ensureAuthenticated, function(req, res){
        //Create a new object here...
        res.render('html_list'); //which loads the index
});

app.post('/API/:ORM_Type/', ensureAuthenticated, function(req, res){
	ORM_Type = req.params.ORM_Type;
	My_ORM = ORM[ORM_Type];

	var what_happened = JSON.stringify(req.body, null, "\t");
	

        //Save the object after getting the post from the form...
        res.send(ORM_Type + " saved <a href='/'>home</a> <br> OBW here what happened: <br> <pre>"+what_happened+" </pre>");
});







//This what makes express into our webserver....
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



console.log("At the end..");



