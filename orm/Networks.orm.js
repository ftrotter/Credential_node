//Generated by buildORM from the cred:Networks
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Networks', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    name: { type: Sequelize.STRING }
  },
	{freezeTableName: true}
)
}