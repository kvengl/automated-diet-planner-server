const { Router } = require('express')
const Nutrient_norms = require('../models/nutrient_norms')
const Product = require('../models/product')
const Product_categories = require('../models/product_categories')
const auth = require('../middleware/auth_api')
const router = Router()

router.get('/getNorms', auth, async (req, res) => {
    try {
        let norms = await Nutrient_norms.find()
        res.send({ok: true, message: norms})
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.get('/getProducts', auth, async (req, res) => {
    try {
        const products = await Product.find()
        const obj = products.map(val => {
            const {name, _id, category, image, src, condition} = val
            return {
                name,
                _id,
                category,
                condition,
                image,
                src
            }
        })
        res.send({ok: true, message: obj})
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.get('/getCategories', auth, async (req, res) => {
    try {
        const categories = await Product_categories.find()
        const obj = categories.map(val => {
            const {name, _id} = val
            return {
                name,
                _id
            }
        })
        res.send({ok: true, message: obj})
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})



module.exports = router