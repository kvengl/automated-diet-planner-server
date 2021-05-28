const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const createDietRoutes = require('./routes/createDiet')
const rulesRoutes = require('./routes/rules')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false

async function start() {
    try {
        const DB_user = 'login';
        const DB_password = 'pass';
        //const DB_url = `mongodb+srv://${DB_user}:${DB_password}@patterns.lq5av.mongodb.net/patterns`;
        const DB_url = `mongodb://localhost:27017/diet-planner`
        await mongoose.connect(DB_url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        app.listen(PORT, function () {
            console.log('Server successfully running at:-', PORT);
        });
    } catch(e) {
        console.log(e);
    }
}
start();


app.engine('hbs', hbs.engine) // в express регистрируем, что существует движок hbs
app.set('view engine', 'hbs') // начинаем использовать
app.set('views', 'views') // указываем папку с html-страницами

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', homeRoutes)
app.use('/createDiet', createDietRoutes)
app.use('/rules', rulesRoutes)