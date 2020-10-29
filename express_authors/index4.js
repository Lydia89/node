const express = require('express')
const app = express();

const authors = [
    {
        name: "Lawrence Nowell",
        nationality: "UK",

    },
    {
        name: "William Shakespeare",
        nationality: "UK",

    },
    {
        name: "Charles Dickens",
        nationality: "UK",

    },
    {
        name: "Oscar Wilde",
        nationality: "UK",

    },

]

const books = [
    {
        books: "Beowulf"
    },
    {
        books: "Hamlet, Othello, Romeo and Juliet, MacBeth"
    },
    {
        books: "The Picture of Dorian Gray"
    },
    {
        books: "The Importance of Being Earnest"
    }
]


app.get('/json/authors/:id', (req, res) => {


    const newautors={
       Authors:authors[req.params.id],
      // nationality :authors[req.params.id]
    }
    if(authors[req.params.id]){
            res.json(newautors)
        } else{
            res.json(`The authors with the ID ${[req.params.id]} does not exist `) 
        }
   
})

app.get('/json/authors/:id/books', (req, res) => {
    const newbooks={
        books:books[req.params.id]
       
    }
    if(authors[req.params.id]){
        res.json(newbooks)
    }else{
        res.json(`The books  does not exist because authors  with Id${[req.params.id]} not exist `) 
    }

    
})


app.listen(3002, () => {
    console.log('mon port 3002')
})