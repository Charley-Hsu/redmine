// db.js
const Sequelize = require('sequelize') // 引入sequelize
const Redmine = new Sequelize('mysql://redmine:redmine_onlyread@10.10.10.32:3306/redmine', {
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})
// console.log(Redmine)
module.exports = {
  Redmine // 将Todolist暴露出接口方便Model调用
}

// sequelize-auto -o "./schema" -d redmine -h 10.10.10.32 -u redmine -p 3306 -x redmine_onlyread -e mysql