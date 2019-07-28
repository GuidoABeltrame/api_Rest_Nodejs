'use strict'

const mongoose = require('mongoose') // Biblioteca para conectar con MongoDB
const app = require('./app')
const config = require('./config')

mongoose.set('useCreateIndex', true)

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos establecida..')

  // El servidor se pone a escuchar
  app.listen(config.port, () => {
    console.log(`API REST Corriendo en http://localhost:${config.port}`)
  })
})
