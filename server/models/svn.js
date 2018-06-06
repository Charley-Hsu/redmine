/**
 * descption
 * author: CarloHsu TGFE
 * Date: 2018/5/16
 * Time: 下午5:24
 *
 */
import db from '../config/db.js' // 引入user的表结构
const versionModel = '../schema/versions.js'
const RedmineDb = db.Redmine // 引入数据库

const Versions = RedmineDb.import(versionModel)

const getVersionName = async function (id) {
    const versionInfo = await Versions.findOne({
        where: {
            id: id
        },
        attributes: ['name'] // 返回字段
    })
    return versionInfo.name
}

export default {
    getVersionName
}

