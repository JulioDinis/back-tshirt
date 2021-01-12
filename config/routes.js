
module.exports = (app) => {
  // add cliente
  app.post("/singup", app.api.cliente.save)

  //longin cliente
  app.post("/signin", app.api.auth.signin)
  app.post("/cliente/:id", app.api.cliente.update)
  app.get("/cliente/:id", app.api.cliente.getClienteById)
  app.get("/cliente", app.api.cliente.getClientes)



  // add adm
  app.post("/adminAdd", app.api.administrador.save)

  //login adm
  app.post("/admin", app.api.administrador.signin)

  //estampa

  //save
  app.post("/estampa/add", app.api.estampa.save)
  app.post("/estampa/upload", app.api.estampa.upload)
  //update
  app.put("/estampa/:id", app.api.estampa.update)
  //busca
  app.get("/estampa", app.api.estampa.getEstampas)
  app.get("/estampa/:id", app.api.estampa.getEstampasByID)
  //upload de imagem
  app.post("/produto/upload", app.api.produto.upload)
  //buscar imagens
  app.get("/estampa/img/:id", app.api.estampa.getImagensByID)

  //Tamanho
  //save
  app.post("/tamanho", app.api.tamanho.save)
  //update
  app.post("/tamanho/update/:id", app.api.tamanho.update)
  //busca
  app.get("/tamanho", app.api.tamanho.getTamanho)
  app.get("/tamanho/:id", app.api.tamanho.getTamanhoById)

  //Produto

  //save
  app.post("/produto", app.api.produto.save)
  //update
  app.put("/produto/:id", app.api.produto.update)
  //busca
  app.get("/produto", app.api.produto.getProdutos)
  app.get("/produto/:id", app.api.produto.getProdutosById)
  //Buscar Imagem pelo ID do produto
  app.get("/produto/img/:id", app.api.produto.getImagensById)
  // remover
  app.delete("/produto/:id", app.api.produto.remove)
}
