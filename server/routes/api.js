import api from '../controllers/functiondata.js'

import koa_router from 'koa-router'
const router = koa_router()


router.get('/getMapData/:id', api.getVersionlist)
router.get('/getMapCount/', api.getIssuecount)
router.get('/getreqMapData/', api.getIssuecountReq)
router.get('/getPmCountData/', api.getPmNamelist)
export default router

