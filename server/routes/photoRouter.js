const Router = require('express')
const router = new Router()
const photoController = require('../controllers/photoController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', checkRoleMiddleware(["MEMBER", "MODER", "ADMIN"]), photoController.getAll)
router.get('/:id', checkRoleMiddleware(["MEMBER", "MODER", "ADMIN"]), photoController.getOne)

module.exports = router
