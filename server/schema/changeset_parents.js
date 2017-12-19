/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('changeset_parents', {
    changeset_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'changeset_parents'
  });
};
