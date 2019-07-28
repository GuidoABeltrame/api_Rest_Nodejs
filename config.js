module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB || 'mongodb://shopUser:gbeltrame12@localhost:27017/shop',
  SECRET_TOKEN: 'miclavedetokens'
}
