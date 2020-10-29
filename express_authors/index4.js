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
        name:authors[req.params.id].name,
        nationality :authors[req.params.id].nationality
    }
   res.json(newautors)
})

app.get('/json/authors/:id/books', (req, res) => {
    const newbooks={
        books:books[req.params.id].books,
       
    }
    if(books[req.params.id].books){
        res.json(newbooks)
    }else{
        res.send(`The books with the ID ${req.params.id} does not exist `) 
    }

    
})


app.listen(3002, () => {
    console.log('mon port 3002')
})