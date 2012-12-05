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






//Begin autogenerated Objects...

//importing Addresss from table cred:Addresss
var Addresss = sequelize.import(orm_dir + 'Addresss.orm.js');
// State_id looks like an association
// County_id looks like an association


app.post('/API/Addresss/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Addresss saved <a href='/'>home</a>');
});

app.get('/API/Addresss/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Addresss';

	console.log(Addresss.rawAttributes);

	__.each(Addresss.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Addresss.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Addresss.dust using Type


        });


});

app.get('/API/Addresss/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Addresss'); //which loads views/Addresss.dust
});


//importing Boards from table cred:Boards
var Boards = sequelize.import(orm_dir + 'Boards.orm.js');
// Address_id looks like an association
// Phone_id looks like an association
// Fax_Phone_id looks like an association


app.post('/API/Boards/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Boards saved <a href='/'>home</a>');
});

app.get('/API/Boards/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Boards';

	console.log(Boards.rawAttributes);

	__.each(Boards.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Boards.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Boards.dust using Type


        });


});

app.get('/API/Boards/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Boards'); //which loads views/Boards.dust
});


//importing Carriers from table cred:Carriers
var Carriers = sequelize.import(orm_dir + 'Carriers.orm.js');


app.post('/API/Carriers/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Carriers saved <a href='/'>home</a>');
});

app.get('/API/Carriers/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Carriers';

	console.log(Carriers.rawAttributes);

	__.each(Carriers.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Carriers.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Carriers.dust using Type


        });


});

app.get('/API/Carriers/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Carriers'); //which loads views/Carriers.dust
});


//importing Countys from table cred:Countys
var Countys = sequelize.import(orm_dir + 'Countys.orm.js');


app.post('/API/Countys/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Countys saved <a href='/'>home</a>');
});

app.get('/API/Countys/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Countys';

	console.log(Countys.rawAttributes);

	__.each(Countys.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Countys.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Countys.dust using Type


        });


});

app.get('/API/Countys/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Countys'); //which loads views/Countys.dust
});


//importing CredentialOrganizations from table cred:CredentialOrganizations
var CredentialOrganizations = sequelize.import(orm_dir + 'CredentialOrganizations.orm.js');


app.post('/API/CredentialOrganizations/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('CredentialOrganizations saved <a href='/'>home</a>');
});

app.get('/API/CredentialOrganizations/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'CredentialOrganizations';

	console.log(CredentialOrganizations.rawAttributes);

	__.each(CredentialOrganizations.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        CredentialOrganizations.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/CredentialOrganizations.dust using Type


        });


});

app.get('/API/CredentialOrganizations/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('CredentialOrganizations'); //which loads views/CredentialOrganizations.dust
});


//importing EducationInstitutions from table cred:EducationInstitutions
var EducationInstitutions = sequelize.import(orm_dir + 'EducationInstitutions.orm.js');
// Address_id looks like an association
// Phone_id looks like an association


app.post('/API/EducationInstitutions/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('EducationInstitutions saved <a href='/'>home</a>');
});

app.get('/API/EducationInstitutions/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'EducationInstitutions';

	console.log(EducationInstitutions.rawAttributes);

	__.each(EducationInstitutions.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        EducationInstitutions.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/EducationInstitutions.dust using Type


        });


});

app.get('/API/EducationInstitutions/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('EducationInstitutions'); //which loads views/EducationInstitutions.dust
});


//importing EducationLevels from table cred:EducationLevels
var EducationLevels = sequelize.import(orm_dir + 'EducationLevels.orm.js');


app.post('/API/EducationLevels/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('EducationLevels saved <a href='/'>home</a>');
});

app.get('/API/EducationLevels/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'EducationLevels';

	console.log(EducationLevels.rawAttributes);

	__.each(EducationLevels.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        EducationLevels.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/EducationLevels.dust using Type


        });


});

app.get('/API/EducationLevels/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('EducationLevels'); //which loads views/EducationLevels.dust
});


//importing Genders from table cred:Genders
var Genders = sequelize.import(orm_dir + 'Genders.orm.js');


