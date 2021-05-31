const {Schema, model} = require('mongoose')

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
      type: String,
      required: true,
      default: 'user'
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