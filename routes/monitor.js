const {Router } = require('express');
const { postQuery } = require('../controllers/monitor');

const router = Router();

//aqui van los servicios
router.post('/query', postQuery);

module.exports = router;