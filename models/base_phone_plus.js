/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_phone_plus', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    province_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    province_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone_NO: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    flag: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone_no2: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'base_phone_plus'
  });
};
