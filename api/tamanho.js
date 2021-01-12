// id, busto_torax,  cintura sigla, genero
const { where } = require("../config/database")

module.exports = (app) => {
  //salva no bd
  const save = (req, res) => {
    app
      .db("tamanho")
      .insert({
        busto_torax: req.body.busto_torax,
        cintura: req.body.cintura,
        genero: req.body.genero,
        sigla: req.body.sigla,
      })
      .then((_) => res.status(204).send())
      .catch((err) => {
        console.log(req)
        console.log(err)
        res.status(400).json(err)
      })
  }
  const update = async (req, res) => {}
  const getTamanho = (req, res) => {
    app
      .db("tamanho")
      .distinct()
      .then((tamanhos) => {
        console.log("getTamanho")
        res.json(tamanhos)
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  }
  const getTamanhoById = (req, res) => {
    app
      .db("tamanho")
      .where({ id: req.params.id })
      .then((tamanho) => res.json(tamanho))
      .catch((err) => res.status(400).json(err))
  }

  return { save, update, getTamanho, getTamanhoById }
}
