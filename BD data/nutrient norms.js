

const mongoose = require('mongoose')
const Nutrient_norm = require('../models/nutrient_norm')

async function start() {
    try {
        const MONGODB_URI = `mongodb://localhost:27017/diet-planner`
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        
        const mas = [{
            russian_name: 'Калории',
            name: 'calories',
            data: {
                value: 2300,
                metric: 'ккал'
            }
        },{
            russian_name: 'Белки',
            name: 'proteins',
            data: {
                value: 75,
                metric: 'г',
                value_mcg: 75 * 1000 * 1000
            }
        },{
            russian_name: 'Жиры',
            name: 'fats',
            data: {
                value: 84,
                metric: 'г',
                value_mcg: 84 * 1000 * 1000
            }
        },{
            russian_name: 'Углеводы',
            name: 'carbohydrates',
            data: {
                value: 310,
                metric: 'г',
                value_mcg: 310 * 1000 * 1000
            }
        },{
            russian_name: 'Кальций',
            name: 'calcium',
            data: {
                value: 1000,
                metric: 'мг',
                value_mcg: 1000 * 1000
            }
        },{
            russian_name: 'Железо',
            name: 'iron',
            data: {
                value: 10,
                metric: 'мг',
                value_mcg: 10 * 1000
            }
        },{
            russian_name: 'Магний',
            name: 'magnesium',
            data: {
                value: 400,
                metric: 'мг',
                value_mcg: 400 * 1000
            }
        },{
            russian_name: 'Фосфор',
            name: 'phosphorus',
            data: {
                value: 700,
                metric: 'мг',
                value_mcg: 700 * 1000
            }
        },{
            russian_name: 'Калий',
            name: 'potassium',
            data: {
                value: 4700,
                metric: 'мг',
                value_mcg: 4700 * 1000
            }
        },{
            russian_name: 'Натрий',
            name: 'sodium',
            data: {
                value: 1300,
                metric: 'мг',
                value_mcg: 1300 * 1000
            }
        },{
            russian_name: 'Цинк',
            name: 'zinc',
            data: {
                value: 11,
                metric: 'мг',
                value_mcg: 11 * 1000
            }
        },{
            russian_name: 'Медь',
            name: 'copper',
            data: {
                value: 0.9,
                metric: 'мг',
                value_mcg: 0.9 * 1000
            }
        },{
            russian_name: 'Марганец',
            name: 'manganese',
            data: {
                value: 2.3,
                metric: 'мг',
                value_mcg: 2.3 * 1000
            }
        },{
            russian_name: 'Селен',
            name: 'selenium',
            data: {
                value: 55,
                metric: 'мкг',
                value_mcg: 55
            }
        },{
            russian_name: 'Фтор',
            name: 'fluorine',
            data: {
                value: 4000,
                metric: 'мкг',
                value_mcg: 4000
            }
        },{
            russian_name: 'Витамин A',
            name: 'A',
            data: {
                value: 900,
                metric: 'мкг',
                value_mcg: 900
            }
        },{
            russian_name: 'Бета-каротин',
            name: 'beta-Carotene',
            data: {
                value: 5000,
                metric: 'мкг',
                value_mcg: 5000
            }
        },{
            russian_name: 'Альфа-каротин',
            name: 'alpha-Carotene',
            data: {
                value: 5000,
                metric: 'мкг',
                value_mcg: 5000
            }
        },{
            russian_name: 'Витамин D',
            name: 'D',
            data: {
                value: 15,
                metric: 'мкг',
                value_mcg: 15
            }
        },{
            russian_name: 'Витамин D2',
            name: 'D2',
            data: {
                value: 7.5,
                metric: 'мкг',
                value_mcg: 7.5
            }
        },{
            russian_name: 'Витамин D3',
            name: 'D3',
            data: {
                value: 16.25,
                metric: 'мкг',
                value_mcg: 16.25
            }
        },{
            russian_name: 'Витамин E',
            name: 'E',
            data: {
                value: 14.6,
                metric: 'мг',
                value_mcg: 14.6 * 1000
            }
        },{
            
            russian_name: 'Витамин K',
            name: 'K',
            data: {
                value: 120,
                metric: 'мкг',
                value_mcg: 120
            }
        },{
            russian_name: 'Витамин C',
            name: 'C',
            data: {
                value: 90,
                metric: 'мг',
                value_mcg: 90 * 1000
            }
        },{
            russian_name: 'Витамин B1',
            name: 'B1',
            data: {
                value: 1.2,
                metric: 'мг',
                value_mcg: 1.2 * 1000
            }
        },
        {
            russian_name: 'Витамин B2',
            name: 'B2',
            data: {
                value: 1.3,
                metric: 'мг',
                value_mcg: 1.3 * 1000
            }
        },{
            russian_name: 'Витамин B3',
            name: 'B3',
            data: {
                value: 16,
                metric: 'мг',
                value_mcg: 16 * 1000
            }
        },{
            russian_name: 'Витамин B4',
            name: 'B4',
            data: {
                value: 500,
                metric: 'мг',
                value_mcg: 500 * 1000
            }
        },{
            russian_name: 'Витамин B5',
            name: 'B5',
            data: {
                value: 5,
                metric: 'мг',
                value_mcg: 5 * 1000
            }
        },{
            russian_name: 'Витамин B6',
            name: 'B6',
            data: {
                value: 1.3,
                metric: 'мг',
                value_mcg: 1.3 * 1000
            }
        },
        {
            russian_name: 'Витамин B9',
            name: 'B9',
            data: {
                value: 400,
                metric: 'мкг',
                value_mcg: 400
            }
        },
        {
            russian_name: 'Витамин B12',
            name: 'B12',
            data: {
                value: 2.4,
                metric: 'мкг',
                value_mcg: 2.4
            }
        },
        {
            russian_name: 'Триптофан',
            name: 'tryptophan',
            data: {
                value: 0.8,
                metric: 'г',
                value_mcg: 0.8 * 1000 * 1000
            }
        },
        {
            russian_name: 'Треонин',
            name: 'threonine',
            data: {
                value: 2.4,
                metric: 'г',
                value_mcg: 2.4 * 1000 * 1000
            }
        },
        {
            russian_name: 'Изолейцин',
            name: 'isoleucine',
            data: {
                value: 2,
                metric: 'г',
                value_mcg: 2 * 1000 * 1000
            }
        },
        {
            russian_name: 'Лейцин',
            name: 'leucine',
            data: {
                value: 4.6,
                metric: 'г',
                value_mcg: 4.6 * 1000 * 1000
            }
        },{
            russian_name: 'Лизин',
            name: 'lysine',
            data: {
                value: 4.1,
                metric: 'г',
                value_mcg: 4.1 * 1000 * 1000
            }
        },{
            russian_name: 'Метионин',
            name: 'methionine',
            data: {
                value: 1.8,
                metric: 'г',
                value_mcg: 1.8 * 1000 * 1000
            }
        },{
            russian_name: 'Цистин',
            name: 'cystine',
            data: {
                value: 1.8,
                metric: 'г',
                value_mcg: 1.8 * 1000 * 1000
            }
        },{
            russian_name: 'Фенилаланин',
            name: 'phenylalanine',
            data: {
                value: 4.4,
                metric: 'г',
                value_mcg: 4.4 * 1000 * 1000
            }
        },{
            russian_name: 'Тирозин',
            name: 'tyrosine',
            data: {
                value: 4.4,
                metric: 'г',
                value_mcg: 4.4 * 1000 * 1000
            }
        },{
            russian_name: 'Валин',
            name: 'valine',
            data: {
                value: 2.5,
                metric: 'г',
                value_mcg: 2.5 * 1000 * 1000
            }
        },{
            russian_name: 'Аргинин',
            name: 'arginine',
            data: {
                value: 6.1,
                metric: 'г',
                value_mcg: 6.1 * 1000 * 1000
            }
        },{
            russian_name: 'Гистидин',
            name: 'histidine',
            data: {
                value: 2.1,
                metric: 'г',
                value_mcg: 2.1 * 1000 * 1000
            }
        },{
            russian_name: 'Аланин',
            name: 'alanine',
            data: {
                value: 6.6,
                metric: 'г',
                value_mcg: 6.6 * 1000 * 1000
            }
        },{
            russian_name: 'Аспарагиновая кислота',
            name: 'aspartic-acid',
            data: {
                value: 12.2,
                metric: 'г',
                value_mcg: 12.2 * 1000 * 1000
            }
        },{
            russian_name: 'Глутаминовая кислота',
            name: 'glutamic-acid',
            data: {
                value: 13.6,
                metric: 'г',
                value_mcg: 13.6 * 1000 * 1000
            }
        },{
            russian_name: 'Глицин',
            name: 'glycine',
            data: {
                value: 3.5,
                metric: 'г',
                value_mcg: 3.5 * 1000 * 1000
            }
        },{
            russian_name: 'Пролин',
            name: 'proline',
            data: {
                value: 4.5,
                metric: 'г',
                value_mcg: 4.5 * 1000 * 1000
            }
        },{
            russian_name: 'Серин',
            name: 'serine',
            data: {
                value: 8.3,
                metric: 'г',
                value_mcg: 8.3 * 1000 * 1000
            }
        }]

        for (let i = 0; i < mas.length; i++) {
            const val = mas[i]
            const {name, data, russian_name} = val
            const nutrients_norms = new Nutrient_norm({
                russian_name,
                name,
                data
            })
            await nutrients_norms.save()
        }
        
        
    } catch (e) {
        console.log(e)
    }
}
start()