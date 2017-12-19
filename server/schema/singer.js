/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('singer', {
    singer: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: '未知歌手'
    },
    url: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    type: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    category: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    letter: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    id: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    initial: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    tableName: 'singer'
  });
};
