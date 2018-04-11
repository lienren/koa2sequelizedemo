/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_oauth', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Uid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OpenId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Server: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Mobile: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    AddTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_oauth'
  });
};
