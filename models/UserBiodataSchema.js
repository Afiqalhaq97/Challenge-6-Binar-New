const mongoose = require('mongoose');

const UserBiodataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama harus diisi']
    },
    age: {
        type: Number,
        required: [true, 'Umur harus diisi']
    },
    user_id: {
        type: String,
        required: true
    }
})

const UserBio = mongoose.model('Biodata', UserBiodataSchema);

module.exports = UserBio;
