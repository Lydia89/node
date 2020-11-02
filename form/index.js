const express = require('express')
const app = express();
const port = 3008
const exphbs = require('express-handlebars')


app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.engine('handlebars', exphbs({
    defaultLayout: false,
    layoutsDir: __dirname + 'views/'
}))
app.set('view engine', 'handlebars');

app.get('/home', function (req, res) {
    console.log('home')
    res.render('home', {
        title: "bonjour",
        contact:"lydy@live.fr"

    });
});

app.get('/admin', function (req, res) {
    res.render('contact', {  
        contact:"lydy@live.fr"

    });
    
   // res.redirect('/contact')
        
    

    });



app.post('/form/signup', function (req, res) {
    // console.log('post')
    console.log(`Bonjour :username:${req.body.username}   password: ${req.body.password}`)
    res.send(` username: ${req.body.username} </br> 
      password: ${req.body.password}  `)

    //console.log('form parameter', req.body.username);
})


app.listen(port, () => {
    console.log(`server listening on par ${port}`)
})