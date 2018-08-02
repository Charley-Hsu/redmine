/**
 * descption
 * author: CarloHsu TGFE
 * Date: 2018/5/16
 * Time: 下午5:23
 *
 */
import svn from '../models/svn.js'
const request = require('superagent');

const addSvn = async function (ctx) {
    console.log("enter addsvn")
    const data = ctx.request.body // post过来的数据存在request.body里
    const svnName = await svn.getVersionName(data.date)
    console.log("==========",svnName)
    await request
        .post('http://node.51tiangou.com/release/add')
        .send({
            release: svnName,
            description: data.description,
            requirement: data.requirement,
            date:svnName
        })
        .then(function (res) {
            console.log("then")
            if (res) {
                return ctx.body = {
                    success: true,
                    data: '添加成功'
                }
            } else {
                return ctx.body = {
                    success: false,
                    data: '添加失败'
                }
            }
        });
}
export default {
    addSvn
}