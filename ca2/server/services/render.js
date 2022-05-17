exports.homeRoutes = (req, res) => {
    res.render('index');
}

exports.add_dish = (req, res) => {
    res.render('add_dish');
}

exports.update_dish = (req, res) => {
    res.render('update_dish');
}