app.post('/API/Genders/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Genders saved <a href='/'>home</a>');
});

app.get('/API/Genders/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Genders';

	console.log(Genders.rawAttributes);

	__.each(Genders.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Genders.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Genders.dust using Type


        });


});

app.get('/API/Genders/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Genders'); //which loads views/Genders.dust
});


//importing Networks from table cred:Networks
var Networks = sequelize.import(orm_dir + 'Networks.orm.js');


app.post('/API/Networks/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Networks saved <a href='/'>home</a>');
});

app.get('/API/Networks/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Networks';

	console.log(Networks.rawAttributes);

	__.each(Networks.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Networks.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Networks.dust using Type


        });


});

app.get('/API/Networks/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Networks'); //which loads views/Networks.dust
});


//importing Notes from table cred:Notes
var Notes = sequelize.import(orm_dir + 'Notes.orm.js');
// row_id looks like an association
// User_id looks like an association


app.post('/API/Notes/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Notes saved <a href='/'>home</a>');
});

app.get('/API/Notes/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Notes';

	console.log(Notes.rawAttributes);

	__.each(Notes.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Notes.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Notes.dust using Type


        });


});

app.get('/API/Notes/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Notes'); //which loads views/Notes.dust
});


//importing Phones from table cred:Phones
var Phones = sequelize.import(orm_dir + 'Phones.orm.js');


app.post('/API/Phones/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Phones saved <a href='/'>home</a>');
});

app.get('/API/Phones/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Phones';

	console.log(Phones.rawAttributes);

	__.each(Phones.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Phones.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Phones.dust using Type


        });


});

app.get('/API/Phones/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Phones'); //which loads views/Phones.dust
});


//importing ProviderCarriers from table cred:ProviderCarriers
var ProviderCarriers = sequelize.import(orm_dir + 'ProviderCarriers.orm.js');
// Provider_id looks like an association
// Carrier_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderCarriers/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderCarriers saved <a href='/'>home</a>');
});

app.get('/API/ProviderCarriers/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderCarriers';

	console.log(ProviderCarriers.rawAttributes);

	__.each(ProviderCarriers.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderCarriers.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderCarriers.dust using Type


        });


});

app.get('/API/ProviderCarriers/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderCarriers'); //which loads views/ProviderCarriers.dust
});


//importing ProviderCoverages from table cred:ProviderCoverages
var ProviderCoverages = sequelize.import(orm_dir + 'ProviderCoverages.orm.js');
// Provider_id looks like an association
// State_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderCoverages/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderCoverages saved <a href='/'>home</a>');
});

app.get('/API/ProviderCoverages/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderCoverages';

	console.log(ProviderCoverages.rawAttributes);

	__.each(ProviderCoverages.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderCoverages.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderCoverages.dust using Type


        });


});

app.get('/API/ProviderCoverages/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderCoverages'); //which loads views/ProviderCoverages.dust
});


//importing ProviderCredentials from table cred:ProviderCredentials
var ProviderCredentials = sequelize.import(orm_dir + 'ProviderCredentials.orm.js');
// Provider_id looks like an association
// CredentialOrganization_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderCredentials/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderCredentials saved <a href='/'>home</a>');
});

app.get('/API/ProviderCredentials/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderCredentials';

	console.log(ProviderCredentials.rawAttributes);

	__.each(ProviderCredentials.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderCredentials.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderCredentials.dust using Type


        });


});

app.get('/API/ProviderCredentials/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderCredentials'); //which loads views/ProviderCredentials.dust
});


//importing ProviderEducations from table cred:ProviderEducations
var ProviderEducations = sequelize.import(orm_dir + 'ProviderEducations.orm.js');
// Provider_id looks like an association
// ProviderSpeciality_id looks like an association
// EducationInstitution_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderEducations/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderEducations saved <a href='/'>home</a>');
});

app.get('/API/ProviderEducations/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderEducations';

	console.log(ProviderEducations.rawAttributes);

	__.each(ProviderEducations.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderEducations.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderEducations.dust using Type


        });


});

