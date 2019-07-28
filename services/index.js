'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')


function createToken(user){
  //Lo ideal seria que no se use el Id que crea MongoDB pero por ahora lo dejamos asi.
  const payload = {
    sub: user._id,
    //Cuando fue creado el token. Para esto usamos la libreria Moment
    iat: moment().unix(),
    //Cuando expira el token. Para esto usamos la libreria Moment
    exp: moment().add(14,'days').unix(),
  }
  //Codificamos el token y lo devolvemos.  Usamos la variable SECRET_TOKEN almacenda en la Config
  return jwt.encode(payload,config.SECRET_TOKEN)

}

//Aca usamos una funcion del tipo promesa
function decodeToken(token){
  const decoded = new Promise((resolve,reject) => {
    try {
      //Decodificamos el token
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      //Validamos la expiracion del token
      if(payload.exp <= moment().unix()) {
        //Esto es el response que va a usar quien lo llame
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }

      resolve(payload.sub)

    }catch (err){
      //Si hay un error lo captura y devolvemos el mensaje de error
      //Esto es el response que va a usar quien lo llame
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })

  return decoded

}

module.exports = {
  createToken,
  decodeToken
}
