const { where } = require("../config/database")

module.exports = (app) => {
  //salva no bd
  const save = (req, res) => {
    console.log(req.body[0].itens)
    app
      .db("pedido")
      .insert({
        cupom: '',
        valor: req.body[0].itens.valor,
        frete: req.body[0].itens.frete,
        status: req.body[0].itens.status,
        clienteId: req.body[0].itens.clienteId,
      })
      .then((_) => res.status(204).send())
      .catch((err) => {
        res.status(400).json(err)
      })
  }
  const update = async (req, res) => {}
  const getPedidos = (req, res) => {
    app
      .db("pedido")
      .distinct()
      .then((pedidos) => {
        console.log("getPedidos")
        res.json(pedidos)
      })
      .catch((err) => {
        res.status(400).json(err)
        console.log(err)
      })
  }
  const getPedidoById = (req, res) => {
    app
      .db("pedido")
      .where({ id: req.params.id })
      .then((tamanho) => res.json(tamanho))
      .catch((err) => res.status(400).json(err))
  }
  const getPedidosByClienteId = (req, res) => {
    app
      .db("pedido")
      .where({ clienteId: req.params.id })
      .then((pedidos) => res.json(pedidos))
      .catch((err) => res.status(400).json(err))
  }
  const getClientesFrequentes = (req, res) => {
    console.log('busca clientes frequentes')
  }
  return { save, update, getPedidos, getPedidoById, getPedidosByClienteId, getClientesFrequentes }
}
