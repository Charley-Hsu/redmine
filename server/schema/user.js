/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    password: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: 'admin'
    }
  }, {
    tableName: 'user'
  });
};
