//Generated by buildORM from the cred:rows
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rows', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    notused: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE }
  },
	{freezeTableName: true}
)
}