app.get('/API/ProviderEducations/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderEducations'); //which loads views/ProviderEducations.dust
});


//importing ProviderEducationsProviderEducations from table cred:ProviderEducationsProviderEducations
var ProviderEducationsProviderEducations = sequelize.import(orm_dir + 'ProviderEducationsProviderEducations.orm.js');
// ProviderEducation_id looks like an association


app.post('/API/ProviderEducationsProviderEducations/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderEducationsProviderEducations saved <a href='/'>home</a>');
});

app.get('/API/ProviderEducationsProviderEducations/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderEducationsProviderEducations';

	console.log(ProviderEducationsProviderEducations.rawAttributes);

	__.each(ProviderEducationsProviderEducations.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderEducationsProviderEducations.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderEducationsProviderEducations.dust using Type


        });


});

app.get('/API/ProviderEducationsProviderEducations/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderEducationsProviderEducations'); //which loads views/ProviderEducationsProviderEducations.dust
});


//importing ProviderHospitals from table cred:ProviderHospitals
var ProviderHospitals = sequelize.import(orm_dir + 'ProviderHospitals.orm.js');
// Provider_id looks like an association
// State_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderHospitals/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderHospitals saved <a href='/'>home</a>');
});

app.get('/API/ProviderHospitals/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderHospitals';

	console.log(ProviderHospitals.rawAttributes);

	__.each(ProviderHospitals.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderHospitals.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderHospitals.dust using Type


        });


});

app.get('/API/ProviderHospitals/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderHospitals'); //which loads views/ProviderHospitals.dust
});


//importing ProviderLicenses from table cred:ProviderLicenses
var ProviderLicenses = sequelize.import(orm_dir + 'ProviderLicenses.orm.js');
// Provider_id looks like an association
// ProviderSpeciality_id looks like an association
// State_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderLicenses/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderLicenses saved <a href='/'>home</a>');
});

app.get('/API/ProviderLicenses/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderLicenses';

	console.log(ProviderLicenses.rawAttributes);

	__.each(ProviderLicenses.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderLicenses.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderLicenses.dust using Type


        });


});

app.get('/API/ProviderLicenses/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderLicenses'); //which loads views/ProviderLicenses.dust
});


//importing ProviderNetworks from table cred:ProviderNetworks
var ProviderNetworks = sequelize.import(orm_dir + 'ProviderNetworks.orm.js');
// Provider_id looks like an association
// Network_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderNetworks/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderNetworks saved <a href='/'>home</a>');
});

app.get('/API/ProviderNetworks/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderNetworks';

	console.log(ProviderNetworks.rawAttributes);

	__.each(ProviderNetworks.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderNetworks.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderNetworks.dust using Type


        });


});

app.get('/API/ProviderNetworks/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderNetworks'); //which loads views/ProviderNetworks.dust
});


//importing ProviderReferences from table cred:ProviderReferences
var ProviderReferences = sequelize.import(orm_dir + 'ProviderReferences.orm.js');
// Provider_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association


app.post('/API/ProviderReferences/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderReferences saved <a href='/'>home</a>');
});

app.get('/API/ProviderReferences/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderReferences';

	console.log(ProviderReferences.rawAttributes);

	__.each(ProviderReferences.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderReferences.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderReferences.dust using Type


        });


});

app.get('/API/ProviderReferences/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderReferences'); //which loads views/ProviderReferences.dust
});


//importing ProviderSpecialitys from table cred:ProviderSpecialitys
var ProviderSpecialitys = sequelize.import(orm_dir + 'ProviderSpecialitys.orm.js');
// Provider_id looks like an association
// Speciality_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association
// Board_id looks like an association


app.post('/API/ProviderSpecialitys/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderSpecialitys saved <a href='/'>home</a>');
});

app.get('/API/ProviderSpecialitys/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderSpecialitys';

	console.log(ProviderSpecialitys.rawAttributes);

	__.each(ProviderSpecialitys.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderSpecialitys.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderSpecialitys.dust using Type


        });


});

app.get('/API/ProviderSpecialitys/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderSpecialitys'); //which loads views/ProviderSpecialitys.dust
});


