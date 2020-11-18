const express = require('express')
const mongoose = require('mongoose')

const port = 8004;

const Student = require('./models/student')
const Adress = require('./models/adress')
mongoose.connect('mongodb://localhost:27017/mongoose_populate',
    { useNewUrlParser: true, useUnifiedTopology: true })


const app = express()
app.use(express.json())

//GET
// Async ,await

/*
try {
    app.get('/', async (req, res) => {
        const students = await Student.find().populate('Adress')
        res.json(students)
        //console.log("students",students)
    })
} catch (error) {
    console.log(error)
    res.status(400).json('Error')
}
*/



// promise
/*
try {
    app.get('/', (req, res) => {
        Student.find().populate('Adress')
            .then(students => {
                res.json(students)
            })
    })

} catch (error) {
    console.log(error)
    res.status(400).json('Error')
}
*/

// callback 
app.get('/', (req, res) => {
    Student.find().populate('Adress').exec((err, students) => {
        if (!err) {
            res.json(students)
        } else {
            console.log(error)
            res.status(400).json('Error')

        }
    })

})





//POST
// Async ,await
/*
app.post('/add/', async (req, res) => {
    try {

        //  console.log(req.body)
        const newAdress = new Adress(req.body.adress)
        const newAdressAdded = await newAdress.save()

        //console.log("newAdressAdded", newAdressAdded)
        const { firstName, surname } = req.body.student
        const newStudent = new Student({
            firstName,
            surname,
            adress: newAdressAdded._id
        })
        console.log("newStudent", newStudent)

        await newStudent.save()

        res.send('ok')

    } catch (error) {
        console.log(error)
        res.status(400).json('Error')
    }
})
*/

// promise
/*
app.post('/add/',(req,res)=>{
    const newAdress = new Adress(req.body.adress)
    newAdress.save()
    .then(newAdressAdded=>{
        
        console.log('newAdressAdded',newAdressAdded)
        

        const { firstName, surname } = req.body.student
        const newStudent =new Student({
            firstName,
            surname,
            adress:newAdressAdded._id
        })
        newStudent.save()
        .then(newStudentAdded=>{
            res.json('New student saved correctly width id :'+newStudentAdded._id)
       
        })
        
        
    })
    
}) 
*/

// callback

app.post('/add/', (req, res) => {
    const newAdress = new Adress(req.body.adress)
    newAdress.save((err, newAdressAdded) => {
        if (!err) {
            const { firstName, surname } = req.body.student
            const newStudent = new Student({
                firstName,
                surname,
                adress: newAdressAdded._id
            })
            newStudent.save((err, newStudentAdded) => {
                if (!err) {
                    res.json('New student saved correctly width id :' + newStudentAdded._id)


                } else {
                    console.log(error)
                    res.status(400).json('Error')
                }

            })

        } else {
            console.log(error)
            res.status(400).json('Error')
        }
    })

})





app.listen(port, () => {
    console.log('Server started on port:' + port)
})






