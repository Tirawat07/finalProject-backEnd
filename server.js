const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app =  express()
const authRoute = require('./Route/auth-route')
const eventRoute = require('./Route/event-route')
const authenticate = require('./middlewares/authenticate')
const waterRouter = require('./Route/water-route')
const handelError = require('./middlewares/error-middleware')
const notFoundHandler = require('./middlewares/notFound')
const CheckRole = require('./middlewares/ChackRole')


app.use(morgan('dev'))
app.use(express.json())
app.use(cors()) 

app.use('/auth',authRoute)
app.use('/event',authenticate,CheckRole,eventRoute)
app.use('/water',authenticate,CheckRole,waterRouter)

app.use(handelError)
app.use("*",notFoundHandler)

const port = process.env.PORT || 9999
app.listen(port,()=>console.log('Server is running in ',port))

