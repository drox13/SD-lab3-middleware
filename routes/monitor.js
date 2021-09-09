const {Router } = require('express');
const { postQuery, getCpuUsage, getRamAvalible, postLimits, checkStats } = require('../controllers/monitor');

const router = Router();

//aqui van los servicios
router.post('/query', postQuery);
router.post('/limits', postLimits);

setInterval(() => {
    getCpuUsage;
    getRamAvalible;
}, 5000);

module.exports = router;