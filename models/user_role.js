const { Schema, model } = require('mongoose')

const user_role = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = model('User_role', user_role)