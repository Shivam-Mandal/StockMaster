const express = require('express');
const healthCheckContoller = require("../controllers/healthCheckController");
const router = express.Router();

router.get('/', healthCheckContoller.healthcheck);

module.exports = router;