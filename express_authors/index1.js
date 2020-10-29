const express = require('express')
const app = express();


const arr = ['Beowulf', 'Hamlet, Othello, Romeo and Juliet, MacBeth', 'Oliver Twist, A Christmas Carol', 'The Picture of Dorian Gray, The Importance of Being Earnest']
app.get('/', (req, res) => {
    res.send('Livre API');
    console.log('livre API')
});

// exercice 2
app.get('/Books/:arr/books', (req, res) => {
    //console.log(req.params.array)
    //res.send(array[0])
    res.send(`Books : ${arr[req.params.arr]}`)//req.params.array => index

})




app.listen(8000, () => {
    console.log('mon port 8000')
})