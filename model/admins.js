const mongoose = require('mongoose');

//FOR ADMIN COLLECTION
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
    file:{
        required: false,
        type: String
    }
},{
    collection: 'admins'
})

module.exports =  mongoose.model('Admins', dataSchema);