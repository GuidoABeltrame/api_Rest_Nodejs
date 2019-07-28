'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Biblioteca para encriptar contraseñas
const bcrypt = require('bcrypt-nodejs')
//
const crypto = require('crypto')

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false },
  signUpDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

//Es un metodo que se usa para que se ejecute antes de que el modelo se envie a la base de datos
UserSchema.pre('save', function(next) {
  let user = this
  //Comprobamos si el usuario cambio la contraseña. Si no la cambio pasamos al siguiente Middleware
  if(!user.isModified('password')) return next()

  //Si la contraseña fue cambiada creamos el salt para asociarlo a la nueva password
  bcrypt.genSalt(10,(err,salt) => {
    if(err) return next(err)
    //Creo el hash con el salt
    bcrypt.hash(user.password, salt, null, (err,hash) => {
      //Si hay un error no creo el hash y paso el siguiente Middleware
      if(err) return next(err)
      //Si no hay error asocio el hash a la nueva password
      user.password = hash
      next()
    })
  })
})

//Metodo para generar avatars desde la Web Gravatar.
UserSchema.methods.gravatar = function() {
  //Si no tiene un mail registrado va a devolver un Avatar por defecto
  if(!this.email) return `https://gravatar.com/avatar/?s=200d=retro`

  //Si hay mail registrado creamos una funcion hash md5. Gravatar lo usa para generar nuestro Avatar con nuestro email
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200d=retro`
}

module.exports = mongoose.model('User', UserSchema)
