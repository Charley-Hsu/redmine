import db from '../config/db.js' // 引入todolist的表结构
const todoModel = '../schema/song.js'
const ContentlistDb = db.Netease // 引入数据库

const Contentlist = ContentlistDb.import(todoModel)

const getContentListById = async function (id) {
  const contentlist = await Contentlist.findAll({ // 查找全部的todolist
    where: {
      singer: id
    },
    attributes: ['singer', 'content', 'title', 'nickname', 'comment'] // 返回字段
  })

  return contentlist // 返回数据
}

export default {
  getContentListById
}
