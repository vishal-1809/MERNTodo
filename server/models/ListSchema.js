const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
        max: 50,
    },
    desc: {
        type: String,
        require: true,
        max: 256,
    },
    checked: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('List', ListSchema);