//Generated by buildORM from the cred:Countys
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Countys', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    name: { type: Sequelize.STRING }
  },
	{freezeTableName: true}
)
}
