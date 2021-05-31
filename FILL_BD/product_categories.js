

const mongoose = require('mongoose')
const Product_categories = require('../models/product_categories')
const Product = require('../models/product')

async function start() {
    try {
        const MONGODB_URI = `mongodb://localhost:27017/diet-planner`
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        let products = await Product.find()
        const mas = []
        products.forEach( async (element) => {
            let { category } = element
            if (!mas.includes(category))
                mas.push(category)
            
        })
        mas.forEach(async (el) => {
            const product_categories = new Product_categories({
                name: el
            })
            await product_categories.save()
        }) 
    } catch (e) {
        console.log(e)
    }
}
start()