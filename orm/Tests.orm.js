//Generated by buildORM from the cred:Tests
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tests', {
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    description: { type: Sequelize.TEXT },
    somenumber: { type: Sequelize.INTEGER },
    somefloat: { type: Sequelize.FLOAT },
    normaltrue: { type: Sequelize.BOOLEAN },
    confusingtrue: { type: Sequelize.BOOLEAN },
    okdate: { type: Sequelize.DATE },
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE }
  },
	{freezeTableName: true}
)
}
