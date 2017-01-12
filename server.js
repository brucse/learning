#!/bin/env node
var express = require('express')
var app = express()
var self ={}

        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT ||process.env.PORT ;

        
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
app.listen(self.port,self.ipaddress, function () {
  console.log('Example app listening on port ' + self.port)
})