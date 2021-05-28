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
    role: {
      type: String,
      required: true,
      default: 'пользователь'
    },
    birthday: {
      type: Date,
      required: true
    },
  },
  anthropometry: {
		sex: {
      type: String
    },
		height: {
      type: Number
    },
		weight: {
      type: Number
    },
		neck_girth: {
      type: Number
    },
		waist_girth: {
      type: Number
    },
		forearm_girth: {
      type: Number
    },
		wrist_girth: {
      type: Number
    },
		hip_girth: {
      type: Number
    }
	},

  diet_settings: {
    food_preferences: {
      type: Array
    },
		food_excluded: {
      type: Array
    },
		diet_preferences: {
      type: Array
    },
		number_meals: {
      type: Number
    },
		financial_opportunities: {
      type: Number
    },
  },

  last_menu: {
    type: Object
  }
})


// userSchema.methods.addToCart = function(course) {
//   const items = [...this.cart.items]
//   const idx = items.findIndex(c => {
//     return c.courseId.toString() === course._id.toString()
//   })

//   if (idx >= 0) {
//     items[idx].count = items[idx].count + 1
//   } else {
//     items.push({
//       courseId: course._id,
//       count: 1
//     })
//   }

//   this.cart = {items}
//   return this.save()
// }


// userSchema.methods.removeFromCart = function(id) {
//   let items = [...this.cart.items]
//   const idx = items.findIndex(c => c.courseId.toString() === id.toString())

//   if (items[idx].count === 1) {
//     items = items.filter(c => c.courseId.toString() !== id.toString())
//   } else {
//     items[idx].count--
//   }

//   this.cart = {items}
//   return this.save()
// }

// userSchema.methods.clearCart = function() {
//   this.cart = {items: []}
//   return this.save()
// }

module.exports = model('User', userSchema)