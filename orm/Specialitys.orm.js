//Generated by buildORM from the cred:Specialitys
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Specialitys', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    name: { type: Sequelize.STRING },
    abbreviation: { type: Sequelize.STRING },
    taxonomy_id: { type: Sequelize.INTEGER }
  },
	{freezeTableName: true}
)
}