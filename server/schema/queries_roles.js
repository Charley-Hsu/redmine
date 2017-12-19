/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('queries_roles', {
    query_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'queries_roles'
  });
};
