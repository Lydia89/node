//const { static } = require("express");

const express = require("express")
const exphbs = require("express-handlebars");
const expressSession = require("express-session")
//const expressValidator = require("express-validator");
const MongoStore = require("connect-mongo")(expressSession)
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const multer = require('multer');
//const upload = multer({ dest: 'public/uploads/' });
const User = require("./models/user")
//const Product = require("./models/product")

const port = 3000;
const usersRouter = require('./controllers/users');

mongoose.connect("mongodb://localhost:27017/bon_plan_groupe",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const app = express()
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static('public'))
app.use(express.static('public/img'));
app.use(
    expressSession({
        secret: "konexioasso07",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)
app.use(passport.initialize());
app.use(passport.session());
// configuration de passport pour User
//passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password" }, User.authenticate()));
passport.serializeUser(User.serializeUser()); //Enregistrez le user.id dans la session
passport.deserializeUser(User.deserializeUser()); // Recevez le user.id de la session et récupérez l'utilisateur de la base de données par son ID


// configuration de passpprt pour products


// passport.use(new LocalStrategy(Product.authenticate()));
// passport.serializeUser(Product.serializeUser()); //Enregistrez le Productid dans la session
// passport.deserializeUser(Product.deserializeUser()); // Recevez le Product.id de la session et récupérez l'utilisateur de la base de données par son ID




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        //cb(null, file.originalname.substring + '-' + Date.now())
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)
    }
})

var upload = multer({ storage: storage })

app.use('/users', usersRouter)
app.get('/home', (req, res) => {
    res.render('home')
    
})
// app.get('/admin', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('admin')
//     } else {
//         res.redirect('/home')
//     }
// })

// app.get('/admin/products/add', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('products')
//     } else {
//         res.redirect('/home')
//     }

// })

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.locals.isLoggedIn = true
        res.render('profile', {
            username: req.user.username,
            firstName: req.user.firstName,
            surname: req.user.surname,
            profilePicture: req.user.profilePicture

        })

    } else {
        res.redirect('/home')
    }

})
app.get('/signup', (req, res) => {

    if (req.isAuthenticated()) {
        res.redirect("/profile");
    } else {
        res.render("signup");
    }
});


app.post('/signup', upload.single('image'), (req, res) => {
    const { username, password, firstName, surname } = req.body
    const profilePicture = req.file.filename
    //const image = req.file.filename
    // console.log('image', image)
    console.log('profilePicture', profilePicture)

    console.log('username', username)
    console.log('password', password)
    console.log('firstName', firstName)
    console.log('surname', surname)
    User.register(new User({
        username,
        firstName,
        surname,
        profilePicture
    }), password, (err, data) => {

        if (err) {
            console.log("/signup user register err", err);
            return data.render("signup");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/profile");
            });
        }

    })
})

app.get("/login", (req, res) => {
    // console.log('req.isAuthenticated',req.isAuthenticated);
    if (req.isAuthenticated()) {
        res.redirect("/profile");
    } else {
        res.render("login");
    }
});
app.post("/login",
    // console.log('APPPOST', passport.authenticate),
    passport.authenticate("local", {
        successRedirect: "/profile",
        failureRedirect: "/login",
    }),
    (req, res) => {
        console.log("un message");
    }
);
app.get("/logout", (req, res) => {
    // console.log("GET /logout", req);
    req.logout();

    res.redirect("/home");
});




// app.post('/admin', upload.single('image'), (req, res) => {

//     const { name, discription, price, city } = req.body
//     const image = req.file.filename
//     Product.register(new Product({
//         name,
//         discription,
//         price,
//         city,
//         image}), password, (err, data) =>{

//             if (err) {
//                 console.log("/admin user register err", err);
//                 return data.render("admin");
//             } else {
//                 passport.authenticate("local")(req, res, () => {
    
//                     res.redirect("/products");
//                 });
//             }

        
//         })

    
    
    
    
    
    

// })














app.listen(port, () => {
    console.log(`server started on port:${port}`)
})