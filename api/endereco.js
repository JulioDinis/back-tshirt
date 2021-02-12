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
  //  id | bairro | cep | cidade | complemento | destinatario | estado | numero | rua | principal | clienteId
  const save = (req, res) => {
    console.log(req)
    app
      .db("endereco")
      .insert({
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        complemento: req.body.complemento,
        destinatario: req.body.destinatario,
        estado: req.body.estado,
        numero: req.body.numero,
        rua: req.body.rua,
        principal: req.body.principal,
        clienteId: req.body.cliente,
      })
      .then((_) => res.status(204).send())
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  }
  const editar = async (req, res) => {}
  const remove = async (req, res) => {
    app
      .db("endereco")
      .where("id", req.params.id)
      .del()
      .then((_) => {
        res.status(204).send("removido")
      })
      .catch((err) => {
        console.log(err)
        res.status(404).json(err)
      })
  }
  const getEndereco = async (req, res) => {
    app
      .db("endereco")
      .distinct()
      .then((enderecos) => {
        console.log("getEndereco")
        res.json(enderecos)
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  }
  const getEnderecoByClienteId = async (req, res) => {
    app
      .db("endereco")
      .where({ clienteId: req.params.id })
      .distinct()
      .then((enderecos) => {
        console.log("getEnderecoByClienteId")
        res.json(enderecos)
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  } 

  return { save, editar, getEnderecoByClienteId, getEndereco, remove }
}
