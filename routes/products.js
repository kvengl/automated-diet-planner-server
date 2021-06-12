const { Router } = require('express')
const Nutrient_norm = require('../models/nutrient_norm')
const Product = require('../models/product')
const Product_category = require('../models/product_category')
const auth = require('../middleware/auth_api')
const router = Router()
const qp = require('quadprog-js')
const fs = require('fs')
const { diag } = require('numeric')

router.get('/getNorms', auth, async (req, res) => {
    try {
        const norms = await Nutrient_norm.find()
        res.send({ ok: true, message: norms })
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.get('/getProducts', auth, async (req, res) => {
    try {
        const products = await Product.find()
        const obj = products.map(val => {
            const { name, _id, category, image, src, condition } = val
            return {
                name,
                _id,
                category,
                condition,
                image,
                src
            }
        })
        res.send({ ok: true, message: obj })
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.get('/getCategories', auth, async (req, res) => {
    try {
        const categories = await Product_category.find()
        const obj = categories.map(val => {
            const { name, _id } = val
            return {
                name,
                _id
            }
        })
        res.send({ ok: true, message: obj })
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.post('/optimization', auth, async (req, res) => {
    try {
        const { cards, calories, volume } = req.body
        let nutrient_norms = await Nutrient_norm.find()
        nutrient_norms.shift()
        nutrient_norms = nutrient_norms.map(val => val.data.value_mcg / 1000) // приведём к миллиграммам
        let min_values = []
        const max_values = []
        let relative_value_nutritional_components = []
        // Формируем матрицу относительной ценности j-компонента в i-ом продукте
        const ccal_norm = []
        for (let i = 0; i < cards.length; i++) {
            const product_name = cards[i].product_name
            min_values.push(cards[i].min_value)
            max_values.push(cards[i].max_value)
            const product = await Product.findOne({ name: product_name })
            
            const base = product.nutrients.base
            ccal_norm.push(base.calories.value / 100)
            const proteins = base.proteins ? base.proteins.value_mcg / 100 : 0
            const fats = base.fats ? base.fats.value_mcg / 100 : 0
            const carbohydrates = base.carbohydrates ? base.carbohydrates.value_mcg / 100 : 0

            const minerals = product.nutrients.minerals
            const calcium = minerals.calcium ? minerals.calcium.value_mcg / 100 : 0
            const iron = minerals.iron ? minerals.iron.value_mcg / 100 : 0
            const magnesium = minerals.magnesium ? minerals.magnesium.value_mcg / 100 : 0
            const phosphorus = minerals.phosphorus ? minerals.phosphorus.value_mcg / 100 : 0
            const potassium = minerals.potassium ? minerals.potassium.value_mcg / 100 : 0
            const sodium = minerals.sodium ? minerals.sodium.value_mcg / 100 : 0
            const zinc = minerals.zinc ? minerals.zinc.value_mcg / 100 : 0
            const copper = minerals.copper ? minerals.copper.value_mcg / 100 : 0
            const manganese = minerals.manganese ? minerals.manganese.value_mcg / 100 : 0
            const selenium = minerals.selenium ? minerals.selenium.value_mcg / 100 : 0
            const fluorine = minerals.fluorine ? minerals.fluorine.value_mcg / 100 : 0

            const fat_soluble = product.nutrients.vitamins['fat-soluble']
            const A = fat_soluble.A ? fat_soluble.A.value_mcg / 100 : 0
            const beta_Carotene = fat_soluble['beta-Carotene'] ? fat_soluble['beta-Carotene'].value_mcg / 100 : 0
            const alpha_Carotene = fat_soluble['alpha-Carotene'] ? fat_soluble['alpha-Carotene'].value_mcg / 100 : 0
            const D = fat_soluble['alpha-Carotene'] ? fat_soluble['alpha-Carotene'].value_mcg / 100 : 0
            const D2 = fat_soluble.D2 ? fat_soluble.D2.value_mcg / 100 : 0
            const D3 = fat_soluble.D3 ? fat_soluble.D3.value_mcg / 100 : 0
            const E = fat_soluble.E ? fat_soluble.E.value_mcg / 100 : 0
            const K = fat_soluble.K ? fat_soluble.K.value_mcg / 100 : 0

            const water_soluble = product.nutrients.vitamins['water-soluble']
            const C = water_soluble.C ? water_soluble.C.value_mcg / 100 : 0
            const B1 = water_soluble.B1 ? water_soluble.B1.value_mcg / 100 : 0
            const B2 = water_soluble.B2 ? water_soluble.B2.value_mcg / 100 : 0
            const B3 = water_soluble.B3 ? water_soluble.B3.value_mcg / 100 : 0
            const B4 = water_soluble.B4 ? water_soluble.B4.value_mcg / 100 : 0
            const B5 = water_soluble.B5 ? water_soluble.B5.value_mcg / 100 : 0
            const B6 = water_soluble.B6 ? water_soluble.B6.value_mcg / 100 : 0
            const B9 = water_soluble.B9 ? water_soluble.B9.value_mcg / 100 : 0
            const B12 = water_soluble.B12 ? water_soluble.B12.value_mcg / 100 : 0

            const amino = product.nutrients['amino-acids']
            const tryptophan = amino.tryptophan ? amino.tryptophan.value_mcg / 100 : 0
            const threonine = amino.threonine ? amino.threonine.value_mcg / 100 : 0
            const isoleucine = amino.isoleucine ? amino.isoleucine.value_mcg / 100 : 0
            const leucine = amino.leucine ? amino.leucine.value_mcg / 100 : 0
            const lysine = amino.lysine ? amino.lysine.value_mcg / 100 : 0
            const methionine = amino.methionine ? amino.methionine.value_mcg / 100 : 0
            const cystine = amino.cystine ? amino.cystine.value_mcg / 100 : 0
            const phenylalanine = amino.phenylalanine ? amino.phenylalanine.value_mcg / 100 : 0
            const tyrosine = amino.tyrosine ? amino.tyrosine.value_mcg / 100 : 0
            const valine = amino.valine ? amino.valine.value_mcg / 100 : 0
            const arginine = amino.arginine ? amino.arginine.value_mcg / 100 : 0
            const histidine = amino.histidine ? amino.histidine.value_mcg / 100 : 0
            const alanine = amino.alanine ? amino.alanine.value_mcg / 100 : 0
            const aspartic_acid = amino.aspartic_acid ? amino.aspartic_acid.value_mcg / 100 : 0
            const glutamic_acid = amino.glutamic_acid ? amino.glutamic_acid.value_mcg / 100 : 0
            const glycine = amino.glycine ? amino.glycine.value_mcg / 100 : 0
            const proline = amino.proline ? amino.proline.value_mcg / 100 : 0
            const serine = amino.serine ? amino.serine.value_mcg / 100 : 0

            const nutrients = [proteins, fats, carbohydrates, calcium, iron, magnesium, phosphorus, potassium, sodium, zinc, copper, manganese, selenium, fluorine, A, beta_Carotene, alpha_Carotene, D, D2, D3, E, K, C, B1, B2, B3, B4, B5, B6, B9, B12, tryptophan, threonine, isoleucine, leucine, lysine, methionine, cystine, phenylalanine, tyrosine, valine, arginine, histidine, alanine, aspartic_acid, glutamic_acid, glycine, proline, serine].
            map(val => val / 1000) // приведём к миллиграммам

            relative_value_nutritional_components.push(nutrients)
        }
        // Формируем матрицу Гессе
        let H = Array(cards.length).fill().map(()=>Array(cards.length).fill())
        // Формируем вектор диагонали
        const diag = []
        let sum = 0
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < nutrient_norms.length; j++)
                sum += relative_value_nutritional_components[i][j] ** 2
            diag.push(sum)
            sum = 0
        }
        // Заполняем матрицу Гессе
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < cards.length; j++) {
                if (i === j) H[i][j] = diag[i]
                else if (i < j) {
                    sum = 0
                    for (let k = 0; k < nutrient_norms.length; k++)
                        sum += relative_value_nutritional_components[i][k] * relative_value_nutritional_components[j][k]
                    H[i][j] = sum
                    H[j][i] = sum
                }
            }
        }

        const f = []
        for (let i = 0; i < cards.length; i++) {
            sum = 0
            for (let j = 0; j < nutrient_norms.length; j++)
                sum += relative_value_nutritional_components[i][j] * nutrient_norms[j] * 2
            f.push(-sum)
        }

        const A = cards.map(() => 1)
        const b = volume
        const Aeq = ccal_norm
        const beq = calories

        const lb = []
        const ub = []
        for (let i = 0; i < cards.length; i++) {
            const min = []
            const max = []
            for (let j = 0; j < cards.length; j++) {
                if (i === j) {
                    min.push(-1)
                    max.push(1)
                } else {
                    min.push(0)
                    max.push(0)
                }
            }
            lb.push(min)
            ub.push(max)
        }
        min_values = min_values.map(val => -val)
        const result = qp(H, f, [Aeq, A, ...lb, ...ub], [beq, b, ...min_values, ...max_values]).solution.map(val => +val.toFixed(2))
        
        // статистика (нутриенты без калорий)
        const statistic = []
        for (let i = 0; i < nutrient_norms.length; i++) {
            sum = 0
            for (let j = 0; j < cards.length; j++)
                sum += result[j] * relative_value_nutritional_components[j][i]
            statistic.push(+sum.toFixed(2))    
        }
        // добавим в начало калории
        sum = 0
        for (let i = 0; i < cards.length; i++)
            sum += result[i] * ccal_norm[i]
        statistic.unshift(+sum.toFixed(2))
        
        // приведём к нормальным метрикам
        const nutrients = await Nutrient_norm.find()
        for (let i = 0; i < statistic.length; i++) {
            if (nutrients[i].data.metric === 'г')
                statistic[i] = +(statistic[i] / 1000).toFixed(2)
            if (nutrients[i].data.metric === 'мкг')
                statistic[i] = +(statistic[i] * 1000).toFixed(2) 
        }

        const tableData = []
        // сформируем данные для таблицы на клиенте
        for (let i = 0; i < statistic.length; i++) {
            if (i === 0) {
                tableData.push({
                    key: i,
                    name: nutrients[i].russian_name,
                    fact: statistic[i] + ' ' + nutrients[i].data.metric,
                    recommend: calories + ' ккал',
                    deviation: +Math.abs(statistic[i] - calories).toFixed(2)
                })
            } else {
                tableData.push({
                    key: i,
                    name: nutrients[i].russian_name,
                    fact: statistic[i] + ' ' + nutrients[i].data.metric,
                    recommend: nutrients[i].data.value + ' ' + nutrients[i].data.metric,
                    deviation: +Math.abs(statistic[i] - nutrients[i].data.value).toFixed(2)
                })
            }
        }
        res.send({ ok: true, message: result, statistic: tableData })

    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

module.exports = router