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
 var flash = require('connect-flash');//not really sure what this is for, but it handles passport errors... 
 var util = require('util'); //nodes native util functions http://nodejs.org/api/util.html

 var passport = require('passport') // An authentication engine that works with express
  , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: 'http://cred.ft1.us:8010/auth/google/return',
    realm: 'http://cred.ft1.us:8010/'
  },
  function(identifier, profile, done) {

	var email,Users;
	prettyJSON(profile);

	login_email = profile.emails[0].value;
	prettyJSON(email);

	Users = ORM['Users'];

	Users.find({ where: {email: login_email}}).success( 
			function(ThisUser){

		prettyJSON('success I found this user.. now what?');
		done(null,profile);
	}); 

	

    //User.findOrCreate({ openId: identifier }, function(err, user) {
     // done(err, user);
    //});
  }
));


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


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


//initialize Twilio
var TwilioCapability = require('twilio-client-token');
var tc = new TwilioCapability(config.TwilioAccountSid, config.TwilioAuthToken);
tc.allowClientOutgoing('someRandomString');
var TwilioToken = tc.generate();


var Phaxio = require('phaxio'),
  phaxio = new Phaxio(config.PhaxioKey, config.PhaxioSecret),
  phaxioCallback = function(err,data){console.log(data);};


// change the dirname to where you keep your Sequelize files
var orm_dir = __dirname + '/orm/';

//initialize Seq
Sequelize = require('sequelize');
sequelize = new Sequelize(config.database,config.user,config.password);


//now that sequelize exists, we can load the full orm...
var ORM = require('./orm'); //will look for /orm/index.js

//prettyJSON(ORM.ModelCache);

/////////////////////////////////////////////////////
/////////////////// SECTION Routes /////////////////
///////////////////////////////////////////////////


function getORM(my_ORM,ORM_Type,req,res){

        var to_template = {};

	to_template.user = req.user;

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
                      	//lets rebuild the Cache for this key...
                      	//may not work on this load... but it will for the next one!!
                      	ORM.buildCache(this_key);	
                        this_contents = ORM.ModelCache[this_key];
                        to_template[this_key + "_array"] = {
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
			//lets add (id) at the end of each display, since some dont have names...
			//that might be all that shows sometimes..
                        this_instance_name = this_instance_name + " (" + this_instance.id +")";
                        this_instance.instance_name = this_instance_name;
                        new_instances.push(this_instance);
                });
                to_template['instances'] = new_instances;

		//alwaysLoadDocs(to_template,req,res);
                res.render('html',to_template); //which loads views/{Type}.dust 

        });

}



function alwaysLoadDocs(to_template,req,res){
	//no matter what, lets load all of the documents...
	
        ORM.Documents.findAll().success(function (all_documents) {

		to_template['Documents'] = all_documents;
	
		res.render('html',to_template); //which loads the html container...

	});
}


// Redirect the user to Google for authentication.  When complete, Google
// // will redirect the user back to the application at
// //     /auth/google/return
 app.get('/auth/google', passport.authenticate('google'));

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});



// // Google will redirect the user to this URL after authentication.  Finish
// // the process by verifying the assertion.  If valid, the user will be
// // logged in.  Otherwise, authentication has failed.
 app.get('/auth/google/return', 
   passport.authenticate('google', { successRedirect: '/',
                                       failureRedirect: '/login' }));

app.post('/Fax/:phone_id/', ensureAuthenticated, function(req, res){

	phone_id = parseInt(req.params.phone_id,10);

	message_to_fax = req.body.fax_message;

	ORM.Phones.find(phone_id).success(function (ThisPhone){

// comment out until we can properly test with good numbers
//		phaxio.sendFax({
//			to: ThisPhone.phone,
//			string_data: message_to_fax,
//			string_data_type: 'text'	
//		},phaxioCallback);

		res.send('Real faxing disabled for testing... Fax sent to' + ThisPhone.phone + ' with message <br>' + message_to_fax);
	});

});

app.get('/Fax/:phone_id/', ensureAuthenticated, function(req, res){

	var to_template = {};
	phone_id = parseInt(req.params.phone_id,10);
	ORM.Phones.find(phone_id).success(function (ThisPhone){
		to_template.Phone = ThisPhone;
		res.render('fax_form',to_template); //which loads the html container...
	});
});



app.get('/ProviderDash/', ensureAuthenticated, function(req, res){

        getORM(ORM.Providers,'Providers',req,res);

});

app.get('/ProviderDash/:id/', ensureAuthenticated, function(req, res){

        id = parseInt(req.params.id, 10);
        ORM.Providers.find(id).success(function (ThisProvider){

		//We need to load everything to do with particular providers here...
		//lets use async to load... well everything...
	
		async.parallel([
    			function(callback){
		ThisProvider.getProviderCarriers().success(function(theseCarriers) {
				callback(null,{carriers: theseCarriers});
				});
    			},
    			function(callback){
		ThisProvider.getProviderCoverages().success(function(theseCoverages) {
				callback(null,{coverages: theseCoverages});
		});
    			},
		],function(err, results){

			prettyJSON(results);
                	res.send("Well isnt that special??");
		
//     // the results array will equal ['one','two'] even though
//         // the second function had a shorter timeout.
         	});
	

        }); //this is the end of the function that loaded the provider...

        //prettyJSON(ORM.ModelCache);
        //
}); //end of ProviderDash with an id...
        //



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

	

        res.render('html_list', {user: req.user}); //which loads the index
});

app.post('/API/:ORM_Type/', ensureAuthenticated, function(req, res){
	ORM_Type = req.params.ORM_Type;
	My_ORM = ORM[ORM_Type];

	var what_happened = JSON.stringify(req.body, null, "\t");

	if(req.body.id !== ""){ //then this is an update..

		this_id = req.body.id;
		My_ORM.find({where: {id: this_id}}).success( function(gotThis){
                	gotThis.updateAttributes(req.body).success(function(new_object){
                //Save the object after getting the post from the form...
                        	res.send(ORM_Type + " saved <a href='/API/"+ORM_Type+"/"+this_id+"/'>return</a> <br> OBW here is what happened: <br> <pre>"+what_happened+" </pre>");
                });
		});
                
		

	}else{	
		//we are creating from scratch!!

		//we should override the UserId for both modify and create here!!

		My_ORM.create(req.body).success(function(new_object){
        	//Save the object after getting the post from the form...
                	res.send(ORM_Type + " saved <a href='/API/"+ORM_Type+"/'>return to list</a> <br> OBW here is what happened: <br> <pre>"+what_happened+" </pre>");
		});
	}
});


app.post('/DocumentNotification/',ensureAuthenticated, function(req, res){
	
	//lets see what we get...
	var result = JSON.parse(req.body.transloadit);

	prettyJSON(result);


	var thumb_url = result.results.thumb[0].ssl_url;
	var doc_url = result.results[':original'][0].ssl_url;

	ORM.Documents.create({
		'Provider_id': 1,
		'DocumentType_id': 1,
		'documentURL': doc_url,
		'imageURL': thumb_url,
		'container': 'wrangler',
		'filename': 'notsure',
		'token': 'itspublicfornow',
		'expiration_date': '2012-12-06 00:00:00'	
	}).error(function (err) {});

	res.send(200); //thanks!!	


});


//This what makes express into our webserver....
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



console.log("At the end..");



