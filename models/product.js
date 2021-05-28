const { Schema, model } = require('mongoose')

const product = new Schema({
    name: {
        type: String,
        requires: true
    },
    categories: {
        type: Array,
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