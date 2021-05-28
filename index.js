const express = require('express')

const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home')
const createDietRoutes = require('./routes/createDiet')
const rulesRoutes = require('./routes/rules')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')

const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const PORT = 3001
// const PORT = process.env.PORT || 3000

const MONGODB_URI = `mongodb+srv://login:pass@patterns.lq5av.mongodb.net/patterns`
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false

async function start() {
    try {
        // const DB_user = 'login'
        // const DB_password = 'pass'
        // //const DB_url = `mongodb+srv://login:pass@patterns.lq5av.mongodb.net/patterns`;
        // const DB_url = `mongodb://localhost:27017/diet-planner`
        // await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        app.listen(PORT, function () {
            console.log('Server successfully running at:-', PORT)
        });
    } catch(e) {
        console.log(e)
    }
}
start()


app.engine('hbs', hbs.engine) // в express регистрируем, что существует движок hbs
app.set('view engine', 'hbs') // начинаем использовать
app.set('views', 'views') // указываем папку с html-страницами

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/createDiet', createDietRoutes)
app.use('/rules', rulesRoutes)
app.use('/auth', authRoutes)