/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repositories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    login: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    root_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    path_encoding: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    log_encoding: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    extra_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    identifier: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_default: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'repositories'
  });
};
