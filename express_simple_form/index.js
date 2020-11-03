const express = require('express')
const app = express()
const port = 3007
const exphbs = require('express-handlebars')
const students = ['Jean', 'Binta', 'Agathe', 'Adil'];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({
    defaultLayout: false,
    layoutsDir: __dirname + 'views/'
}))

app.get('/', (req, res, next) => {
    res.send('Welcome to express simple form')
})/*
app.get('/admin', (req,res,next)=>{

    res.render('home',{
        title:"Welcome to express simple form"

    } 
    )
})
*/
app.get('/home', (req, res, next) => {
    res.render('home', {
        title: "Welcome to express simple form",
        students,
    });
});

app.post('/studente/Add', (req, res, next) => {
    let addstudents = req.body.studentname
    students.push(addstudents)
    console.log(addstudents)
    res.render('list', {
        studentsadded: addstudents
    })

    // res.send(`student ${req.body.studentname} has been recorded `,

    // )
    console.log('studentname', req.body.studentname)
})

app.listen(port, () => {
    console.log('server' + port)
})