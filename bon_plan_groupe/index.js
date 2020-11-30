//const { static } = require("express");

const express = require("express")
const exphbs = require("express-handlebars");
const expressSession = require("express-session")
//const expressValidator = require("express-validator");
const MongoStore = require("connect-mongo")(expressSession)
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local")

//const upload = multer({ dest: 'public/uploads/' });
const User = require("./models/user")
const Product = require("./models/product")

const port = 3000;
const usersRouter = require('./controllers/users');
const productRouter = require('./controllers/products')

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





app.use('/users', usersRouter)


app.use('/', productRouter)
app.use('/products', productRouter)







app.listen(port, () => {
    console.log(`server started on port:${port}`)
})