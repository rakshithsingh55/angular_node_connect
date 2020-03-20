const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./routes/route');
//coonect to mongoose
mongoose.connect('mongodb://localhost/contactlist');

mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @27017');
})

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in database connection :'+err);
    }
});

const port = 3000;
//adding middlewares
app.use(cors());
//adding bodyparser
app.use(bodyparser.json());
//adding router
app.use('/api', route);

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req ,res)=>{
    res.send('foobar');
});

app.listen(port , ()=>{
    console.log(`server started at port ${port}`)
});