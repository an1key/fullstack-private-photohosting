const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const photoController = require('../controllers/photoController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
router.get('/users', checkRoleMiddleware("ADMIN"), userController.getAllUsers)
router.post('/users', checkRoleMiddleware("ADMIN"), userController.modify)
router.post('/photos', checkRoleMiddleware("ADMIN" || "MODER"), photoController.create)


module.exports = router