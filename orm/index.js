

var ModelCache = {};


//Javascript does not allow for default arguments into functions
//this handles the problem for functions
//with unpredicatable arguments
function has_default(arg, def) {
   return (typeof arg == 'undefined' ? def : arg);
}



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
                //HTMLCache[select_name] = select_html;
                ModelCache[select_name] = data_cache;
        });
}

exports.buildCache = buildCache;


//Begin autogenerated Objects...

//importing Addresss from table cred:Addresss
var Addresss = sequelize.import(__dirname + '/Addresss.orm.js');
exports.Addresss = Addresss;
// State_id looks like an association
// County_id looks like an association

//importing Boards from table cred:Boards
var Boards = sequelize.import(__dirname + '/Boards.orm.js');
exports.Boards = Boards;
// Address_id looks like an association
// Phone_id looks like an association
// Fax_Phone_id looks like an association

//importing Carriers from table cred:Carriers
var Carriers = sequelize.import(__dirname + '/Carriers.orm.js');
exports.Carriers = Carriers;

//importing Countys from table cred:Countys
var Countys = sequelize.import(__dirname + '/Countys.orm.js');
exports.Countys = Countys;

//importing CredentialOrganizations from table cred:CredentialOrganizations
var CredentialOrganizations = sequelize.import(__dirname + '/CredentialOrganizations.orm.js');
exports.CredentialOrganizations = CredentialOrganizations;

//importing DocumentTypes from table cred:DocumentTypes
var DocumentTypes = sequelize.import(__dirname + '/DocumentTypes.orm.js');
exports.DocumentTypes = DocumentTypes;

//importing Documents from table cred:Documents
var Documents = sequelize.import(__dirname + '/Documents.orm.js');
exports.Documents = Documents;
// Provider_id looks like an association
// DocumentType_id looks like an association

//importing EducationInstitutions from table cred:EducationInstitutions
var EducationInstitutions = sequelize.import(__dirname + '/EducationInstitutions.orm.js');
exports.EducationInstitutions = EducationInstitutions;
// Address_id looks like an association
// Phone_id looks like an association

//importing EducationLevels from table cred:EducationLevels
var EducationLevels = sequelize.import(__dirname + '/EducationLevels.orm.js');
exports.EducationLevels = EducationLevels;

//importing Genders from table cred:Genders
var Genders = sequelize.import(__dirname + '/Genders.orm.js');
exports.Genders = Genders;

//importing Networks from table cred:Networks
var Networks = sequelize.import(__dirname + '/Networks.orm.js');
exports.Networks = Networks;

//importing Notes from table cred:Notes
var Notes = sequelize.import(__dirname + '/Notes.orm.js');
exports.Notes = Notes;
// row_id looks like an association
// User_id looks like an association

//importing Phones from table cred:Phones
var Phones = sequelize.import(__dirname + '/Phones.orm.js');
exports.Phones = Phones;

//importing ProviderCarriers from table cred:ProviderCarriers
var ProviderCarriers = sequelize.import(__dirname + '/ProviderCarriers.orm.js');
exports.ProviderCarriers = ProviderCarriers;
// Provider_id looks like an association
// Carrier_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderCoverages from table cred:ProviderCoverages
var ProviderCoverages = sequelize.import(__dirname + '/ProviderCoverages.orm.js');
exports.ProviderCoverages = ProviderCoverages;
// Provider_id looks like an association
// State_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderCredentials from table cred:ProviderCredentials
var ProviderCredentials = sequelize.import(__dirname + '/ProviderCredentials.orm.js');
exports.ProviderCredentials = ProviderCredentials;
// Provider_id looks like an association
// CredentialOrganization_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderEducations from table cred:ProviderEducations
var ProviderEducations = sequelize.import(__dirname + '/ProviderEducations.orm.js');
exports.ProviderEducations = ProviderEducations;
// Provider_id looks like an association
// ProviderSpeciality_id looks like an association
// EducationInstitution_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderEducationsProviderEducations from table cred:ProviderEducationsProviderEducations
var ProviderEducationsProviderEducations = sequelize.import(__dirname + '/ProviderEducationsProviderEducations.orm.js');
exports.ProviderEducationsProviderEducations = ProviderEducationsProviderEducations;
// ProviderEducation_id looks like an association

