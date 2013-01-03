/// First load the config file from config.yaml
require('js-yaml');
config = require(__dirname + '/config.yaml');
//

// Underscore is a library of simple utility functions for javascript
// // like jquery it likes to have a really short object name, we use two underscores because of a possible node name collision.
__ = require("underscore");
//

//initialize Seq
Sequelize = require('sequelize');
sequelize = new Sequelize(config.database,config.user,config.password);

var ORM = require('./orm'); //will look for /orm/index.js

sequelize.sync({force: true});

