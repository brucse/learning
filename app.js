var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/cease.html', function (req, res) {
  console.log('req')
})

var router = express.Router()
router.use(function(req,res,next){

})
app.use('/',express.static('public'))
app.use('/',router)
if(process.env.PORT == null) process.env.PORT = '3000'
if(process.env.IP == null) process.env.IP = '127.0.0.1'
// app.listen(3000, function () {
// app.listen(function () {
app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening on port 3000!')
})
