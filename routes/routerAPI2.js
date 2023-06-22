const express = require('express');
const routerAPI2 = express.Router();

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

// processa o corpo da requisição e insere os dados recebidos 
// como atributos de req.body
routerAPI2.use(express.json());
routerAPI2.use(express.urlencoded({ extended: true }))

routerAPI2.get ('/produtos/:id', (req, res) => {
    let id = req.params.id;
    knex('produtos').where('id', id)
    .then((dados) => {
        res.json(dados);
    })
    .catch((err) => {
        res.json ({ message: `Erro ao obter os produtos:${err.message}`});
    })
})

routerAPI2.get ('/produtos', (req, res) => {
    knex('produtos')
    .then((dados) => {
        res.json(dados);
    })
    .catch((err) => {
        res.json ({ message: `Erro ao obter os produtos:${err.message}`});
    })
})

routerAPI2.post('/produtos', (req, res) => {
    console.log (req.body);

    knex('produtos')
    .insert(req.body, ['id'])
    .then((dados) => {
        if(dados.length > 0) {
            const id = dados[0].id
            res.status(201).json( {
                message: 'Produto adicionado com sucesso',
                data: {id}
            });
        }
    })
    .catch((err) => {
        res.json ({ message: 'Erro ao inserir os produto'});
    })
})

routerAPI2.put('/produtos/:id', (req, res) => {
    knex('produtos')
    .where({ id: parseInt(req.params.id) })
    .update( req.body )
    .then((dados) => { res.json('Produto atualizado'); })
    .catch((err) => { res.json('Erro ao atualizar o produto!') });
});

routerAPI2.delete('/produtos/:id', (req, res) => {
    knex('produtos')
    .where({ id: parseInt(req.params.id) })
    .del( req.body )
    .then((dados) => { res.json('Produto Deletado!'); })
    .catch((err) => { res.json('Erro ao deletar o produto!') });
   });

module.exports = routerAPI2;