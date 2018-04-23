import db from '../config/db.js' // 引入user的表结构
const tokenModel = '../schema/tokens.js'
const userModel = '../schema/users.js'
const RedmineDb = db.Redmine // 引入数据库

const Tokens = RedmineDb.import(tokenModel) // 用sequelize的import方法引入表结构，实例化了User。
const Users = RedmineDb.import(userModel)

const getUserByName = async function (name) {
    const tokenInfo = await Users.findOne({
        where: {
            login: name
        }
    })
    const userInfo = await Tokens.findOne({
        where: {
            user_id: tokenInfo.id,
            action: 'api'
        }
    })
    return userInfo
}

export default {
    getUserByName
}

