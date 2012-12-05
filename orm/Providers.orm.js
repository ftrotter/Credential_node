//Generated by buildORM from the cred:Providers
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Providers', {
    id: { type: Sequelize.INTEGER  ,primaryKey: true },
    ProviderStatus_id: { type: Sequelize.INTEGER },
    source_name: { type: Sequelize.STRING },
    first_name: { type: Sequelize.STRING },
    last_name: { type: Sequelize.STRING },
    middle_name: { type: Sequelize.STRING },
    suffix: { type: Sequelize.STRING },
    maiden_name: { type: Sequelize.STRING },
    birth_date: { type: Sequelize.DATE },
    Birth_Address_id: { type: Sequelize.INTEGER },
    Gender_id: { type: Sequelize.INTEGER },
    pcp: { type: Sequelize.BOOLEAN },
    specialist: { type: Sequelize.BOOLEAN },
    Home_Phone_id: { type: Sequelize.INTEGER },
    Home_Address_id: { type: Sequelize.INTEGER },
    Corr_Phone_id: { type: Sequelize.INTEGER },
    Corr_Address_id: { type: Sequelize.INTEGER },
    Corr_Fax_Phone_id: { type: Sequelize.INTEGER },
    Corr_email: { type: Sequelize.STRING },
    comment: { type: Sequelize.STRING },
    signature_date: { type: Sequelize.DATE },
    dea_number: { type: Sequelize.STRING },
    dea_issue_date: { type: Sequelize.DATE },
    dea_exp_date: { type: Sequelize.DATE },
    dps_number: { type: Sequelize.INTEGER },
    dps_issue_date: { type: Sequelize.DATE },
    dps_exp_date: { type: Sequelize.DATE },
    upin: { type: Sequelize.INTEGER },
    npi: { type: Sequelize.INTEGER },
    pan: { type: Sequelize.INTEGER },
    provider_number: { type: Sequelize.INTEGER },
    group_npi: { type: Sequelize.INTEGER },
    medicare_number: { type: Sequelize.INTEGER },
    medicare_tpi_number: { type: Sequelize.INTEGER },
    ecfmg_number: { type: Sequelize.INTEGER },
    ecfmg_issue_date: { type: Sequelize.DATE }
  },
	{freezeTableName: true}
)
}