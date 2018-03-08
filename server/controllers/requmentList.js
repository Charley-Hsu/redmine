import user from '../models/requmentList.js'
import jwt from 'jsonwebtoken'

// const getUserInfo = async function(ctx) {
//     const id = ctx.params.id // 获取url里传过来的参数里的id
//     const result = await user.getUserById(id) // 通过await “同步”地返回查询结果
//     ctx.body = result // 将请求的结果放到response的body里返回
// }

const getRequmentList = async function(ctx) {
    const id = ctx.params.id // 获取url里传过来的参数里的id
    const requmentList = await user.getRequmentListById(id)
    if (requmentList.length < 1) { // 将请求的结果放到response的body里返回
        ctx.body = {
            data: requmentList,
            empty: true
        }
    } else {
        ctx.body = {
            data: requmentList,
            empty: false
        }
    }
}

export default {
    getRequmentList
}