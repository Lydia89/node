const express = require('express')
const app = express();
const array = ['Lawrence Nowell, UK', 'William Shakespeare, UK', 'Charles Dickens, US', 'Oscar Wilde, UK']
app.get('/', (req, res) => {
  res.send('Authors API');
  console.log('Authors API')
});

// exercice 1
app.get('/authors/:array', (req, res) => {
  //console.log(req.params.array)
  //res.send(array[0])
  res.send(`authors : ${array[req.params.array]}`)//req.params.array => index

})
/*exercice 0
app.get('/authors/2/',(req,res)=>{
  
  res.send('William Shakespeare, UK')

})
app.get('/authors/3/',(req,res)=>{
  
  res.send('Charles Dickens, US')

})
app.get('/authors/4/',(req,res)=>{
  
  res.send('Oscar Wilde, UK')

})




*/

app.listen(3000, () => {
  console.log('mon port 3000')
})