'use strict'
const Product = require('../models/product')

function saveProduct (req, res) {
  console.log('POST /api/product')
  console.log(req.body)
  // Instanciamos el producto que vamos a insertar en la base de datos
  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description
  // Guardamos el producto en la base de datos
  product.save((err, productStored) => {
    if (err) return res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
    // Si se guardo correctamente nos envia el mismo dato guardado junto con el ID asignado
    return res.status(200).send({ product: productStored })
  })
}

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
    if (!product) return res.status(404).send({ message: `El producto no existe` })

    return res.status(200).send({ product: product })
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
    if (!products) return res.status(404).send({ message: 'No existen productos' })

    return res.status(200).send({ products })
  })
}
function updateProduct (req, res) {
  let productId = req.params.productId

  // Tomo los datos a actualizar del body de la request
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
    if (err) return res.status(500).send({ message: `Error al actualizar el producto: ${productId}` })

    return res.status(200).send({ product: productUpdated })
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al borrar el producto: ${productId}` })

    product.remove(err => {
      if (err) return res.status(500).send({ message: `Error al borrar el producto: ${productId}` })

      return res.status(200).send({ message: 'El producto ha sido eliminado' })
    })
  })
}

// Exporto las funciones para ser usadas en otros archivos
module.exports = {
  saveProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct
}
