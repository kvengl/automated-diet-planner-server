const { Schema, model } = require('mongoose')

const appeal = new Schema({
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        requires: true
    },
    message: {
        type: String,
        requires: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Appeal', appeal)