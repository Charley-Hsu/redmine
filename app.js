import Koa from 'koa'
import json from 'koa-json'
// import logger from 'koa-logger'
import auth from './server/routes/auth.js'
import api from './server/routes/api.js'
import rm from './server/routes/rm.js'
import svn from './server/routes/svn.js'
import jwt from 'koa-jwt'
import path from 'path'
import serve from 'koa-static'
import historyApiFallback from 'koa2-history-api-fallback'
import koa_router from 'koa-router'
import koa_bodyparser from 'koa-bodyparser'

const app = new Koa()
const router = koa_router()
const bodyParser = require('koa-bodyparser');
app.proxy = true;
app.use(koa_bodyparser())
app.use(json())
// app.use(logger())
app.use(bodyParser());
app.use(async function (ctx, next) {
    let start = new Date()
    await next()
    let ms = new Date() - start
    // console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async function (ctx, next) {  //  如果JWT验证失败，返回验证失败信息
    try {
        await next()
    } catch (err) {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                success: false,
                token: null,
                info: 'Protected resource, use Authorization header to get access'
            }
        } else {
            throw err
        }
    }
})


app.on('error', function (err, ctx) {
    console.log('server error', err)
})
router.use("/rm", rm.routes())
router.use("/svn", svn.routes())
router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use("/api", jwt({secret: 'tgfe'}), api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。

app.use(router.routes()) // 将路由规则挂载到Koa上。
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(8889, () => {
    console.log('RM is listening in 8889')
})

export default app

