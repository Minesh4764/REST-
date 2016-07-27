var express = require('express');

  //using router
var routes = function(Book) {
var bookRouter = express.Router(); 
bookRouter.route('/')   
    .post(function(req,res){
           var book = new Book(req.body); //creating an instance of book and passing data using req.body
           console.log(book);
           book.save();                   //saving it to database
           res.status(200).send(book);

    })
                        
                                    //routing to books to get all the books on /books
    .get(function(req,res){
         var query ={};
         if(req.query.genre) {                 
              query.genre =req.query.genre;

         }

        Book.find(query,function(err,books){                                //query database
            if(err)
                 //console.log(err);
                res.status(500).send(err);
            else
                res.json(books);
        });
    });
 
bookRouter.use('/:bookid',function(req,res,next){                                //using middlewere to find the bookd for patch getbyid and put command
  Book.findById(req.params.bookid,function(err,book){  

             console.log(book);                              //query database
            if(err) 
                 //console.log(err);
                res.status(500).send(err);
            else if (book){

                   req.book =book;   //assigning to req.book to be usd in get get put patch and delete
                 next();
               }
               else {
                      res.status(404).send('No Book Found');
                   }

        });

    });


bookRouter.route('/:bookId')
  .get(function(req,res){
     
      res.json(req.book);

    })
   .put(function(req,res){
     //
       // Book.findById(req.params.bookId,function(err,book){                                //query database
         //   if(err)
           //      //console.log(err);
             //  res.status(500).send(err);
            //else 
                req.book.title =req.body.title;
                req.book.genre =req.body.genre;
                req.book.author =req.body.author;
                req.book.read  = req.body.read;
                book.save();
                res.json(book);
                
   

    })
      .patch(function(req,res){
       //    if(req.body.title) {
         //  	   req.book.title = req.body.title;
          // }
       if (req.body._id) {
           delete req.body_id;

       }

        for (var key in req.body)
         { 
              req.book[key] =req.body[key];

         }      
        req.book.save(function(err) {
                if(err)
                     res.status(201).send(err);
      
                 else 
                 	   res.json(req.book);
      });

      })
      .delete(function(req,res) {
         req.book.remove();
           res.status(200).send("removed") ; 

      });


return bookRouter;
};

module.exports=routes;