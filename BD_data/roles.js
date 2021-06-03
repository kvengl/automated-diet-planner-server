
const mongoose = require('mongoose')
const User_role = require('../models/user_roles')

async function start() {
    try {
        const MONGODB_URI = `mongodb://localhost:27017/diet-planner`
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        const roles = ['admin', 'moderator', 'user']
        roles.forEach(async (el) => {
            const role = new User_role({
                name: el
            })
            await role.save()
        }) 
    } catch (e) {
        console.log(e)
    }
}
start()