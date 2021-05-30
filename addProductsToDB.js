

const mongoose = require('mongoose')
const Product = require('./models/product')
const fs = require('fs')

async function start() {
    try {
        const MONGODB_URI = `mongodb://localhost:27017/diet-planner`
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        const products = await JSON.parse(fs.readFileSync('./products.json')).products
        products.forEach( async (element) => {
            let { name, condition, src, image, category, nutrients } = element
            if (!condition)
                condition = ''
            const product = new Product({
                    name,
                    condition,
                    src,
                    image,
                    category,
                    nutrients
                })
            await product.save()
        })
    } catch(e) {
        console.log(e)
    }
}
// start()