const { Router } = require('express')
const router = Router()
router.get('/', (req, res) => {
    res.render('rules', {
        title: 'API',
        isRules: true
    })
})
module.exports = router