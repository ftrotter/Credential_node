//Generated by buildORM from the cred:ProviderSpecialitys
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProviderSpecialitys', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    Provider_id: { type: Sequelize.INTEGER },
    is_primary: { type: Sequelize.BOOLEAN },
    Speciality_id: { type: Sequelize.INTEGER },
    created_by_User_id: { type: Sequelize.INTEGER },
    modified_by_User_id: { type: Sequelize.INTEGER },
    Board_id: { type: Sequelize.INTEGER },
    initial_cert_date: { type: Sequelize.DATE },
    recertification_date: { type: Sequelize.DATE },
    expiration_date: { type: Sequelize.DATE },
    hmo: { type: Sequelize.BOOLEAN },
    ppo: { type: Sequelize.BOOLEAN },
    pos: { type: Sequelize.BOOLEAN }
  },
	{freezeTableName: true}
)
}