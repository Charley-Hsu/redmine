import auth from '../controllers/login.js'
import koa_router from 'koa-router'
const router = koa_router()

// router.get('/user/:id', auth.getUserInfo)  // 定义url的参数是id,用user的auth方法引入router
router.post('/user', auth.postUserAuth)

export default router
