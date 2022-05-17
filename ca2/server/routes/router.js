const express = require('express');
const route = express.Router()
const services = require('../services/render')

route.get('/', services.homeRoutes);

route.get('/add_dish', services.add_dish);

route.get('/update-dish', services.update_dish);
  
module.exports = route