//importing ProviderStatuss from table cred:ProviderStatuss
var ProviderStatuss = sequelize.import(orm_dir + 'ProviderStatuss.orm.js');


app.post('/API/ProviderStatuss/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProviderStatuss saved <a href='/'>home</a>');
});

app.get('/API/ProviderStatuss/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProviderStatuss';

	console.log(ProviderStatuss.rawAttributes);

	__.each(ProviderStatuss.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProviderStatuss.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProviderStatuss.dust using Type


        });


});

app.get('/API/ProviderStatuss/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProviderStatuss'); //which loads views/ProviderStatuss.dust
});


//importing Providers from table cred:Providers
var Providers = sequelize.import(orm_dir + 'Providers.orm.js');
// ProviderStatus_id looks like an association
// Birth_Address_id looks like an association
// Gender_id looks like an association
// Home_Phone_id looks like an association
// Home_Address_id looks like an association
// Corr_Phone_id looks like an association
// Corr_Address_id looks like an association
// Corr_Fax_Phone_id looks like an association


app.post('/API/Providers/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Providers saved <a href='/'>home</a>');
});

app.get('/API/Providers/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Providers';

	console.log(Providers.rawAttributes);

	__.each(Providers.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Providers.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Providers.dust using Type


        });


});

app.get('/API/Providers/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Providers'); //which loads views/Providers.dust
});


//importing ProvidersProviderSpecialityses from table cred:ProvidersProviderSpecialityses
var ProvidersProviderSpecialityses = sequelize.import(orm_dir + 'ProvidersProviderSpecialityses.orm.js');
// ProviderSpeciality_id looks like an association
// Provider_id looks like an association


app.post('/API/ProvidersProviderSpecialityses/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('ProvidersProviderSpecialityses saved <a href='/'>home</a>');
});

app.get('/API/ProvidersProviderSpecialityses/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'ProvidersProviderSpecialityses';

	console.log(ProvidersProviderSpecialityses.rawAttributes);

	__.each(ProvidersProviderSpecialityses.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        ProvidersProviderSpecialityses.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/ProvidersProviderSpecialityses.dust using Type


        });


});

app.get('/API/ProvidersProviderSpecialityses/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('ProvidersProviderSpecialityses'); //which loads views/ProvidersProviderSpecialityses.dust
});


//importing Specialitys from table cred:Specialitys
var Specialitys = sequelize.import(orm_dir + 'Specialitys.orm.js');
// taxonomy_id looks like an association


app.post('/API/Specialitys/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Specialitys saved <a href='/'>home</a>');
});

app.get('/API/Specialitys/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Specialitys';

	console.log(Specialitys.rawAttributes);

	__.each(Specialitys.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Specialitys.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Specialitys.dust using Type


        });


});

app.get('/API/Specialitys/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Specialitys'); //which loads views/Specialitys.dust
});


//importing States from table cred:States
var States = sequelize.import(orm_dir + 'States.orm.js');


app.post('/API/States/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('States saved <a href='/'>home</a>');
});

app.get('/API/States/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'States';

	console.log(States.rawAttributes);

	__.each(States.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        States.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/States.dust using Type


        });


});

app.get('/API/States/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('States'); //which loads views/States.dust
});


//importing TagLinks from table cred:TagLinks
var TagLinks = sequelize.import(orm_dir + 'TagLinks.orm.js');
// row_id looks like an association
// Tag_id looks like an association
// User_id looks like an association


app.post('/API/TagLinks/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('TagLinks saved <a href='/'>home</a>');
});

app.get('/API/TagLinks/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'TagLinks';

	console.log(TagLinks.rawAttributes);

	__.each(TagLinks.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        TagLinks.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/TagLinks.dust using Type


        });


});

app.get('/API/TagLinks/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('TagLinks'); //which loads views/TagLinks.dust
});


//importing Tags from table cred:Tags
var Tags = sequelize.import(orm_dir + 'Tags.orm.js');


app.post('/API/Tags/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Tags saved <a href='/'>home</a>');
});

