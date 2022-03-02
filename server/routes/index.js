const Router = require('express')
const router = new Router()
const photoRouter = require('./photoRouter')
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')

router.use('/user', userRouter)
router.use('/photos', photoRouter)
router.use('/admin', adminRouter)


module.exports = router
