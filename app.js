
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/BooksAPI');  //connecting to booksapi database

var Book = require('./model/bookModel');  // gettting the schema from file

var app = express();

var port = process.env.PORT || 3000; //get the port from GulP file environment
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var bookRouter = require('./routes/bookroutes')(Book); //its a function so we need (); we can also pass some value from here 




app.use('/books', bookRouter);

//app.use('/author', authorrouter);




app.get('/', function(req, res){            //going to default host we can put index.file here.
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});

