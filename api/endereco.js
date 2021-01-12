// id, busto_torax,  cintura sigla

const { authSecret } = require("../.env")
const jwt = require("jwt-simple")
const bcrypt = require("bcrypt-nodejs")
const { where } = require("../config/database")

module.exports = (app) => {
  //hash senha
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
    })
  }

  //salva no bd
  const save = (req, res) => {
    const senha = hash
    app
      .db("administrador")
      .insert({
        usuario: req.body.usuario,
        senha,
      })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(400).json(err))
  }
  // signin adm
  const editar = async (req, res) => {}

  return { save, editar }
}
