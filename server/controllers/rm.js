const request = require('superagent');


const getIssuesList = async function (ctx) {
    const data = ctx.request.body;
    await request
        .get('http://redmine.51tiangou.com/issues.json')
        .query({
            assigned_to_id: data.assigned_to_id,
            tracker_id: data.tracker_id
        })
        .set({
            'X-Redmine-API-Key': data.token,
            'Content-Type': 'application/json'
        })
        .then(function (res) {
            return ctx.body = {
                success: true,
                data: res.body
            }
        });
}

const getProjectsList = async function (ctx) {
    const data = ctx.request.body;
    await request
        .get('http://redmine.51tiangou.com/projects/17/versions.json')
        .set({
            'X-Redmine-API-Key': data.token,
            'Content-Type': 'application/json'
        })
        .then(function (res) {
            return ctx.body = {
                success: true,
                data: res.body
            }
        });
}

const getUsersList = async function (ctx) {
    const data = ctx.request.body;
    await request
        .get('http://redmine.51tiangou.com/users.json')
        .query({
            limit: data.limit,
            offset: data.offset
        })
        .set({
            'X-Redmine-API-Key': data.token,
            'Content-Type': 'application/json'
        })
        .then(function (res) {
            return ctx.body = {
                success: true,
                data: res.body
            }
        });
}

const creatIssues = async function (ctx) {
    const data = ctx.request.body;
    await request
        .post('http://redmine.51tiangou.com/issues.json')
        .send({
            issue: data.issue
        })
        .set({
            'X-Redmine-API-Key': data.token,
            'Content-Type': 'application/json'
        })
        .then(function (res) {
            if (res) {
                return ctx.body = {
                    success: true,
                    data: '创建成功'
                }
            } else {
                return ctx.body = {
                    success: false,
                    data: '创建失败'
                }
            }
        });
}

const assignedBack = async function (ctx) {
    const data = ctx.request.body;
    let issue = {
        "project_id": 4,
        "status_id": 14,
        "priority_id": 2,//优先级：2->普通
        "fixed_version_id": data.fixed_version_id,//版本号
        "assigned_to_id": data.assigned_to_id//指给人员
    }
    let url = 'http://redmine.51tiangou.com/issues/' + data.number + '.json';
    await request
        .put(url)
        .send({
            "issue": issue
        })
        .set({
            'X-Redmine-API-Key': data.token,
            'Content-Type': 'application/json'
        })
        .then(function (res) {
            if (res) {
                return ctx.body = {
                    success: true,
                    data: '指回成功'
                }
            } else {
                return ctx.body = {
                    success: false,
                    data: '指回失败'
                }
            }
        });
}

export default {
    getIssuesList,
    getProjectsList,
    getUsersList,
    creatIssues,
    assignedBack
}