const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  auth: {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      value: {
        type: String,
        required: true,
        default: 'user'
      },
      key: {
        type: Schema.Types.ObjectId,
        ref: 'User_role',
        required: true
      }
    },
    birthday: {
      type: Date,
      required: true
    },
  },
  anthropometry: {
    type: Object
  },
  diet_settings: {
    type: Object
  },
  last_menu: {
    type: Object
  }
})

module.exports = model('User', userSchema)