//importing ProviderHospitals from table cred:ProviderHospitals
var ProviderHospitals = sequelize.import(__dirname + '/ProviderHospitals.orm.js');
exports.ProviderHospitals = ProviderHospitals;
// Provider_id looks like an association
// State_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderLicenses from table cred:ProviderLicenses
var ProviderLicenses = sequelize.import(__dirname + '/ProviderLicenses.orm.js');
exports.ProviderLicenses = ProviderLicenses;
// Provider_id looks like an association
// ProviderSpeciality_id looks like an association
// State_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderNetworks from table cred:ProviderNetworks
var ProviderNetworks = sequelize.import(__dirname + '/ProviderNetworks.orm.js');
exports.ProviderNetworks = ProviderNetworks;
// Provider_id looks like an association
// Network_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderReferences from table cred:ProviderReferences
var ProviderReferences = sequelize.import(__dirname + '/ProviderReferences.orm.js');
exports.ProviderReferences = ProviderReferences;
// Provider_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association

//importing ProviderSpecialitys from table cred:ProviderSpecialitys
var ProviderSpecialitys = sequelize.import(__dirname + '/ProviderSpecialitys.orm.js');
exports.ProviderSpecialitys = ProviderSpecialitys;
// Provider_id looks like an association
// Speciality_id looks like an association
// created_by_User_id looks like an association
// modified_by_User_id looks like an association
// Board_id looks like an association

//importing ProviderStatuss from table cred:ProviderStatuss
var ProviderStatuss = sequelize.import(__dirname + '/ProviderStatuss.orm.js');
exports.ProviderStatuss = ProviderStatuss;

//importing Providers from table cred:Providers
var Providers = sequelize.import(__dirname + '/Providers.orm.js');
exports.Providers = Providers;
// ProviderStatus_id looks like an association
// Birth_Address_id looks like an association
// Gender_id looks like an association
// Home_Phone_id looks like an association
// Home_Address_id looks like an association
// Corr_Phone_id looks like an association
// Corr_Address_id looks like an association
// Corr_Fax_Phone_id looks like an association

//importing ProvidersProviderSpecialityses from table cred:ProvidersProviderSpecialityses
var ProvidersProviderSpecialityses = sequelize.import(__dirname + '/ProvidersProviderSpecialityses.orm.js');
exports.ProvidersProviderSpecialityses = ProvidersProviderSpecialityses;
// ProviderSpeciality_id looks like an association
// Provider_id looks like an association

//importing Specialitys from table cred:Specialitys
var Specialitys = sequelize.import(__dirname + '/Specialitys.orm.js');
exports.Specialitys = Specialitys;

//importing States from table cred:States
var States = sequelize.import(__dirname + '/States.orm.js');
exports.States = States;

//importing TagLinks from table cred:TagLinks
var TagLinks = sequelize.import(__dirname + '/TagLinks.orm.js');
exports.TagLinks = TagLinks;
// row_id looks like an association
// Tag_id looks like an association
// User_id looks like an association

//importing Tags from table cred:Tags
var Tags = sequelize.import(__dirname + '/Tags.orm.js');
exports.Tags = Tags;

//importing Tests from table cred:Tests
var Tests = sequelize.import(__dirname + '/Tests.orm.js');
exports.Tests = Tests;
//I did not understand what to do with confusingdate
//I did not understand what to do with confusingenum

//importing Users from table cred:Users
var Users = sequelize.import(__dirname + '/Users.orm.js');
exports.Users = Users;

//importing rows from table cred:rows
var rows = sequelize.import(__dirname + '/rows.orm.js');
exports.rows = rows;

//importing taxonomys from table cred:taxonomys
var taxonomys = sequelize.import(__dirname + '/taxonomys.orm.js');
exports.taxonomys = taxonomys;


 //OK we have the objects.. Lets do the associations now.... 
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


//Providers.hasOne(
Providers.hasMany(
		Documents,
		{
//			as: 		'Provider_id', 
			foreignKey: 	'Provider_id'
		}
		);

buildCache(Providers,'Provider_id');


//DocumentTypes.hasOne(
DocumentTypes.hasMany(
		Documents,
		{
//			as: 		'DocumentType_id', 
			foreignKey: 	'DocumentType_id'
		}
		);

buildCache(DocumentTypes,'DocumentType_id');


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



//Now that we have content... lets export the Caches we built...
exports.ModelCache = ModelCache;


