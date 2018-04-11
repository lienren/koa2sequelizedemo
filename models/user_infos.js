/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_infos', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    userpwd: {
      type: DataTypes.STRING(100),
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
    tableName: 'user_infos'
  });
};