app.get('/API/Tags/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Tags';

	console.log(Tags.rawAttributes);

	__.each(Tags.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Tags.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Tags.dust using Type


        });


});

app.get('/API/Tags/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Tags'); //which loads views/Tags.dust
});


//importing Tests from table cred:Tests
var Tests = sequelize.import(orm_dir + 'Tests.orm.js');
//I did not understand what to do with confusingdate
//I did not understand what to do with confusingenum


app.post('/API/Tests/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Tests saved <a href='/'>home</a>');
});

app.get('/API/Tests/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Tests';

	console.log(Tests.rawAttributes);

	__.each(Tests.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Tests.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Tests.dust using Type


        });


});

app.get('/API/Tests/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Tests'); //which loads views/Tests.dust
});


//importing Users from table cred:Users
var Users = sequelize.import(orm_dir + 'Users.orm.js');


app.post('/API/Users/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Users saved <a href='/'>home</a>');
});

app.get('/API/Users/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Users';

	console.log(Users.rawAttributes);

	__.each(Users.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        Users.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Users.dust using Type


        });


});

app.get('/API/Users/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Users'); //which loads views/Users.dust
});


//importing rows from table cred:rows
var rows = sequelize.import(orm_dir + 'rows.orm.js');


app.post('/API/rows/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('rows saved <a href='/'>home</a>');
});

app.get('/API/rows/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'rows';

	console.log(rows.rawAttributes);

	__.each(rows.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        rows.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/rows.dust using Type


        });


});

app.get('/API/rows/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('rows'); //which loads views/rows.dust
});


//importing taxonomys from table cred:taxonomys
var taxonomys = sequelize.import(orm_dir + 'taxonomys.orm.js');


app.post('/API/taxonomys/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('taxonomys saved <a href='/'>home</a>');
});

app.get('/API/taxonomys/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'taxonomys';

	console.log(taxonomys.rawAttributes);

	__.each(taxonomys.rawAttributes,function(this_value,this_key){
		if( typeof ModelCacheGLOBAL[this_key] != 'undefined'){
			//then this is a select box
			//or something...
			this_contents = ModelCacheGLOBAL[this_key];
			to_template[this_key] = {			
				is_array: true,
				contents: this_contents
			};
		}else{
			//nothing here... wait for any actual values...
		}
	});

        taxonomys.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/taxonomys.dust using Type


        });


});

app.get('/API/taxonomys/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('taxonomys'); //which loads views/taxonomys.dust
});




//This what makes express into our webserver....
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//States.hasOne(
States.hasMany(
		Addresss,
		{
//			as: 		'State_id', 
			foreignKey: 	'State_id'
		}
		);

buildCache(States,'State_id');


//Countys.hasOne(
Countys.hasMany(
		Addresss,
		{
//			as: 		'County_id', 
			foreignKey: 	'County_id'
		}
		);

buildCache(Countys,'County_id');


//Addresss.hasOne(
Addresss.hasMany(
		Boards,
		{
//			as: 		'Address_id', 
			foreignKey: 	'Address_id'
		}
		);

buildCache(Addresss,'Address_id');


//Phones.hasOne(
Phones.hasMany(
		Boards,
		{
//			as: 		'Phone_id', 
			foreignKey: 	'Phone_id'
		}
		);

buildCache(Phones,'Phone_id');


//Phones.hasOne(
Phones.hasMany(
		Boards,
		{
//			as: 		'Fax_Phone_id', 
			foreignKey: 	'Fax_Phone_id'
		}
		);

buildCache(Phones,'Fax_Phone_id');


//Addresss.hasOne(
Addresss.hasMany(
		EducationInstitutions,
		{
//			as: 		'Address_id', 
			foreignKey: 	'Address_id'
		}
		);

buildCache(Addresss,'Address_id');


//Phones.hasOne(
Phones.hasMany(
		EducationInstitutions,
		{
//			as: 		'Phone_id', 
			foreignKey: 	'Phone_id'
		}
		);

buildCache(Phones,'Phone_id');


