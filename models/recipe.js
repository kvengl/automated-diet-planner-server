const { Schema, model } = require('mongoose')

const recipe = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients_price: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cooking_time: {
        type: Number
    },
    ingredients: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            content: Number,
            content_gram: Number,
            metric_name: String,
            metricId: {
                type: Schema.Types.ObjectId,
                ref: 'Metric',
                required: true
            }
        }
    ],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Recipe', recipe)