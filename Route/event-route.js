const express = require('express')
const eventRoute = express.Router()
const eventController = require('../controller/event-controller')
const upload = require('../middlewares/upload')

eventRoute.get('/',eventController.getAllEvent)
eventRoute.post('/',upload.single('image'),eventController.createEvent)
eventRoute.put('/:id',upload.single('image'),eventController.editEvent)
eventRoute.delete('/:id',eventController.deleteEvent)
eventRoute.get('/search/:searchText',eventController.SearchEvent)
                                                                                                                                                                                      
                                                                                          
module.exports = eventRoute    