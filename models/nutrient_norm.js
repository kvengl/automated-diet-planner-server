const { Schema, model } = require('mongoose')

const nutrient_norm = new Schema({
    russian_name: {
        type: String,
        requires: true
    },
    name: {
        type: String,
        requires: true
    },
    data: {
        value: {
            type: Number,
            requires: true
        },
        metric: {
            type: String,
            requires: true
        },
        value_mcg: {
            type: Number,
        }
    }
})

module.exports = model('Nutrient_norm', nutrient_norm)