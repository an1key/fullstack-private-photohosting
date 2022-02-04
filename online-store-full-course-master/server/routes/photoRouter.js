const Router = require('express')
const router = new Router()
const photoController = require('../controllers/photoController')

router.post('/', photoController.create)
router.get('/', photoController.getAll)
router.get('/:id', photoController.getOne)

module.exports = router
