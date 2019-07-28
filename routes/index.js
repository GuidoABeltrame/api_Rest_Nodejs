'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

// Ruteos para Productos
// Me devuelve todos los productos de la DB
api.get('/products', productCtrl.getProducts)
// Me devuelve un producto puntual
api.get('/product/:productId', productCtrl.getProduct)
// Creamos un producto en la DB
api.post('/product', productCtrl.saveProduct)
// Actualizamos un producto existente
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

// Ruteos para Usuarios
api.post('/signup', userCtrl.signup)
api.post('/signin', userCtrl.signin)
api.get('/users', userCtrl.getUsers)
api.get('/user/:userId', userCtrl.getUserById)
api.delete('/user/:userId', userCtrl.deleteUser)

// Rutas privadas con el Middleware Auth. No uso auth.isAuth porque solo hay una funcion, por eso llamo directamente al archivo
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api
