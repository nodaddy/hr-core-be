const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/getemployee', employeeController.getEmployee);
router.post('/', employeeController.postEmployee);

module.exports = router;
