import db from '../config/db.js' // 引入todolist的表结构
const searchModel = '../schema/song.js'
const SearchsongDb = db.Netease // 引入数据库

const Contentlist = SearchsongDb.import(searchModel)

const getSearchsongById = async function (name) {
  const songlist = await Contentlist.findAll({ // 查找全部的 SELECT * FROM [user] WHERE u_name LIKE '%三%'
    where: {
      'title': {
        '$like': '%'+name+'%'
      }
    },
    attributes: ['title','comment', 'url', 'name', 'singer', 'content', 'nickname', 'likecount'] // 返回字段
  })

  return songlist // 返回数据
}

export default {
  getSearchsongById
}
