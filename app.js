'use strict'

//En este archivo va toda la funcionalidad de Express
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars') //Motor de Plantillas
const app = express()
const api = require('./routes')

//Importo el controlador de producto
const productCtrl = require('./controllers/product')

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//Le digo a la app que los ficheros .hbs usen hbs. Le paso un Objeto de Configuracion
app.engine('.hbs',hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
//Le digo a la app que el el motor de plantillas es el .hbs
app.set('view engine','.hbs')
app.use('/api',api)
//Cuando ruteo al login renderizo la vista
app.get('/login',(req,res) => {
  res.render('login')
})

module.exports = app
