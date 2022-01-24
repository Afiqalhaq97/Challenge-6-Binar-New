const mongoose = require('mongoose');

const UserHistorySchema = new mongoose.Schema({
    wins: {
        type: Number,
        required: [true, 'Wins harus diisi']
    },
    losses: {
        type: Number,
        required: [true, 'Losses harus diisi']
    },
    user_id: {
        type: String,
        required: true
    }
})

const UserHistory = mongoose.model('History', UserHistorySchema);

module.exports = UserHistory;