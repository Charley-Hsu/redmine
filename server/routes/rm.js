import rm from '../controllers/rm.js'

import koa_router from 'koa-router'
const router = koa_router()

router.post('/issues', rm.getIssuesList)
router.post('/projects', rm.getProjectsList)
router.post('/users', rm.getUsersList)
router.post('/creatIssues', rm.creatIssues)
router.post('/assignedBack', rm.assignedBack)
export default router

