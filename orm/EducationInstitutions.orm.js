//Generated by buildORM from the cred:EducationInstitutions
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EducationInstitutions', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    name: { type: Sequelize.STRING },
    code: { type: Sequelize.STRING },
    url: { type: Sequelize.STRING },
    Address_id: { type: Sequelize.INTEGER },
    Phone_id: { type: Sequelize.INTEGER }
  },
	{freezeTableName: true}
)
}
