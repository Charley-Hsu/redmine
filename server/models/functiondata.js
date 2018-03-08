import db from '../config/db.js' // 引入todolist的表结构
const versionModel = '../schema/versions.js'
const issueModel = '../schema/issues.js'
const GroupModel = '../schema/groups_users.js'
const usersModel = '../schema/users.js'

const VersionDb = db.Redmine // 引入数据库

const Versionlist = VersionDb.import(versionModel)
const Userslist = VersionDb.import(usersModel)
const Issueslist = VersionDb.import(issueModel)


const getVersionlistById = async function (id) {
  const versionlist = await Versionlist.findAll({ 
      where: {
        // 'project_id': id,
        'id': {
            '$between': [187, 236],    // id BETWEEN 187 AND 236
            // '$notIn': [207], 
        },
      },
    attributes: ['id', 'name'] // 返回字段
  })

  return versionlist // 返回数据
}
//下面是需求接口
const getFunctionlistByIdReq = async function () { //web
  let resArr = [];
  let issueslist = [];
  let arrlength = 0;
  let temArr = await getRequmentList();
  for (let i = 0; i <= temArr.length-1; i++) {//所有版本所有需求
    arrlength = 0;
    for (let j of temArr[i]) {//当前版本所有需求
        issueslist = await Issueslist.findAll({ 
            where: {
              'parent_id': j.id,//当前版本中一个需求id
              'tracker_id':2,
              'assigned_to_id':[9,40,44,54,95,122,147,163,175,182]  
            },
          attributes: ['id'] // 返回字段
        })
        if (issueslist.length>0) {
            arrlength = arrlength+1;
        }
    }
    resArr[i] = arrlength;
  }
  return resArr
}

const getAllFunctionlistByIdReq = async function (){
    let resArrAll = [];
    let arrlength = 0;
    let temArr = await getRequmentList();
    for (let i = 0; i <= temArr.length-1; i++) {
       arrlength = 0;
       for (let item in temArr[i]) {
           arrlength++
       }
       resArrAll.push(arrlength)
    }
    return resArrAll
}


//下面是功能接口
const getFunctionlistById = async function () {
  let resArr = [];
  let issueslist = [];
  for(let i = 187; i <= 236; i++){
    issueslist = await Issueslist.findAndCountAll({ 
        where: {
          // 'project_id': 17,
          'fixed_version_id': i,
          'assigned_to_id':[9,40,44,54,95,122,147,163,175,182],    // id BETWEEN 187 AND 236
          'tracker_id':2
        },
      attributes: ['id'] // 返回字段
    })
    resArr.push(issueslist.count)
  }
  return resArr
}

const getAllFunctionlistById = async function () {
  let resArrAll = [];
  let issueslistall = [];
  for(let i = 187; i <= 236; i++){
    issueslistall = await Issueslist.findAndCountAll({ 
        where: {
          // 'project_id': 17,
          'fixed_version_id': i,
          'tracker_id':2
        },
      attributes: ['id'] // 返回字段
    })
    resArrAll.push(issueslistall.count)
  }
  return resArrAll
}

//下面是之最和PM列表
const getPMnameList = async function (){
  let pmlistall = [];
    pmlistall = await Userslist.findAll({ 
        where: {
          'id':[208,42,201,164,221,5,170,162,28,113,199,114,8,106,150,109,140,45,52]
        },
      attributes: ['lastname','firstname'] // 返回字段
    })
  return pmlistall
}

const getPMCountList = async function (){
  let obj = {};
  let arr = [];
  let res =[];
  let issueslistall = [];
    issueslistall = await Issueslist.findAll({ 
        where: {
          'tracker_id':4,
          'author_id':[208,42,201,164,221,5,170,162,28,113,199,114,8,106,150,109,140,45,52],
          'fixed_version_id': {
              '$between': [187, 236]
          },
        },
      attributes: ['author_id'] // 返回字段
    })
    for (let item in issueslistall) {
      if(obj[issueslistall[item].author_id] == undefined){
          arr.push(issueslistall[item].author_id);
          obj[issueslistall[item].author_id] = 1;
        }else{
          obj[issueslistall[item].author_id] ++;
        }
    }
    // for (let item in obj) {
    //     res.push(obj[item])
    // }
  return obj
}

//通用方法
/*
 * 查询全部需求列表
 * 
 */

 const getRequmentList = async function (){
  let requmentListData = [];
  let issueslistall = [];
  for(let i = 187; i <= 236; i++){
    issueslistall = await Issueslist.findAll({ 
        where: {
          'fixed_version_id': i,
          'tracker_id':4,
          'author_id':[208,42,201,164,221,5,170,162,28,113,199,114,8,106,150,109,140,45,52]
        },
      attributes: ['id'] // 返回字段
    })
    requmentListData.push(issueslistall)
  }

  return requmentListData
}


/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
function uniqueArray(array, key){
    var result = [];
    for(var i = 0; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat && item[key] != null) {
            result.push(item);
        }
    }
    return result;
}
export default {
  getRequmentList,
  getPMnameList,
  getPMCountList,
  getVersionlistById,
  getFunctionlistById,
  getAllFunctionlistById,
  getAllFunctionlistByIdReq,
  getFunctionlistByIdReq
}
