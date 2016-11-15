var express = require ('express');
var bodyParser = require ('body-parser');
var mongoDB = require('mongodb').MongoClient;
var app = express();

var db


app.set('view engine', 'ejs')




mongoDB.connect('mongodb://dancaprima:Klaten1995@ds147905.mlab.com:47905/test-expressjs', (err,database)=>{
if(err) return console.log(err)
db = database
app.listen(3000, ()=>{
     console.log('listening on port 3000')
});

});

app.use(bodyParser.urlencoded({extended: true}))



app.get('/', (req, res) => {
  db.collection('quote').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quote', (req, res) => {
  db.collection('quote').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

// db.collection('quote').find().toArray(function(err, results) {
//   console.log(results)
//   // send HTML file populated with quotes here
// })

