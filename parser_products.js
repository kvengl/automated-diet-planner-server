const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const parseProducts = async () => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }
    const $ = await getHTML(`https://fitaudit.ru/categories/fds`)
    const obj = {}
    obj.categories = []
    // проходимся по названиям категорий продуктов
    $('h2.pr__ind_c.pr__ind_c_mbottom.fimlist__title_groups').each((i, el) => {
        const category = $(el).text()
        obj.categories.push({
            name: category,
            products: []
        })
    })
    // проходимся по категориям продуктов
    $('ul.fimlist.fimlist__items').each((i, el) => {
        // проходимся по каждому продукту в i-ой категории
        $(el).find('.pr__brick.fimlist__item').each((j, val) => {
            const name = $(val).find('.fimlist_text_wrap').text().trim().replace(/[\n\t]+/g, " ").replace(/[\s]+/g, " ")
            let condition = $(val).find('.fimlist_addlink').text().trim() || null
            const src = $(val).find('.vertical_pseudo').attr('href')
            const image = 'http://fitaudit.ru/img/flist/' + src.match(/\d+/)[0] + '.jpg'
            obj.categories[i].products.push({
                name,
                condition,
                src,
                image
            })
        })
    })
    const data = {
        products: []
    }
    obj.categories.forEach(el => {
        el.products.forEach(val => {
            data.products.push({
                name: val.name,
                condition: val.condition,
                src: val.src,
                image: val.image,
                category: el.name,
                nutrients: {
                    "base": {
                        "calories": null,
                        "proteins": null,
                        "fats": null,
                        "carbohydrates": null,
                        "water": null,
                        "ash": null,
                        "saccharides": {
                            "monosaccharides": {
                                "glucose": null,
                                "fructose": null,
                                "galactose": null
                            },
                            "disaccharides": {
                                "sucrose": null,
                                "lactose": null,
                                "maltose": null
                            },
                            "all": null
                        },
                        "polysaccharides": {
                            "cellulose": null,
                            "starch": null
                        }
                    },
                    "vitamins": {
                        "fat-soluble": {
                            "A": null,
                            "beta-Carotene": null,
                            "alpha-Carotene": null,
                            "D": null,
                            "D2": null,
                            "D3": null,
                            "E": null,
                            "K": null
                        },
                        "water-soluble": {
                            "C": null,
                            "B1": null,
                            "B2": null,
                            "B3": null,
                            "B4": null,
                            "B5": null,
                            "B6": null,
                            "B9": null,
                            "B12": null
                        }
                    },
                    "minerals": {
                        "calcium": null,
                        "iron": null,
                        "magnesium": null,
                        "phosphorus": null,
                        "potassium": null,
                        "sodium": null,
                        "zinc": null,
                        "copper": null,
                        "manganese": null,
                        "selenium": null,
                        "fluorine": null
                    },
                    "others": {
                        "cholesterol": null,
                        "trans-fat": null
                    },
                    "amino-acids": {
                        "tryptophan": null,
                        "threonine": null,
                        "isoleucine": null,
                        "leucine": null,
                        "lysine": null,
                        "methionine": null,
                        "cystine": null,
                        "phenylalanine": null,
                        "tyrosine": null,
                        "valine": null,
                        "arginine": null,
                        "histidine": null,
                        "alanine": null,
                        "aspartic-acid": null,
                        "glutamic-acid": null,
                        "glycine": null,
                        "proline": null,
                        "serine": null,
                        "BCAA": null,
                        "creatine": null
                    },
                    "calorie-burn-time": {
                        "Sleep Meditation": null,
                        "Recreation": null,
                        "Reading books, Internet": null,
                        "Sex": null,
                        "Yoga, Pilates": null,
                        "Dances": null,
                        "Walking": null,
                        "Football": null,
                        "Swimming": null,
                        "Press training": null,
                        "Strength training": null,
                        "Cycling": null,
                        "Jumping rope Running": null
                    }
                }
            })
        })
    })
    fs.writeFileSync('./products.json', JSON.stringify(data));
}
const parseVitamins = async () => {
    const products = await JSON.parse(fs.readFileSync('./products.json')).products
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }
    for (let i = 0; i < products.length; i++) {
        console.log(i)
        const url = products[i].src + '/vitamins'
        const $ = await getHTML(url)
        await $('.tbl-value ').each((j, el) => {
            const value = $(el).text().trim().replace(/[\n\t]+/g, " ").replace(/[\s]+/g, "")
            const number_native = parseFloat(value.replace(',', '.'))
            const metric = value.replace(',', '.').replace(number_native, '').replace('.0', '')
            let obj = {}
            if (value === 'н/д') {
                obj = null
            } else {
                let number = number_native
                if (metric === 'мг')
                    number *= 1000
                if (metric === 'г')
                    number *= 1000000
                obj = {
                    value: number_native,
                    metric,
                    value_mcg: number
                }
            }
            switch (j) {
                case 0:
                    products[i].nutrients.vitamins['fat-soluble'].A = obj
                    break
                case 1:
                    products[i].nutrients.vitamins['fat-soluble']['beta-Carotene'] = obj
                    break
                case 2:
                    products[i].nutrients.vitamins['fat-soluble']['alpha-Carotene'] = obj
                    break
                case 3:
                    products[i].nutrients.vitamins['fat-soluble'].D = obj
                    break
                case 4:
                    products[i].nutrients.vitamins['fat-soluble'].D2 = obj
                    break
                case 5:
                    products[i].nutrients.vitamins['fat-soluble'].D3 = obj
                    break
                case 6:
                    products[i].nutrients.vitamins['fat-soluble'].E = obj
                    break
                case 7:
                    products[i].nutrients.vitamins['fat-soluble'].K = obj
                    break
                case 8:
                    products[i].nutrients.vitamins['water-soluble'].C = obj
                    break
                case 9:
                    products[i].nutrients.vitamins['water-soluble'].B1 = obj
                    break
                case 10:
                    products[i].nutrients.vitamins['water-soluble'].B2 = obj
                    break
                case 11:
                    products[i].nutrients.vitamins['water-soluble'].B3 = obj
                    break;
                case 12:
                    products[i].nutrients.vitamins['water-soluble'].B4 = obj
                    break;
                case 13:
                    products[i].nutrients.vitamins['water-soluble'].B5 = obj
                    break;
                case 14:
                    products[i].nutrients.vitamins['water-soluble'].B6 = obj
                    break;
                case 15:
                    products[i].nutrients.vitamins['water-soluble'].B9 = obj
                    break;
                case 16:
                    products[i].nutrients.vitamins['water-soluble'].B12 = obj
                    break;
                case 17:
                    break;
            }
        })

    }
    fs.writeFileSync('./products.json', JSON.stringify({ products }))
}
const parseMinerals = async () => {
    const products = await JSON.parse(fs.readFileSync('./products.json')).products
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }
    for (let i = 0; i < products.length; i++) {
        console.log(i)
        const url = products[i].src + '/minerals'
        const $ = await getHTML(url)
        await $('.tbl-value ').each((j, el) => {
            const value = $(el).text().trim().replace(/[\n\t]+/g, " ").replace(/[\s]+/g, "")
            const number_native = parseFloat(value.replace(',', '.'))
            const metric = value.replace(',', '.').replace(number_native, '').replace('.0', '')
            let obj = {}
            if (value === 'н/д') {
                obj = null
            } else {
                let number = number_native
                if (metric === 'мг')
                    number *= 1000
                if (metric === 'г')
                    number *= 1000000

                obj = {
                    value: number_native,
                    metric,
                    value_mcg: number
                }
            }
            switch (j) {
                case 0:
                    products[i].nutrients.minerals.calcium = obj
                    break
                case 1:
                    products[i].nutrients.minerals.iron = obj
                    break
                case 2:
                    products[i].nutrients.minerals.magnesium = obj
                    break
                case 3:
                    products[i].nutrients.minerals.phosphorus = obj
                    break
                case 4:
                    products[i].nutrients.minerals.potassium = obj
                    break
                case 5:
                    products[i].nutrients.minerals.sodium = obj
                    break
                case 6:
                    products[i].nutrients.minerals.zinc = obj
                    break
                case 7:
                    products[i].nutrients.minerals.copper = obj
                    break
                case 8:
                    products[i].nutrients.minerals.manganese = obj
                    break
                case 9:
                    products[i].nutrients.minerals.selenium = obj
                    break
                case 10:
                    products[i].nutrients.minerals.fluorine = obj
                    break
                case 11:
                    break;
            }
        })

    }
    fs.writeFileSync('./products.json', JSON.stringify({ products }))
}
const parseAmino = async () => {
    const products = await JSON.parse(fs.readFileSync('./products.json')).products
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }
    for (let i = 0; i < products.length; i++) {
        console.log(i)
        const url = products[i].src + '/amino'
        const $ = await getHTML(url)
        await $('.tbl-value ').each((j, el) => {
            const value = $(el).text().trim().replace(/[\n\t]+/g, " ").replace(/[\s]+/g, "")
            const number_native = parseFloat(value.replace(',', '.'))
            const metric = value.replace(',', '.').replace(number_native, '').replace('.0', '')
            let obj = {}
            if (value === 'н/д') {
                obj = null
            } else {
                let number = number_native
                if (metric === 'мг')
                    number *= 1000
                if (metric === 'г')
                    number *= 1000000

                obj = {
                    value: number_native,
                    metric,
                    value_mcg: number
                }
            }
            switch (j) {
                case 0:
                    products[i].nutrients['amino-acids'].tryptophan = obj
                    break
                case 1:
                    products[i].nutrients['amino-acids'].threonine = obj
                    break
                case 2:
                    products[i].nutrients['amino-acids'].isoleucine = obj
                    break
                case 3:
                    products[i].nutrients['amino-acids'].leucine = obj
                    break
                case 4:
                    products[i].nutrients['amino-acids'].lysine = obj
                    break
                case 5:
                    products[i].nutrients['amino-acids'].methionine = obj
                    break
                case 6:
                    products[i].nutrients['amino-acids'].cystine = obj
                    break
                case 7:
                    products[i].nutrients['amino-acids'].phenylalanine = obj
                    break
                case 8:
                    products[i].nutrients['amino-acids'].tyrosine = obj
                    break
                case 9:
                    products[i].nutrients['amino-acids'].valine = obj
                    break
                case 10:
                    products[i].nutrients['amino-acids'].arginine = obj
                    break
                case 11:
                    products[i].nutrients['amino-acids'].histidine = obj
                    break
                case 12:
                    products[i].nutrients['amino-acids'].alanine = obj
                    break
                case 13:
                    products[i].nutrients['amino-acids']['aspartic-acid'] = obj
                    break
                case 14:
                    products[i].nutrients['amino-acids']['glutamic-acid'] = obj
                    break
                case 15:
                    products[i].nutrients['amino-acids'].glycine = obj
                    break
                case 16:
                    products[i].nutrients['amino-acids'].proline = obj
                    break
                case 17:
                    products[i].nutrients['amino-acids'].serine = obj
                    break
                case 18:
                    products[i].nutrients['amino-acids'].BCAA = obj
                    break
                case 19:
                    products[i].nutrients['amino-acids'].creatine = obj
                    break
                case 20:
                    break
            }
        })

    }
    fs.writeFileSync('./products.json', JSON.stringify({ products }))
}
const parseCalories = async () => {
    const products = await JSON.parse(fs.readFileSync('./products.json')).products
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }
    for (let i = 0; i < products.length; i++) {
        console.log(i)
        const url = products[i].src + '/calories'
        const $ = await getHTML(url)
        products[i].nutrients['calorie-burn-time'] = {}
        if ($('.tbl-value').length === 0)
            products[i].nutrients['calorie-burn-time'] = null
        await $('.tbl-value').each((j, el) => {
            const value = $(el).text().trim().replace(/[\n\t]+/g, " ").replace(/[\s]+/g, "")
            const hours = +value.replace(/ч.*/, '')
            const minutes = +value.replace(/.*ч/, '').replace('мин', '')
            const time_min = hours * 60 + minutes
            switch (j) {
                case 0:
                    products[i].nutrients['calorie-burn-time']["sleep"] = time_min
                    break
                case 1:
                    products[i].nutrients['calorie-burn-time']["meditation"] = time_min
                    break
                case 2:
                    products[i].nutrients['calorie-burn-time']["recreation"] = time_min
                    break
                case 3:
                    products[i].nutrients['calorie-burn-time']["Reading books, Internet"] = time_min
                    break
                case 4:
                    products[i].nutrients['calorie-burn-time']["sex"] = time_min
                    break
                case 5:
                    products[i].nutrients['calorie-burn-time']["Yoga, Pilates"] = time_min
                    break
                case 6:
                    products[i].nutrients['calorie-burn-time']["dances"] = time_min
                    break
                case 7:
                    products[i].nutrients['calorie-burn-time']["walking"] = time_min
                    break
                case 8:
                    products[i].nutrients['calorie-burn-time']["football"] = time_min
                    break
                case 9:
                    products[i].nutrients['calorie-burn-time']["swimming"] = time_min
                    break
                case 10:
                    products[i].nutrients['calorie-burn-time']["Press training"] = time_min
                    break
                case 11:
                    products[i].nutrients['calorie-burn-time']["Strength training"] = time_min
                    break
                case 12:
                    products[i].nutrients['calorie-burn-time']["cycling"] = time_min
                    break
                case 13:
                    products[i].nutrients['calorie-burn-time']["Jumping rope"] = time_min
                    break
                case 14:
                    products[i].nutrients['calorie-burn-time']["Running"] = time_min
                    break
                case 15:
                    break
            }
        })

    }
    fs.writeFileSync('./products.json', JSON.stringify({ products }))
}
const parseСarbohydrates = async () => {
    const products = await JSON.parse(fs.readFileSync('./products.json')).products
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }
    for (let i = 0; i < products.length; i++) {
        console.log(i)
        const url = products[i].src + '/carbohydrate'
        const $ = await getHTML(url)
        await $('.ptab__amount ').each((j, el) => {
            const value = $(el).text().trim().replace(/[\n\t]+/g, " ").replace(/[\s]+/g, "")
            const number_native = parseFloat(value.replace(',', '.'))
            const metric = value.replace(',', '.').replace(number_native, '').replace('.00', '')
            let obj = {}
            if (value === 'н/д') {
                obj = null
            } else {
                let number = number_native
                if (metric === 'мг')
                    number *= 1000
                if (metric === 'г')
                    number *= 1000000

                obj = {
                    value: number_native,
                    metric,
                    value_mcg: number
                }
            }
            switch (j) {
                case 0:
                    products[i].nutrients.base.saccharides.monosaccharides.glucose = obj
                    break
                case 1:
                    products[i].nutrients.base.saccharides.monosaccharides.fructose = obj
                    break
                case 2:
                    products[i].nutrients.base.saccharides.monosaccharides.galactose = obj
                    break
                case 3:
                    products[i].nutrients.base.saccharides.disaccharides.sucrose = obj
                    break
                case 4:
                    products[i].nutrients.base.saccharides.disaccharides.lactose = obj
                    break
                case 5:
                    products[i].nutrients.base.saccharides.disaccharides.maltose = obj
                    break
                case 6:
                    products[i].nutrients.base.saccharides.all = obj
                    break
                case 7:
                    products[i].nutrients.base.polysaccharides.cellulose = obj
                    break
                case 8:
                    products[i].nutrients.base.polysaccharides.starch = obj
                    break
            }
        })
    }
    fs.writeFileSync('./products.json', JSON.stringify({ products }))
}
const parseBase = async () => {
    const products = await JSON.parse(fs.readFileSync('./products.json')).products
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }
    for (let i = 0; i < products.length; i++) {
        console.log(i)
        const url = products[i].src
        const $ = await getHTML(url)

        const test = await $('.js__msr_cc').eq(0).text().includes('кКал')

        const sum = test ? 0 : 2

        const calories = await $('.js__msr_cc').eq(0 + sum).text()
        const fats = await $('.js__msr_cc').eq(1 + sum).text()
        const proteins = await $('.js__msr_cc').eq(2 + sum).text()
        const carbo = await $('.js__msr_cc').eq(3 + sum).text()
        const water = await $('.js__msr_cc').eq(4 + sum).text()
        const ash = await $('.js__msr_cc').eq(5 + sum).text()
        const cholesterol = await $('.js__msr_cc').eq(9 + sum).text()
        const transFat = await $('.js__msr_cc').eq(10 + sum).text()
        const mas = [calories, fats, proteins, carbo, water, ash, cholesterol, transFat]
        mas.forEach((val, j) => {
            const value = val.trim().replace(/[\n\t]+/g, " ").replace(/[\s]+/g, "")
            const number_native = parseFloat(value.replace(',', '.'))
            const metric = value.replace(',', '.').replace(number_native, '').replace('.0', '')
            let obj = {}
            if (value === 'н/д') {
                obj = null
            } else {
                let number = number_native
                if (metric.includes('мг'))
                    number *= 1000
                else if (metric.includes('г'))
                    number *= 1000000

                obj = {
                    value: number_native,
                    metric,
                    value_mcg: number
                }
                if (j === 0) { delete obj.value_mcg }
            }
            switch (j) {
                case 0:
                    products[i].nutrients.base.calories = obj
                    break
                case 1:
                    products[i].nutrients.base.fats = obj
                    break
                case 2:
                    products[i].nutrients.base.proteins = obj
                    break
                case 3:
                    products[i].nutrients.base.carbohydrates = obj
                    break
                case 4:
                    products[i].nutrients.base.water = obj
                    break
                case 5:
                    products[i].nutrients.base.ash = obj
                    break
                case 6:
                    products[i].nutrients.others.cholesterol = obj
                    break
                case 7:
                    products[i].nutrients.others['trans-fat'] = obj
                    break
            }
        })
    }
    fs.writeFileSync('./products.json', JSON.stringify({ products }))
}
// parseProducts()
// parseVitamins()
// parseMinerals()
// parseAmino()
// parseCalories()
// parseСarbohydrates()
parseBase()