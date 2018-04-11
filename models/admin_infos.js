/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_infos', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    loginname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    loginpwd: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    realname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    addtime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tokentime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    lastlogintime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    isdel: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'admin_infos'
  });
};
