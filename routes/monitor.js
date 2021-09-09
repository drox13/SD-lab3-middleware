const {Router } = require('express');
const { postQuery, getCpuUsage } = require('../controllers/monitor');

const router = Router();

//aqui van los servicios
router.post('/query', postQuery);

getCpuUsage;

module.exports = router;