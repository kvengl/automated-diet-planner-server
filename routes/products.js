const { Router } = require('express')
const Nutrient_norms = require('../models/nutrient_norms')
const Product = require('../models/product')

const router = Router()

router.post('/userLogin', async (req, res) => {
    try {
        const { username, password } = req.body
        let candidate = await User.findOne({ "auth.username": username })
        if (!candidate) {
            candidate = await User.findOne({ "auth.email": username })
            if (!candidate) {
                res.send({ ok: false, error: 'Пользователя с таким никнеймом не существует' })
                return
            }
        }
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.auth.password)
            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.send({ ok: true, BSLOGIN: candidate._id })
                })
            }
            else {
                res.send({ ok: false, error: 'Неверный пароль' })
            }

        } else {
            res.send({ ok: false, error: 'Такого пользователя не существует' })
        }
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.post('/userRegister', async (req, res) => {
    try {
        const { username, password, email, birthday } = req.body
        let candidate = await User.findOne({ "auth.username": username })
        if (candidate) {
            res.send({ ok: false, error: 'Пользователь с таким никнеймом уже существует' })
            return
        }
        candidate = await User.findOne({ "auth.email": email })
        if (candidate) {
            res.send({ ok: false, error: 'Пользователь с таким email уже существует' })
            return
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            auth: {
                username, password: hashPassword, email, birthday
            },
            anthropometry: null,
            diet_settings: null,
            last_menu: null
        })
        await user.save()
        res.send({ ok: true })

    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.get('/getUserData/:id', async (req, res) => {
    try {
        const id = req.params.id
        const candidate = await User.findOne({ _id: id })
        if (candidate)
            res.send({ ok: true, object: candidate })
        else
            res.send({ ok: false })
    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.post('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { user } = req.body
        let candidate = await User.findOne({ _id: id })
        if (candidate.auth.password !== user.auth.password) {
            user.auth.password = await bcrypt.hash(user.auth.password, 10)
        }
        if (candidate.auth.username !== user.auth.username) {
            let findUser = await User.findOne({ "auth.username": user.auth.username })
            if (findUser) {
                res.send({ ok: false, error: 'Пользователь с таким именем уже существует' })
                return
            }
        }
        if (candidate.auth.email !== user.auth.email) {
            let findUser = await User.findOne({ "auth.email": user.auth.email })
            if (findUser) {
                res.send({ ok: false, error: 'Пользователь с таким email уже существует' })
                return
            }
        }
        candidate = await User.findByIdAndUpdate(id, user)
        if (candidate)
            res.send({ ok: true, object: user })
        else
            res.send({ ok: false })


    } catch (e) {
        console.log(e)
        res.send({ ok: false })
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.send({ ok: true })
    })
})

router.get('/getNorms', async (req, res) => {
    try {
        let norms = await Nutrient_norms.find()
        res.send({ok: true, message: norms})
    } catch (e) {
        //console.log(e)
        res.send({ ok: false })
    }
})

module.exports = router