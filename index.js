const port = 3003
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const db = require('./config/database')
const consign = require('consign')

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

app.use(express.static("public"))
app.db = db
app.listen(port,  () => {
  console.log(`BACK rodadndo na porta ${port}`)
})
