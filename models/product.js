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
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: 'Product_category',
		required: true
	},
    nutrients: {
        type: Object,
        required: true
    },
    metrics: [
        {
            name: String,
            metricId: {
                type: Schema.Types.ObjectId,
                ref: 'Metric',
                required: true
            },
            value: Number,
            value_gram: Number
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Product', product)