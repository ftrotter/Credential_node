//Generated by buildORM from the cred:ProvidersProviderSpecialityses
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProvidersProviderSpecialityses', {
    ProviderSpeciality_id: { type: Sequelize.INTEGER  ,primaryKey: true },
    Provider_id: { type: Sequelize.INTEGER  ,primaryKey: true },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE }
  },
	{freezeTableName: true}
)
}
