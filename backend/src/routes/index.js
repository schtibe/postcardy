let express = require('express')
let apiv1 = require('./api/v1')

let router = new express.Router
export default router

router.use('/api/v1', apiv1)
