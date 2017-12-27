import searchlist from '../models/functiondata.js'

const getVersionlist = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await searchlist.getVersionlistById(id) // 通过await “同步”地返回查询结果
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

const getIssuecount = async function (ctx) {
  // const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await searchlist.getFunctionlistById() // 通过await “同步”地返回查询结果
  const resultall = await searchlist.getAllFunctionlistById() // 通过await “同步”地返回查询结果
  if (result.length < 1 || resultall.length < 1) { // 将请求的结果放到response的body里返回
    ctx.body = {
      data: result,
      empty: true
    }
  } else {
    ctx.body = {
      data: result,
      dataall:resultall,
      empty: false
    }
  }
}

const getIssuecountReq = async function (ctx) {
  const resultReq = await searchlist.getFunctionlistByIdReq() // 通过await “同步”地返回查询结果
  const resultallReq = await searchlist.getAllFunctionlistByIdReq() // 通过await “同步”地返回查询结果
  if (resultReq.length < 1 || resultallReq.length < 1) { // 将请求的结果放到response的body里返回
    ctx.body = {
      data: result,
      empty: true
    }
  } else {
    ctx.body = {
      data: resultReq,
      dataall:resultallReq,
      empty: false
    }
  }
}

const getPmNamelist = async function (ctx) {
  const result = await searchlist.getPMnameList() // 通过await “同步”地返回查询结果
  const resultc = await searchlist.getPMCountList()
  if (result.length < 1) { // 将请求的结果放到response的body里返回
    ctx.body = {
      data: result,
      empty: true
    }
  } else {
    ctx.body = {
      data: result,
      datac:resultc,
      empty: false
    }
  }
}
export default {
  getVersionlist,
  getIssuecount,
  getIssuecountReq,
  getPmNamelist
}
