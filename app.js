var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongodb');
var mongojs = require('mongojs');
var db = mongojs('mongodb://akshat31:friend4u@ds153869.mlab.com:53869/mydb',['customers']);
var app = express();
var port = process.env.PORT || 3000;


app.listen( port , ()=>{
    console.log("server started on port 4000")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','ejs');
//app.set('views' , path.join(__dirname, 'views'))
app.use( express.static( "views" ) );

app.get( '/' , (req , res)=>{
    db.customers.find(function (err, docs) {
        res.render('index' , {
            myname:'ENTER HERE:-',
            user:docs
        }); 
    })
    
})

app.post('/users/add' , function(req , res){
    
    var newEntry = {
        name:req.body.first_name,
        email:req.body.my_email,
        address:req.body.appadd
    }
    db.customers.insert(newEntry , function(err , result){
        if(err){ console.log(err);}
        res.redirect('/');
    })
});

app.post('/users/delete' , function(req , res){
    
    var newEntry = {
        name:req.body.delete0
    }
    console.log(newEntry.name)
    db.customers.remove({"name":newEntry.name} , null , function(err , result){
        if(err){ console.log(err)}
        res.redirect('/');
    });
    console.log(newEntry.name)
});



