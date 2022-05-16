const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
//protection to the secret port used to pass the information
const bodyparser = require("body-parser");
const path = require('path');

const app = express();

dotenv.config({path : 'config.env'})
const PORT = process.env.PORT || 8080


app.use(morgan('tiny'));
// log requests

app.use(bodyparser.urlencoded({extended : true}))
// parse request to body-parset


//app.set("views", path.resolve(__dirname, "views/ejs")) command for more inf

//set view engine
app.set('view engine',"ejs")


app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
//load assets




app.get('/',(req,res)=>{
//res.render('index')
res.send("Working")
})

app.listen(3000,()=> {console.log("Server is running on http://locahost:${PORT}")})