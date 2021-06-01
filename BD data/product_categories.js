

const mongoose = require('mongoose')
const Product_category = require('../models/product_category')
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
            const product_category = new Product_category({
                name: el
            })
            await product_category.save()
        }) 
    } catch (e) {
        console.log(e)
    }
}
start()