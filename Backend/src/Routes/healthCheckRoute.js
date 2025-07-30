const express = require('express');
const healthCheckContoller = require("../Controllers/healthCheckController");
const router = express.Router();

router.get('/', healthCheckContoller.healthcheck);

module.exports = router;