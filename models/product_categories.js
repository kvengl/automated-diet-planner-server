const { Schema, model } = require('mongoose')

const product_categories = new Schema({
    name: {
        type: String,
        requires: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Product_categories', product_categories)