'use strict'

const User = require('../models/user') // Instanciamos el modelo de Usuario.
const service = require('../services')

function signup (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName
    // No guardamos la contraseña aca porque de eso se encarga el UserSchema.pre
  })
  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
    return res.status(200).send({ message: 'El usuario se creo correctamente', token: service.createToken(user) })
  })
}

function signin (req, res) {
  User.find({
    email: req.body.email
  }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (user.length === 0) return res.status(404).send({ message: 'No existe el usuario' })
    req.user = user
    res.status(200).send({
      message: 'Te has logeado correctamente',
      token: service.createToken(user)
    })
  })
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: `Error al realizar la consulta de usuarios: ${err}` })
    if (users.length === 0) return res.status(404).send({ message: 'No existen usuarios registrados' })
    return res.status(200).send({ users })
  })
}

function getUserById (req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({ message: `Error al realizar la consulta de usuario: ${err}` })
    if (!user) return res.status(404).send({ message: `El usuario no existe` })
    res.status(200).send({
      user: user
    })
  })
}

function deleteUser (req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, user) => {
    if (err) res.status(500).send({ message: `Error al borrar el usuario: ${userId}` })
    user.remove(err => {
      if (err) res.status(500).send({ message: `Error al borrar el usuario: ${userId}` })

      res.status(200).send({ message: `El usuario ${userId} ha sido eliminado` })
    })
  })
}

module.exports = {
  signup,
  signin,
  getUsers,
  getUserById,
  deleteUser
}
