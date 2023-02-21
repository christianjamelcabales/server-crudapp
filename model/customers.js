const mongoose = require('mongoose');

//FOR CUSTOMERS COLLECTION
const dataSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
},{
    collection: 'customers'
})

module.exports =  mongoose.model('Customers', dataSchema);