//init yaml
require('js-yaml');

config = require(__dirname + '/config.yaml');

var _mysql = require('mysql');

var mysql = _mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: config.user,
	password: config.password
	});

mysql.connect();

var state_object = {};


mysql.query('SELECT * FROM  `cred`.`States` ',
function(err, result, fields) {
    if (err) throw err;
    else {
        console.log('States');
        console.log('----------------------------------');
        for (var i in result) {
            	var state = result[i];
            	console.log(state.state_abbr +': '+ state.id);
		state_object[state.state_abbr] = state.id;
        }
    }
});

//this lets you store the ids of the states in memory, 
//since the states are stored often directly in the db
//this will help for many migrations i.e..

mysql.query('SELECT * FROM  `ipa_dbo_backup`.`providerlicenses`  ',
function(err, result, fields) {
    if (err) throw err;
    else {
        console.log('Licenses');
        console.log('----------------------------------');
        for (var i in result) {
                var license = result[i];
                console.log(license.ProviderID +': '+ license.LicenseNumber);

		//now we do our state lookup 
		
		var this_state_id = state_object[license.LicenseState];
		//now we have a number, instead of a code. woot!!!



                var new_sql = 'INSERT INTO `cred`.`ProviderLicenses` (`id`, `Provider_id`, `ProviderSpeciality_id`, `license_number`, `State_id`, `issue_date`, `expiration_date`, `created_by_User_id`, `modified_by_User_id`) VALUES ( NULL, ';

		//now lets add some data...
		new_sql = new_sql + 
		"'"+ license.ProviderID  +"'," +
		"'"+ license.LicenseCodeID + "'," +
		"'"+ license.LicenseNumber + "'," +
		"'"+ this_state_id + "'," +
		"'"+ license.IssueDate + "'," +
		"'"+ license.ExpirationDate + "'," +
		"'0', '0' );";

/// HERE is the SQL that you should be building...
/*
INSERT INTO `cred`.`ProviderLicenses` (`id`, `Provider_id`, `ProviderSpeciality_id`, `license_number`, `State_id`, `issue_date`, `expiration_date`, `created_by_User_id`, `modified_by_User_id`) VALUES (NULL, '1', '2', 'AAAA', '3', '2012-12-03 00:00:00', '2012-12-12 00:00:00', '0', '0');
		
*/

		console.log(new_sql + "\n");
		//Always log to be sure your SQL is right before running it..
/*
 		mysql.query(new_sql,
			function(err, result, fields) {
    				if (err) throw err;
			});
*/
        }
    }
});





mysql.end();


