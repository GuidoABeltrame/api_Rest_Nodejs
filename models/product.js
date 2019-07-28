'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Se crea el Schema que usa MongoDB
const ProductSchema = Schema ({
  name: String,
  picture: String,
  price: {type: Number, default: 0},
  category: { type: String, enum: ['computers','phones','accesories'] },
  description: String
})

//Se exporta el modelo para que se pueda importar desde otro lado
module.exports = mongoose.model('Product', ProductSchema);
