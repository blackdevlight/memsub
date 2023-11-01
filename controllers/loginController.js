const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');const createUser = (req, res) => {

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
    const userInfo = {
        name:  req.body.name,
        email: req.body.username,
    }
    User.register(userInfo, req.body.password, ((err, user) =>{
        if(err){
            console.log(err);
            res.redirect('/login');
        }
        else{
            passport.authenticate('local')(req, res, () => {
                res.redirect('/dashboard');
            });
        };
    }));
    

}
module.exports = { createUser };