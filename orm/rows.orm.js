//Generated by buildORM from the cred:rows
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rows', {
    id: { type: Sequelize.INTEGER },
    notused: { type: Sequelize.INTEGER }
  },
	{freezeTableName: true}
)
}