const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const reportRouter = require('./routes/report')

const app = express()

require('./processor')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

mongoose
  .connect('mongodb://localhost:27017/reports', { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
   })
  .then(console.log('Successful connection to database'))
  .catch(error => {
    console.log(`The following error occurred: ${error.message}`)
  })

app.use('/api/reports', reportRouter)

app.listen(5000, () => {
console.log(`Server now listening at localhost:5000`)
})

module.exports = app