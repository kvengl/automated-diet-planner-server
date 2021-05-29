const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) { 
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
            }
            else {
                req.flash('loginError', 'Неверный пароль')
                res.redirect('/auth/login#login')
            }

        } else {
            req.flash('loginError', 'Такого пользователя не существует')
            res.redirect('/auth/login#login')
        }
    } catch (e) {
        console.log(e)
    }

    res.redirect('/')
})

router.post('/register', async(req, res) => {
    try {
        const { email, password, repeat, name } = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            req.flash('registerError', 'Пользователь с таким email уже существует')
            res.redirect('/auth/login#register')
        } else {

            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashPassword
            })
            await user.save()
            res.redirect('/auth/login#login')
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/userLogin', async(req, res) => {
    try {
        const {username, password} = req.body

        let candidate = await User.findOne({ "auth.username": username })
        if (!candidate) {
            candidate = await User.findOne({ "auth.email": username })
            if (!candidate) {
                res.send({ok: false, error: 'Пользователя с таким никнеймом не существует'})
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
                    res.send({ok: true, BSLOGIN: candidate._id})
                })
            }
            else {
                res.send({ok: false, error: 'Неверный пароль'})
            }

        } else {
            res.send({ok: false, error: 'Такого пользователя не существует'})
        }
    } catch (e) {
        console.log(e)
        res.send({ok: false})
    }
})

router.post('/userRegister', async(req, res) => {
    try {
        const { username, password, email, birthday } = req.body
        let candidate = await User.findOne({"auth.username": username})
        if (candidate) {
            res.send({ok: false, error: 'Пользователь с таким никнеймом уже существует'})
            return
        }

        candidate = await User.findOne({"auth.email": email})
        if (candidate) {
            res.send({ok: false, error: 'Пользователь с таким email уже существует'})
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
        res.send({ok: true})

    } catch (e) {
        console.log(e)
        res.send({ok: false})
    }
})

router.get('/checkSession/:id', async(req, res) => {
    try {
        const id = req.params.id
        
        const sessionUserID = req.session.user._id
        
        if(id == sessionUserID)
            res.send({ok: true})
        else
            res.send({ok: false})

    } catch(e) {
        console.log(e)
        res.send({ok: false})
    }
})

router.get('/getUserData/:id', async(req, res) => {
    try {
        const id = req.params.id

        const candidate = await User.findOne({_id: id})
        
        if(candidate)
            res.send({ok: true, object: candidate})
        else
            res.send({ok: false})

    } catch(e) {
        // console.log(e)
        res.send({ok: false})
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.send({ok: true})
    })
})

module.exports = router