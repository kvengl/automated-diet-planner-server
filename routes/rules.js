const { Router } = require('express')
const auth = require('../middleware/auth')
const router = Router()
router.get('/', auth, (req, res) => {
    res.render('rules', {
        title: 'API',
        isRules: true
    })
})
module.exports = router