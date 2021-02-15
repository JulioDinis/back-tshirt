const moment = require("moment")

const fileUpload = require("express-fileupload")

module.exports = (app) => {
  app.use(fileUpload())

  const save = (req, res) => {
    const id = app
      .db("produto")
      .returning("id")
      .insert({
        data_cadastro: moment().endOf("day").toDate(),
        descricao: req.body.descricao,
        valor: req.body.valor,
        genero: req.body.genero,
      })
      .then(([id]) => {
        req.body.imagens.forEach((imagem) => {
          const caminho = "http://localhost:3003/produtos" + imagem
          inserirImagemProduto(id, caminho)
        })
        req.body.tamanho.forEach((element) => {
          console.log(element)
          app
            .db("tamanho")
            .where({ genero: req.body.genero, sigla: element })
            .then((tamanho) => {
              console.log(tamanho[0].id)
              console.log(1)
              app
                .db("tamanho_produto")
                .insert({
                  tamanhoId: tamanho[0].id,
                  produtoId: id,
                  quantidade: "100",
                })
                .then((_) => res.status(204).send({ msg: "yep!" }))
                .catch((err) => {
                  console.log(`Erro ao inserir na tabela tamanho ${err}`)
                })
            })
            .catch((err) => {
              console.log("Não rolou" + err)
            })
        })
        /// res.status(204).send({ msg: "Yep!" })
        // Use the mv() method to place the file somewhere on your server
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  }
  const upload = (req, res) => {
    console.log("recebido")
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }

    const myFile = req.files.file
    console.log(myFile)
    // Use the mv() method to place the file somewhere on your server
    myFile.mv(`${__dirname}/../public/produtos/${myFile.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: " eroor" })
      }
      return res.send({
        file: myFile.name,
        path: `/${myFile.name}`,
        ty: myFile.type,
      })
    })
  }
  const inserirImagemProduto = (id, caminho) => {
    app
      .db("imagem_produto")
      .insert({
        caminho: caminho,
        produtoId: id,
      })
      .then((_) => {
        console.log("Inserido com sucesso")
      })
      .catch((err) => {
        console.log(`Erro ao inserir na tabela imagens ${err}`)
      })
  }
  const getProdutos = (req, res) => {
    app
      .db("produto")
      .where({ disponivel: "true" })
      .orderBy("data_cadastro")
      .then((produtos) => res.json(produtos))
      .catch((err) => res.status(400).json(err))
  }
  const getProdutosById = (req, res) => {
    console.log(req.params)
    app
      .db("produto")
      .where({ id: req.params.id })
      .then((produtos) => res.json(produtos))
      .catch((err) => res.status(400).json(err))
  }

  const getImagensById = (req, res) => {
    app
      .db("imagem_produto")
      .where({ produtoId: req.params.id })
      .then((imagem) => {
        res.json(imagem)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  }
  const getProdutosByDescricao = (req, res) => {
    app
      .db("produto")
      .where("descricao", "like", `%${req.params.descricao}%`)
      .then((produtos) => {
        console.log("get Produto " + req.params.descricao)
        produtos.forEach((produto) => {
          app
            .db("imagem_produto")
            .where({ produtoId: produto.id })
            .then((imagem) => {
              produto.imagens = imagem
            })
            .catch((err) => {
              console.log(err)
            })
        })
        console.log(produtos)
        res.json(produtos)
      })
      .catch((err) => res.status(400).json(err))
  }
  const update = (req, res) => {
    console.log("Atualizando...")
    console.log(req.body)
    if (req.body.novasImagens) {
      const imagens = req.body.novasImagens
      imagens.forEach((imagem) => {
        caminho = "http://localhost:3003/produtos" + imagem
        console.log(caminho)
        app
          .db("imagem_produto")
          .where({
            caminho,
            produtoId: req.params.id,
          })
          .then((response) => {
            if (response.length > 0) {
              console.log("imagem já cadastrada")
            } else {
              inserirImagemProduto(req.params.id, caminho)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    }
    app
      .db("produto")
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
  const remove = (req, res) => {
    app
      .db("produto")
      .where({ id: req.params.id })
      .update({
        disponivel: false,
      })
      .then((_) => {
        res.status(204).send("removido")
      })
      .catch((err) => {
        console.log(err)
        res.status(404).json(err)
      })
  }

  return {
    save,
    getProdutos,
    getProdutosById,
    getProdutosByDescricao,
    upload,
    getImagensById,
    update,
    remove,
  }
}
