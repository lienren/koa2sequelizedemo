/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_apis', {
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
    urlname: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    sortname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    isvisitor: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    addtime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    isdel: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'base_apis'
  });
};
