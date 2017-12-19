/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issues', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tracker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    assigned_to_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    priority_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    fixed_version_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lock_version: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    done_ratio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    estimated_hours: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    root_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lft: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rgt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_private: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    closed_on: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'issues'
  });
};
