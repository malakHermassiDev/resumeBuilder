//import express 
// framework 
const express = require('express')
//choose port for the localhost
const port = process.env.port|| 3000
const mongoose = require('mongoose')
//we create a new express web app
const app = express()
const config = require('./config.js')
const session = require('express-session')
var cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
// link , (local db)
//promise (asynchronous tasks) --> 
//error
// .then( )
// .catch( )
// Middleware
app.use(express.static(path.join(__dirname, 'public/admin/template')));
app.use(express.static(path.join(__dirname, 'public')));
//callback function (function as parameter )
mongoose.connect('mongodb+srv://malekhermassi:s1vbC8wANV8eRH7q@cluster0.lggm9kq.mongodb.net/?retryWrites=true&w=majority', option={
        useNewUrlParser : true ,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('we are connected to MongoDB')
      
    })
    .catch((error)=> {
        console.error('Error connecting to the DB' , error)
    })
app.get('/' , (req , res)=>{
    res.send('hello our first app')
})
//
//callback function
//logout
app.use(
    session({
        secret : 'azer1234567',
        resave : false,
        saveUninitialized: false
    })
)
app.post('/logout' , (req , res)=>{
    req.session.destroy(error =>{
        if(error){
            return res.status(500).json({message : 'error in the server side'})
        }
        return res.status(200).json({message : "Successful Logout"})
    })
} )
//importing for the routers
const userRouter = require('./router/user.routes.js')(app);
const adminRouter = require('./router/admin.routes.js')(app);
const educationRouter = require('./router/education.routes.js')(app)
const feedbackRouter = require('./router/feedback.routes.js')(app)
const experienceRouter = require('./router/experience.routes.js')(app)
const questionRouter = require('./router/question.routes.js')(app)
const skillRouter = require('./router/skills.routes.js')(app)
// Redirect to login page

  
  // Remove the existing route that redirects to the dashboard
  app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public' , 'admin' , 'template', 'index.html'));
  });
  app.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'client', 'index.html'));
  });
app.listen( port , ()=>{
    console.log(`Server listen on port ${port}`)
})