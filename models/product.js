const { Schema, model } = require('mongoose')

const product = new Schema({
    name: {
        type: String,
        requires: true
    },
    condition: {
        type: String,
        requires: true
    },
    src: {
        type: String,
        requires: true
    },
    image: {
        type: String,
        requires: true
    },
    category: {
        type: String,
        required: true
    },
    nutrients: {
        type: Object,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Product', product)