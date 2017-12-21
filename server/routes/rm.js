import rm from '../controllers/requmentList.js'
// import api from '../controllers/contentlist.js'
import search from '../controllers/searchlist.js'
import searchsong from '../controllers/searchsong.js'
import koa_router from 'koa-router'
const router = koa_router()
router.get('/requmentList/:id', rm.getRequmentList)


// router.get('/contentlist/:id', api.getContentlist)
router.get('/searchlist/:name', search.getSearchlist)
router.get('/searchsong/:name', searchsong.getSearchsong)

export default router

