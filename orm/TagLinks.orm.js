//Generated by buildORM from the cred:TagLinks
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TagLinks', {
    id: { type: Sequelize.INTEGER },
    table: { type: Sequelize.STRING },
    row_id: { type: Sequelize.INTEGER },
    Tag_id: { type: Sequelize.INTEGER },
    User_id: { type: Sequelize.INTEGER }
  },
	{freezeTableName: true}
)
}