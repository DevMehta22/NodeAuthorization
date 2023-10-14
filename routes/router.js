const express = require('express')
const {userlogin,usersignup}=require('../controllers/controllers')
const route = express.Router()

route.post('/login',userlogin)
route.post('/signup',usersignup)

module.exports = route
