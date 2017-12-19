import searchlist from '../models/searchlist.js'

const getSearchlist = async function (ctx) {
  const name = ctx.params.name // 获取url里传过来的参数里的id
  const result = await searchlist.getSearchlistById(name) // 通过await “同步”地返回查询结果
  if (result.length < 1) { // 将请求的结果放到response的body里返回
    ctx.body = {
      data: result,
      empty: true
    }
  } else {
    ctx.body = {
      data: result,
      empty: false
    }
  }
}

export default {
  getSearchlist
}
