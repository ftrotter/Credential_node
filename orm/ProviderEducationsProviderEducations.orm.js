//Generated by buildORM from the cred:ProviderEducationsProviderEducations
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProviderEducationsProviderEducations', {
    ProviderEducation_id: { type: Sequelize.INTEGER  ,primaryKey: true },
    ProviderEducationsId: { type: Sequelize.INTEGER  ,primaryKey: true },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE }
  },
	{freezeTableName: true}
)
}
