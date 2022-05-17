const axios = require('axios');

exports.homeRoutes = (req, res) => {
    //get request to the /api/users
    axios.get('https://3000-alissondmoura-iwaca1-tjn95c347rn.ws-eu45.gitpod.io/api/users')
    .then(function(response){
        res.render('index',{users:response.data});
    })
    .catch(err =>{
        res.send(err);
    })

}
exports.add_dish = (req, res) => {
    res.render('add_dish');
}

exports.update_dish = (req, res) => {
    res.render('update_dish');
}
