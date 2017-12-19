/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('song', {
    song: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: '未知歌曲名称'
    },
    comment: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    url: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    singer: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    content: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: '歌曲还没有热评'
    },
    nickname: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: ''
    },
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    likecount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'song'
  });
};
