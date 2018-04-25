/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_logs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    param: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    urlname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    opname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    requesttime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    returntime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    taketime: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'base_logs'
  });
};
