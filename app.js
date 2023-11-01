require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');



const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/ebooks');
const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,  
});



userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dashboard', (req, res) => {
    if(req.isAuthenticated()){
        res.render('dashboard');
    }
    else{
        res.redirect('/login');
    }
});
app.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('dashboard');
    }
    else{
        res.render('login');
    }
});

app.get('/signup', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('dashboard');
    }
    else{
        res.render('signup');
    }
});


app.post('/signup', (req, res) =>{
    
    const userInfo = {
        fullname: req.body.fullname,
        username: req.body.username, 
    }
    User.register(userInfo, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            res.redirect('/signup');
        }
        else{
            passport.authenticate('local')(req, res , () =>{
                res.redirect('/dashboard');
            });
        }
    });
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        passwrord: req.body.password
    });

    req.login(user, (err) =>{
        if(err){
            res.redirect('/login');
        }
        else{
            passport.authenticate('local')(req, res, () =>{
                res.redirect('/dashboard');
            });
        };
    })
})
app.post('/logout', (req, res) => {
    req.logOut((err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('login');
        };
    });
});

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`server started at port ${port}`));