const express = require('express')
const routes = express.Router()

const upload = require('../middlewares/Multer')

const UserController = require('../controllers/UserController')

routes.post('/insert', upload.single('file'), UserController.insert)
routes.get('/list', UserController.list)
routes.get('/list-by-date', UserController.listByDate)
routes.delete('/delete-all', UserController.deleteAllData)
routes.get('*', function(request, response){
  response.status(404).json({ hello: "What's up!" });
});

module.exports = routes