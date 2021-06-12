const { Schema, model } = require('mongoose')

const nutrient_norm = new Schema({
    russian_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: {
        value: {
            type: Number,
            required: true
        },
        metric: {
            type: String,
            required: true
        },
        value_mcg: {
            type: Number,
        }
    }
})

module.exports = model('Nutrient_norm', nutrient_norm)