//rows.hasOne(
rows.hasMany(
		Notes,
		{
//			as: 		'row_id', 
			foreignKey: 	'row_id'
		}
		);

buildCache(rows,'row_id');


//Users.hasOne(
Users.hasMany(
		Notes,
		{
//			as: 		'User_id', 
			foreignKey: 	'User_id'
		}
		);

buildCache(Users,'User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderCarriers,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//Carriers.hasOne(
Carriers.hasMany(
		ProviderCarriers,
		{
//			as: 		'Carrier_id', 
			foreignKey: 	'Carrier_id'
		}
		);

buildCache(Carriers,'Carrier_id');


//Users.hasOne(
Users.hasMany(
		ProviderCarriers,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderCarriers,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderCoverages,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//States.hasOne(
States.hasMany(
		ProviderCoverages,
		{
//			as: 		'State_id', 
			foreignKey: 	'State_id'
		}
		);

buildCache(States,'State_id');


//Users.hasOne(
Users.hasMany(
		ProviderCoverages,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderCoverages,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderCredentials,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//CredentialOrganizations.hasOne(
CredentialOrganizations.hasMany(
		ProviderCredentials,
		{
//			as: 		'CredentialOrganization_id', 
			foreignKey: 	'CredentialOrganization_id'
		}
		);

buildCache(CredentialOrganizations,'CredentialOrganization_id');


//Users.hasOne(
Users.hasMany(
		ProviderCredentials,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderCredentials,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderEducations,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//ProviderSpecialitys.hasOne(
ProviderSpecialitys.hasMany(
		ProviderEducations,
		{
//			as: 		'ProviderSpeciality_id', 
			foreignKey: 	'ProviderSpeciality_id'
		}
		);

buildCache(ProviderSpecialitys,'ProviderSpeciality_id');


//EducationInstitutions.hasOne(
EducationInstitutions.hasMany(
		ProviderEducations,
		{
//			as: 		'EducationInstitution_id', 
			foreignKey: 	'EducationInstitution_id'
		}
		);

buildCache(EducationInstitutions,'EducationInstitution_id');


//Users.hasOne(
Users.hasMany(
		ProviderEducations,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderEducations,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//ProviderEducations.hasOne(
ProviderEducations.hasMany(
		ProviderEducationsProviderEducations,
		{
//			as: 		'ProviderEducation_id', 
			foreignKey: 	'ProviderEducation_id'
		}
		);

buildCache(ProviderEducations,'ProviderEducation_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderHospitals,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//States.hasOne(
States.hasMany(
		ProviderHospitals,
		{
//			as: 		'State_id', 
			foreignKey: 	'State_id'
		}
		);

buildCache(States,'State_id');


//Users.hasOne(
Users.hasMany(
		ProviderHospitals,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderHospitals,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderLicenses,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//ProviderSpecialitys.hasOne(
ProviderSpecialitys.hasMany(
		ProviderLicenses,
		{
//			as: 		'ProviderSpeciality_id', 
			foreignKey: 	'ProviderSpeciality_id'
		}
		);

buildCache(ProviderSpecialitys,'ProviderSpeciality_id');


//States.hasOne(
States.hasMany(
		ProviderLicenses,
		{
//			as: 		'State_id', 
			foreignKey: 	'State_id'
		}
		);

buildCache(States,'State_id');


//Users.hasOne(
Users.hasMany(
		ProviderLicenses,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderLicenses,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderNetworks,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//Networks.hasOne(
Networks.hasMany(
		ProviderNetworks,
		{
//			as: 		'Network_id', 
			foreignKey: 	'Network_id'
		}
		);

buildCache(Networks,'Network_id');


//Users.hasOne(
Users.hasMany(
		ProviderNetworks,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderNetworks,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderReferences,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//Users.hasOne(
Users.hasMany(
		ProviderReferences,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderReferences,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Providers.hasOne(
Providers.hasMany(
		ProviderSpecialitys,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//Specialitys.hasOne(
Specialitys.hasMany(
		ProviderSpecialitys,
		{
//			as: 		'Speciality_id', 
			foreignKey: 	'Speciality_id'
		}
		);

buildCache(Specialitys,'Speciality_id');


//Users.hasOne(
Users.hasMany(
		ProviderSpecialitys,
		{
//			as: 		'created_by_User_id', 
			foreignKey: 	'created_by_User_id'
		}
		);

buildCache(Users,'created_by_User_id');


//Users.hasOne(
Users.hasMany(
		ProviderSpecialitys,
		{
//			as: 		'modified_by_User_id', 
			foreignKey: 	'modified_by_User_id'
		}
		);

buildCache(Users,'modified_by_User_id');


//Boards.hasOne(
Boards.hasMany(
		ProviderSpecialitys,
		{
//			as: 		'Board_id', 
			foreignKey: 	'Board_id'
		}
		);

buildCache(Boards,'Board_id');


//ProviderStatuss.hasOne(
ProviderStatuss.hasMany(
		Providers,
		{
//			as: 		'ProviderStatus_id', 
			foreignKey: 	'ProviderStatus_id'
		}
		);

buildCache(ProviderStatuss,'ProviderStatus_id');


//Addresss.hasOne(
Addresss.hasMany(
		Providers,
		{
//			as: 		'Birth_Address_id', 
			foreignKey: 	'Birth_Address_id'
		}
		);

buildCache(Addresss,'Birth_Address_id');


//Genders.hasOne(
Genders.hasMany(
		Providers,
		{
//			as: 		'Gender_id', 
			foreignKey: 	'Gender_id'
		}
		);

buildCache(Genders,'Gender_id');


//Phones.hasOne(
Phones.hasMany(
		Providers,
		{
//			as: 		'Home_Phone_id', 
			foreignKey: 	'Home_Phone_id'
		}
		);

buildCache(Phones,'Home_Phone_id');


//Addresss.hasOne(
Addresss.hasMany(
		Providers,
		{
//			as: 		'Home_Address_id', 
			foreignKey: 	'Home_Address_id'
		}
		);

buildCache(Addresss,'Home_Address_id');


//Phones.hasOne(
Phones.hasMany(
		Providers,
		{
//			as: 		'Corr_Phone_id', 
			foreignKey: 	'Corr_Phone_id'
		}
		);

buildCache(Phones,'Corr_Phone_id');


//Addresss.hasOne(
Addresss.hasMany(
		Providers,
		{
//			as: 		'Corr_Address_id', 
			foreignKey: 	'Corr_Address_id'
		}
		);

buildCache(Addresss,'Corr_Address_id');


//Phones.hasOne(
Phones.hasMany(
		Providers,
		{
//			as: 		'Corr_Fax_Phone_id', 
			foreignKey: 	'Corr_Fax_Phone_id'
		}
		);

buildCache(Phones,'Corr_Fax_Phone_id');


//ProviderSpecialitys.hasOne(
ProviderSpecialitys.hasMany(
		ProvidersProviderSpecialityses,
		{
//			as: 		'ProviderSpeciality_id', 
			foreignKey: 	'ProviderSpeciality_id'
		}
		);

buildCache(ProviderSpecialitys,'ProviderSpeciality_id');


//Providers.hasOne(
Providers.hasMany(
		ProvidersProviderSpecialityses,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//taxonomys.hasOne(
taxonomys.hasMany(
		Specialitys,
		{
//			as: 		'taxonomy_id', 
			foreignKey: 	'taxonomy_id'
		}
		);

buildCache(taxonomys,'taxonomy_id');


//rows.hasOne(
rows.hasMany(
		TagLinks,
		{
//			as: 		'row_id', 
			foreignKey: 	'row_id'
		}
		);

buildCache(rows,'row_id');


//Tags.hasOne(
Tags.hasMany(
		TagLinks,
		{
//			as: 		'Tag_id', 
			foreignKey: 	'Tag_id'
		}
		);

buildCache(Tags,'Tag_id');


//Users.hasOne(
Users.hasMany(
		TagLinks,
		{
//			as: 		'User_id', 
			foreignKey: 	'User_id'
		}
		);

buildCache(Users,'User_id');

