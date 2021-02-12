const { authSecret } = require("../.env")
const jwt = require("jwt-simple")
const bcrypt = require("bcrypt-nodejs")
const { where } = require("../config/database")

module.exports = (app) => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.senha) {
      return res.status(400).send("Dados incompletos")
    }

    const usuario = await app
      .db("cliente")
      .where({ email: req.body.email })
      .first()

    if (usuario) {
      bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
        if (err || !isMatch) {
          res.status(401).send()
        }
        const payload = { id: usuario.id }
          res.json({
          nome: usuario.nome,
          usuario: usuario.email,
          token: jwt.encode(payload, authSecret),
          usuarioId: usuario.id
        })
      })
    } else {
      res.status(401).send("Usuário não cadastrado!")
    }
  }

  return { signin }
}
