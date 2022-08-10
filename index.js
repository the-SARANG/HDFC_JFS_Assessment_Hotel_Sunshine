// const express = require('express');
// const app = express();
// const port = 3000;

// // app.get('/', (req, res) => {
// //     res.send("Hello from server");
// // });
// // app.listen(port,() => console.log("Server Started"));

// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

// app.use(bodyParser.json()) //used to taking data in the json format
// app.use(express.static('public')) //send static html page
// app.use(bodyParser.urlencoded({ extended: true })) //encoding url
// mongoose.connect('mongodb://localhost:27017/db1'); //connecting database mongodb

// var db = mongoose.connection; //establish connection
// db.on('error', ()=> {
//     console.log('Error in Connection');
// });
// db.once('open',()=>{console.log('database is open');});
// app.post("/signup",(req,res)=>{
//     var name = req.body.name;
//     var email = req.body.email;
//     var phone = req.body.phno;
//     var password = req.body.password;
//     var data = {'name':name, 'email':email, 'phone':phone, 'password':password};
//     db.collection('users').insertOne(data,(error,collection)=>{
//         if(err) throw err;
//         console.log("succesfully inserted record");
//     });
//     return res.redirect(__dirnname+'/signup.html'); //redirect to success signup page
// })
// app.get('/',(req,res)=>{
//     res.set({
//         "Allow-access-Allow-origin":'*'
//     });
//     return res.redirect(__dirname+'/index.html');
// }).listen(3000);
// console.log("starting server n port 3000");



const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(bodyParser.json());//is use for teking data into json format
app.use(express.static('public'));// send static html page
app.use('/public',express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended: true})) //convert into html format
//firstdb
mongoose.connect('mongodb://localhost:27017/firstdb',{useNewUrlParser:true,useUnifiedTopology:true}); // connect to MongoDB database server
var db = mongoose.connection;// establish connection to MongoDB
db.on('error',()=>{console.log('Error in database connection');});
db.once('open',()=>{console.log('database is open for once');});


app.post('/payment',(req, res)=>{
    var name = req.body.name;
    var sname = req.body.sname;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var checkin_date = req.body.checkin_date;
    var checkout_date = req.body.checkout_date;
    var children = req.body.childrens;
    var adults = req.body.adult;
    var rooms1 = req.body.rooms1;
    var num1 = req.body.num1;
    var rent;
    if(rooms1 == "Single Room"){
        rent = num1*parseInt("15000");
    }
    if(rooms1 == "Family Room"){
        rent = num1*parseInt("25000");
    }
    if(rooms1 == "Luxary Room"){
        rent = num1*parseInt("50000");
    }    
    var data = {
        'name': name,
        'email': email, 
        'phone': phone, 
        'sname': sname,
        'address' : address,
        'checkin_date': checkin_date,
        'checkout_date': checkout_date,
        'rooms1' : rooms1,
        'num1': num1,
        'rent': rent,
        'adults': adults,
        'children': children
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err) throw err;
        console.log('successfully insert data');
    });
    return res.sendFile(__dirname+'/payment.html')//redirect to success page
})

app.post('/success',(req, res)=>{
    var mobile = req.body.mobile;
    var username = req.body.username;
    var timestamp = new Date().getTime();
    //var timestamp= sessionStorage.getItem("timestamp");
    
    var paymentInfo = {
        'mobile': mobile, 
        'username': username,
        'timestamp': timestamp
    }
    db.collection('customer').insertOne(paymentInfo,(err,collection)=>{
        if(err) throw err;
        console.log('successfully insert transaction');
    });
    return res.sendFile(__dirname+'/success.html')//redirect to success page
})

// app.get('/success',(req,res)=> {
//     res.set({
//         "Allow-access-Allow-Origin":'*'
//     })
//     return res.sendFile(__dirname+'/signup.html')
// })
app.get('/rooms',(req,res)=> {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname+'/rooms.html')
})
app.get('/about',(req,res)=> {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname+'/about.html')
})
app.get('/contact',(req,res)=> {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname+'/contact.html')
})
app.get('/reservation',(req,res)=> {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname+'/reservation.html')
})
app.get('/payment',(req,res)=> {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname+'/payment.html')
})
app.get('/',(req,res)=> {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname+'/index.html')
}).listen(3000);
console.log('Starting server on 3000 port');