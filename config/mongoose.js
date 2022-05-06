const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db_for_codeial');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error "));

db.once('open',function(){
    console.log("Successfully connected");
})

module.exports = db;