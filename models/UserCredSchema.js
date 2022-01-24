const mongoose = require('mongoose');

const UserCredSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi'],
        minlength: 8,
        maxlength: 16
    }
})

const UserCred = mongoose.model('Credential', UserCredSchema);

module.exports = UserCred;
