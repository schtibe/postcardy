import { Router } from 'express'

let router = new Router
export default router

router.use(require('./image'))
router.use(require('./postcard'))
