import { Router } from 'express'
import apiv1      from './api/v1'

let router = new Router
export default router

router.use('/api/v1', apiv1)
