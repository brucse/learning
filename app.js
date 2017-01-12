var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/cease.html', function (req, res) {
  console.log('req')
  res.send('
  <!doctype html>
  <html lang="en">

  <head>
  <meta charset="UTF-8" />
  <title>Catch the robber</title>
  <script type="text/javascript" src="js/phaser.min.js"></script>
  <script type="text/javascript" src="js/lodash.js"></script>
  <script type="text/javascript" src="js/lib.js"></script>
  <script type="text/javascript" src="data/survey_data.js"></script>
  <script type="text/javascript" src="js/variables.js"></script>
  <script type="text/javascript" src="js/preload.js"></script>
  <script type="text/javascript" src="js/create.js"></script>
  <script type="text/javascript" src="js/script.js"></script>
  <script type="text/javascript" src="js/utils.js"></script>
  <style type="text/css">
  body {
  	margin: 0;
  }
  </style>
  </head>

  <body>
  	<a href="">Ujra</a>

  </body>

  </html>
 
  ')
  
})

var router = express.Router()
router.use(function(req,res,next){
	
})
app.use('/',express.static('public'))
app.use('/',router)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})