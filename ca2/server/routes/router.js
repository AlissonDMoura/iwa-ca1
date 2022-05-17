const express = require('express');
const route = express.Router()
const services = require("../services/render");

route.get('/', services.homeRoutes);
//route to the index page
    
route.get('/add_dish', services.add_dish);
//route to the add_dish page
  
route.get('/update-dish', services.update_dish);
//route to the update_dish Page      


module.exports = route;
//Exports the routes to the server