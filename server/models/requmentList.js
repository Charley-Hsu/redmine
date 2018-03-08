import db from '../config/db.js' // 引入user的表结构
const issueModel = '../schema/issues.js'
const RedmineDb = db.Redmine // 引入数据库

const Issues = RedmineDb.import(issueModel) // 用sequelize的import方法引入表结构，实例化了User。

const getRequmentListById = async function (id) {
  const requmentList = await Issues.findAll({
    where: {
      assigned_to_id: id,
      status_id:16
    },
    attributes: ['tracker_id','project_id', 'subject', 'description', 'category_id', 'status_id', 'fixed_version_id', 'author_id', 'done_ratio', 'parent_id', 'root_id']
  })
  return requmentList
}

export default {
  getRequmentListById
}

