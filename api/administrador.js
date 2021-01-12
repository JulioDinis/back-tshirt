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
    obterHash(req.body.senha, (hash) => {
      const senha = hash
      app
        .db("administrador")
        .insert({
          usuario: req.body.usuario,
          senha,
        })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(400).json(err))
    })
  }
  // signin adm
  const signin = async (req, res) => {
    if (!req.body.usuario || !req.body.senha) {
      return res.status(400).send("Dados incompletos")
    }

    const usuario = await app
      .db("administrador")
      .where({ usuario: req.body.usuario })
      .first()

    if (usuario) {
      bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
        if (err || !isMatch) {
          res.status(401).send()
        } else {
          const payload = { id: usuario.usuario }
          res.json({
            usuario: usuario.usuario,
            token: jwt.encode(payload, authSecret),
          })
        }
      })
    } else {
      res.status(401).send("Usuário não cadastrado!")
    }
  }

  return { save, signin }
}
