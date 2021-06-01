const { Schema, model } = require('mongoose')

const product_category = new Schema({
    name: {
        type: String,
        requires: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Product_category', product_category)