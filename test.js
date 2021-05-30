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
parseProducts()

const parseVitamins = async (products) => {
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }

    for (let i = 0; i < products.length; i++) {
        const $ = await getHTML(products[i].src)

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
    fs.writeFileSync('./products.json', JSON.stringify(obj))
}
const products = JSON.parse(fs.readFileSync('./products.json'))
// parseNutrients()