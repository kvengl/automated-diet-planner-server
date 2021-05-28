const { Router } = require('express')
const auth = require('../middleware/auth')
const router = Router()
router.get('/', auth, (req, res) => {
    res.render('createDiet', {
        title: 'Составить рацион',
        isCreateDiet: true
    })
})
module.exports = router