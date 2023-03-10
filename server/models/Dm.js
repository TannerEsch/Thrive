const mongoose = require('mongoose');
const { Schema } = mongoose;

const dmSchema = new Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: Array,
    date: {
        type: Date,
        default: Date.now()
    }
})

const Dm = mongoose.model('Dm', dmSchema);

module.exports = Dm;