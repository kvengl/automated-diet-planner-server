

const mongoose = require('mongoose')
const Product = require('../models/product')
const fs = require('fs')

async function start() {
    try {
        // const products = await JSON.parse(fs.readFileSync('./products.json')).products
        // products.forEach((element, i) => {
        //     let obj = element.nutrients.base
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.base[key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.base[key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.base.saccharides.monosaccharides
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.base.saccharides.monosaccharides[key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.base.saccharides.monosaccharides[key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.base.saccharides.disaccharides
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.base.saccharides.disaccharides[key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.base.saccharides.disaccharides[key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.base.saccharides.all
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.base.saccharides.all[key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.base.saccharides.all[key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.base.polysaccharides
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.base.polysaccharides[key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.base.polysaccharides[key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.minerals
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.minerals[key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.minerals[key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.others
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.others[key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.others[key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients['amino-acids']
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients['amino-acids'][key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients['amino-acids'][key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.vitamins['fat-soluble']
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.vitamins['fat-soluble'][key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.vitamins['fat-soluble'][key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }

        //     obj = element.nutrients.vitamins['water-soluble']
        //     for (key in obj) {
        //         if (obj[key] !== null) {
        //             if (obj[key].metric === 'г') {
        //                 products[i].nutrients.vitamins['water-soluble'][key].value_mcg = obj[key].value * 1000000
        //             } else if (obj[key].metric === 'мг') {
        //                 products[i].nutrients.vitamins['water-soluble'][key].value_mcg = obj[key].value * 1000
        //             }
        //         }
        //     }
        // })
        // fs.writeFileSync('./products.json', JSON.stringify({ products }))

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
    } catch (e) {
        console.log(e)
    }
}
start()