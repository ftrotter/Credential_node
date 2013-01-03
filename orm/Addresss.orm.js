//Generated by buildORM from the cred:Addresss
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Addresss', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    name: { type: Sequelize.STRING },
    line1: { type: Sequelize.STRING },
    line2: { type: Sequelize.STRING },
    zip: { type: Sequelize.INTEGER },
    State_id: { type: Sequelize.INTEGER },
    County_id: { type: Sequelize.INTEGER },
    created_by_User_id: { type: Sequelize.INTEGER },
    modified_by_User_id: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE }
  },
	{freezeTableName: true}
)
}
