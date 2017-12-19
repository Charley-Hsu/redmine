import searchsong from '../models/searchsong.js'

const getSearchsong = async function (ctx) {
  const name = ctx.params.name // 获取url里传过来的参数里的name
  const result = await searchsong.getSearchsongById(name) // 通过await “同步”地返回查询结果
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
  getSearchsong
}
