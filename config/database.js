//Connect to Mongo database
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/binar_crud';

mongoose.connect(
    mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}
).then(() => console.log('Mongodb Connected'))

mongoose.Promise = global.Promise;
module.exports = mongoose;