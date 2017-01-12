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
// app.listen(3000, function () {
app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening on port 3000!')
})