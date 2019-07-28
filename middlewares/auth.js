'use strict'

const services = require('../services')

//Rutas privadas

function isAuth(req,res,next){
  //Verificamos si en la cabecera aparece el atributo authorization
  if(!req.headers.authorization){
    return res.status(403).send({message: 'No tienes autorizacion'})
  }
  // Split crea un array con los elementos que tengan espacios de por Medio. La cabecera de authorization incluye un texto
  // que se llama Bearer, un espacio y despues el token.
  //Nos quedamos con el segundo elemnto y lo almacenamos en Token
  const token = req.headers.authorization.split(" ")[1]

  services.decodeToken(token)
  .then(response => {
    req.user = response
    next()
  })
  .catch(response => {
    res.status(response.status)
  })

}

module.exports = isAuth
