/**
 * descption
 * author: CarloHsu TGFE
 * Date: 2018/5/16
 * Time: 下午6:00
 *
 */
import svn from '../controllers/svn.js'

import koa_router from 'koa-router'
const router = koa_router()
console.log("router")
router.post('/addSvn', svn.addSvn)

export default router

