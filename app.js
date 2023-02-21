
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const port  = process.env.PORT || 3000 ;
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
mongoose.set('strictQuery', false);
const db = mongoose.connection

db.on('error', (error) => {// check if connection has problems
    console.log(error)
})
db.once('connected', () => { //check ig database is connected succesfuly
    console.log('Database Connected');
})



const customersAPI = require('./routes/customers-api')
app.use('/customers', customersAPI)

const adminsAPI = require('./routes/admins-api')
app.use('/admins', adminsAPI)








app.get("/", function(req, res){ //request, response
    res.send("<h1>Server is Running:)</h1>");
})

app.listen(port, ()=>{
    console.log(`Server is Running on PORT ${port}`);
})