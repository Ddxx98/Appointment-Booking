const express = require('express');
const appointmentController = require('../controllers/appointment')

const router = express.Router();

router.get('/',appointmentController.getAppointments);

router.post('/',appointmentController.createAppointment)

router.delete('/:id',appointmentController.deleteAppointment)

module.exports = router;