

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




app.post('/API/DocumentTypes/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('DocumentTypes saved <a href='/'>home</a>');
});

app.get('/API/DocumentTypes/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'DocumentTypes';

	console.log(DocumentTypes.rawAttributes);

	__.each(DocumentTypes.rawAttributes,function(this_value,this_key){
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

        DocumentTypes.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/DocumentTypes.dust using Type


        });


});

app.get('/API/DocumentTypes/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('DocumentTypes'); //which loads views/DocumentTypes.dust
});




app.post('/API/Documents/', ensureAuthenticated, function(req, res){
	//Save the object after getting the post from the form...
	res.send('Documents saved <a href='/'>home</a>');
});

app.get('/API/Documents/', ensureAuthenticated, function(req, res){
	//Create a new object here...

	var to_template = {};

	to_template.Type = 'Documents';

	console.log(Documents.rawAttributes);

	__.each(Documents.rawAttributes,function(this_value,this_key){
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

        Documents.findAll().success(function (instances) {

                to_template['instances'] = instances;

                console.log('Just made this bad boy');
                prettyJSON(to_template);
                res.render('html',to_template); //which loads views/Documents.dust using Type


        });


});

app.get('/API/Documents/:id/', ensureAuthenticated, function(req, res){
	//LOAD SEQUELIZE HERE using id!!
  	res.render('Documents'); //which loads views/Documents.dust
});




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

