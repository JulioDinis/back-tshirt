const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash) )
        })
    }

    const save = (req, res) => {
        console.log(req.body)
        obterHash(req.body.senha, hash => {
            const senha = hash
            app.db('cliente')
                .insert({
                    nome: req.body.name,
                    sobrenome: req.body.sobrenome,
                    telefone: req.body.telefone,
                    cpf: req.body.cpf,
                    data_nascimento: req.body.dataNascimento,
                    email: req.body.email,
                    senha,
                    sexo: req.body.sexo
                })
                .then(_ => {
                    res.status(204).send()
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
        })
    }
     const getClientes = (req, res) => {
       app
         .db("cliente")
         .distinct()
         .then((clientes) => {
           console.log("getCliente")
           res.json(clientes)
         })
         .catch((err) => {
           res.status(400).json(err)
           console.log(err)
         })
     }
     const getClienteById = (req, res) => {
       app
         .db("cliente")
         .where({ id: req.params.id })
         .then((cliente) => res.json(cliente))
         .catch((err) => res.status(400).json(err))
     }
    const update = (req, res) => {
        app
          .db("cliente")
          .where({ id: req.params.id })
          .then((cliente) => res.json(cliente))
          .catch((err) => res.status(400).json(err))
    }
    return { save, getClientes, getClienteById, update }
}