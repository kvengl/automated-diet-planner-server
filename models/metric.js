const { Schema, model } = require('mongoose')

const metric = new Schema({
    name: {
        type: String,
        requires: true
    },
    content_gram: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Metric', metric)

/*
Метрики:
- гр
- шт
- литр
- мл
- ст.л.
- ч.л.
- пучок
- щепотка
- зубчик
- кусок
- по вкусу
- пакетик
*/