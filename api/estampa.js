const bcrypt = require("bcrypt-nodejs")
const fileUpload = require("express-fileupload")
const moment = require("moment")

module.exports = (app) => {
  const save = (req, res) => {
    app
      .db("estampa")
      .returning("id")
      .insert({
        dataLancamento: moment().endOf("day").toDate(),
        descricao: req.body.descricao,
        valor: req.body.valor,
      })
      .then(([id]) => {
        console.log(req.body)
        req.body.novasImagens.forEach((imagem) => {
          console.log("entra")
          const caminho = "http://localhost:3003" + imagem
          inserirImagemEstampa(id, caminho)
        })
        res.status(204).send("yabadabadu")
        console.log("Salvo na tabela Estampa")
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  }
  const inserirImagemEstampa = (id, caminho) => {
    app
      .db("imagem_estampa")
      .insert({
        caminho: caminho,
        estampaId: id,
      })
      .then((_) => {
        console.log("Salvo na tabela Imagem_estampa !")
      })
      .catch((err) => {
        console.log(`Erro ao inserir na tabela imagens ${err}`)
      })
  }
  const upload = (req, res) => {
    if (!req.files) {
      return res.status(500).send({ msg: "Arquivo não encontrado", res })
    }
    const arquivoRecebido = req.files.file

    arquivoRecebido.mv(
      `${__dirname}/../public/estampas/${arquivoRecebido.name}`,
      function (err) {
        if (err) {
          console.log(err)
          return res
            .status(500)
            .send({ msg: "não foi possivel salvar a imagem" })
        }
        return res.send({
          file: arquivoRecebido.name,
          path: `/estampas/${arquivoRecebido.name}`,
          ty: arquivoRecebido.type,
        })
      }
    )
  }

  const getEstampas = (req, res) => {
    console.log("yasj")
    app
      .db("estampa")
      .distinct()
      .then((estampas) => {
        console.log("getEstampas")
        res.json(estampas)
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  }
  const getEstampasByID = (req, res) => {
    app
      .db("estampa")
      .where({ id: req.params.id })
      .then((estampa) => res.json(estampa))
      .catch((err) => res.status(400).json(err))
  }

  
  // const getEstampasByDescricao = (req, res) => {
  //   let retorno = new Array()
  //   app
  //     .db("estampa")
  //     .join("imagem_estampa", "estampa.id", "=", "imagem_estampa.estampaId")
  //     .where("descricao", "like", `%${req.params.descricao}%`)
  //     .then((estampas) => {
  //       estampas.forEach((estampa) => {
  //         app
  //           .db("imagem_estampa")
  //           .where({ estampaId: estampa.id })
  //           .then((imagem) => {
  //             estampa.imagens = imagem
  //             retorno.push(estampa)
  //             console.log(retorno)
  //           })
  //           .catch((err) => {
  //             console.log(err)
  //           })
  //       })
  //       console.log(retorno)
  //       res.json(estampas)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       res.status(400).json(err)
  //     })
  // }

  const getEstampasByDescricao = (req, res) => {
    let retorno = new Array()
      app
        .db("estampa")
        .where("descricao", "like", `%${req.params.descricao}%`)
        .then((estampas) => {
          console.log(estampas)
          res.json(estampas)
        })
        .catch((err) => {
          console.log(err)
          res.status(400).json(err)
        })
    
  }
  const getImagensByID = (req, res) => {
    console.log("get Imagens")
    app
      .db("imagem_estampa")
      .where({ estampaId: req.params.id })
      .then((imagem) => {
        res.json(imagem)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  }
  const update = (req, res) => {
    console.log("Atualizando..")
    console.log(req.body)
    if (req.body.novasImagens) {
      const imagens = req.body.novasImagens

      imagens.forEach((imagem) => {
        caminho = "http://localhost:3003" + imagem

        console.log(caminho)
        app
          .db("imagem_estampa")
          .where({
            caminho,
            estampaId: req.params.id,
          })
          .then((response) => {
            if (response.length > 0) {
              console.log("imagem já cadastrada")
            } else {
              inserirImagemEstampa(req.params.id, caminho)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    }
    app
      .db("estampa")
      .where({ id: req.params.id })
      .update({
        descricao: req.body.descricao,
        valor: req.body.valor,
      })
      .then((_) => res.status(204).send())
      .catch((err) => {
        console.log(err)
        res.status(404).json(err)
      })
  }

  return {
    save,
    upload,
    update,
    getEstampas,
    getEstampasByID,
    getImagensByID,
    getEstampasByDescricao,
  }
}
