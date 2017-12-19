import contentlist from '../models/contentlist.js'

const getContentlist = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await contentlist.getContentListById(id) // 通过await “同步”地返回查询结果
  if (result.length >= 1) {
    ctx.body = {
      data: result,
      empty: false
    }
  } else { // 将请求的结果放到response的body里返回
    ctx.body = {
      data: result,
      empty: true
    }
  }
}

export default {
  getContentlist
}
