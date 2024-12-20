const express = require('express');
const slotsController = require('../controllers/slots')

const router = express.Router();

router.get('/',slotsController.getSlots);

router.post('/',slotsController.createSlots)

router.delete('/:id',slotsController.deleteSlots)

router.put('/:id',slotsController.editSlots)

module.exports = router;