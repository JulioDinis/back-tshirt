const { authSecret } = require("../.env")
const jwt = require("jwt-simple")
const bcrypt = require("bcrypt-nodejs")
const { where } = require("../config/database")
const moment = require("moment")

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
      .db("promocao")
      .insert({
        cupom: req.body.cupom,
        desconto: req.body.desconto,
        descricao: req.body.descricao,
        mensagem: req.body.mensagem,
        validade: req.body.validade,
        dataCadastro: moment().endOf("day").toDate(),
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
      .db("promocao")
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
  const getPromocao = async (req, res) => {
    app
      .db("promocao")
      .distinct()
      .then((promocaos) => {
        console.log("getPromocao")
        res.json(promocaos)
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  }
  const getPromocaoById = async (req, res) => {
    app
      .db("promocao")
      .where({ id: req.params.id })
      .distinct()
      .then((promocaos) => {
        console.log("getPromocao by ID")
        res.json(promocaos)
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  } 

  return { save, editar, getPromocaoById, getPromocao, remove }
}
