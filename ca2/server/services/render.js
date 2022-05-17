const axios = require('axios');
exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('https://3000-alissondmoura-iwaca1-c9c8w6o6c0j.ws-eu45.gitpod.io/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}
//just writes  a new user
exports.add_user = (req, res) =>{
    res.render('add_dish');
}


//retrieve the actual information before update, then send the new updated information overriding the old
exports.update_user = (req, res) =>{
    axios.get('https://3000-alissondmoura-iwaca1-c9c8w6o6c0j.ws-eu45.gitpod.io/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_dish", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}