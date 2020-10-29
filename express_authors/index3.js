const express = require('express')
const app = express();
const array = ['Lawrence Nowell, UK', 'William Shakespeare, UK', 'Charles Dickens, US', 'Oscar Wilde, UK']
/*
app.get('/', (req, res) => {
    res.send('Error API');
    console.log('Error API')
});*/
app.get('/cars/', (req, res) => {
    res.send(' Erreur ');
});

app.get('/authors/:array', (req, res) => {
    if(array[req.params.array]){
        res.send(`authors : ${array[req.params.array]}`)//req.params.array => index
    }else{
        res.send(`The author with the ID ${req.params.array} does not exist `)
    }
    
    
   
        
    
    
})



app.listen(3001, () => {
    console.log('mon port 3001')
})