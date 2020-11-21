const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user")
const age = require('./age')
const port = 3000;

mongoose.connect("mongodb://localhost:27017/authentification_exercise",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);
const app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
    expressSession({
        secret: "konexio",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
// configuration pour utilistation de passpoert avec des sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
    res.render('home')

})
app.get('/login', (req, res) => {


    if (req.isAuthenticated()) {
        res.redirect("/admin");
    } else {
        res.render('login')
    }
})
app.get('/signup', (req, res) => {

    if (req.isAuthenticated()) {
        res.redirect("/admin");
    } else {
        res.render("signup");
    }


})
app.get('/admin', async (req, res) => {
    if (req.isAuthenticated()) {
        //1er methode 
        const users = await User.find().lean()

        res.render('admin', {
            users,
            date: age(req.user.date),

        })

        //2 éme methode
        // res.render('admin', {
        //     surname: req.user.surname,
        //     username: req.user.username,
        //     firstName: req.user.firstName
        // })
        // console.log('req.user', req.user)
        // console.log('req.params.username', req.user.username)
        // console.log('req.params.surname', req.user.surname)
        // console.log('req.params.firstName', req.user.firstName)
        //console.log('req.body.surname',req.body.surname)



    } else {
        res.redirect('/')
    }

})

app.get("/logout", (req, res) => {
    console.log(" /logout");
    req.logout();
    res.redirect("/");
});


app.post('/signup', (req, res) => {
    const { username, email, password, confirm_password, surname, firstName, date } = req.body

    console.log('username', username)
    console.log('password', password)
    console.log('confirm_password', confirm_password)
    console.log('surname', surname)
    console.log('firstName', firstName)
    console.log('email', email)
    //res.send('signup')
    User.register(new User({ username, email, confirm_password, surname, firstName, date }), password, (err, user) => {


        let params = req.body.password;
        let cofpasw = req.body.confirm_password
        // si on a pas entre le password
        // if (params === '') {
        //     console.log("Please enter Password");
        // } if (cofpasw == '') {
        //     console.log("Please enter confirm password");
        // }
        if (params.length >= 8) {
            // if ((params.match(/[0-9]/g) && params.match(/[A-Z]/g) && params.length >= 8)) {

            if (params === cofpasw) {
                console.log('is valide')
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/admin")

                });
            }


        } else if (err) {
            console.log('is invalide')
            return res.render('signup')

        }


    })

})

app.post(
    "/login",
    // console.log('APPPOST', passport.authenticate),
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/login",
    }), (req, res) => {
        console.log('un message');
    }
);


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});