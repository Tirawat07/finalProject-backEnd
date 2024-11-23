const express = require('express')
const waterRouter = express.Router()
const waterController = require('../controller/water-controller')


waterRouter.get('/getAllDataWater',waterController.getAllWaterData)
waterRouter.post('/',waterController.createWaterData)




waterRouter.put('/:waterId',waterController.putWaterData)
waterRouter.delete('/dateId/:id',waterController.DeleteWaterDateData)
waterRouter.delete('/fieldId/:id',waterController.DeleteWaterFieldData)
waterRouter.delete('/waterId/:id',waterController.DeleteWaterWateringData)

module.exports = waterRouter