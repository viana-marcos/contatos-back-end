
var express = require('express');
var ContatoModel = require('../model/Contato');

class ContatosRouter {
    constructor() {
        //super();
        this.router = express.Router();
        this.routes();
    }

    async BuscarContatoPorId(req, res) {
        try {

            const contato = await ContatoModel.findOne({ where: { id: req.params.id } });
            if (contato === null)
                res.status(404).send("Contato não localizado");
            else
                res.status(200).json({data: contato });


        } catch (err) {
            console.log("Erro");
            res.status(422).json({ MSG: "Erro ao tentar buscar contato" });
        }
    }

    async AtualizarContato(req, res) {

        try {

            const contato = await ContatoModel.findOne({ where: { id: req.params.id } });
             
            if (contato === null)
                res.status(404).send("Contato não localizado");
            else {
                 var id = await ContatoModel.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                const contatoAtualizado = req.body;
                contatoAtualizado.id = id;               
                res.status(200).json({ data: contatoAtualizado });
            }


        } catch (err) {
            res.status(422).json({ MSG: "Erro ao criar Contato" });
        }
    }

    async removerContato(req, res) {

        try {

            const contato = await ContatoModel.findOne({ where: { id: req.params.id } });
             
            if (contato === null)
                res.status(404).send("Contato não localizado");
            else {
                 await ContatoModel.destroy(req.body, {
                    where: {
                        id: req.params.id
                    }
                });                               
                res.status(200).json({ MSG: "Contato removido com sucesso"});
            }


        } catch (err) {
            res.status(422).json({ MSG: "Erro ao remover Contato" });
        }
    }



    async GravarContato(req, res) {

        try {         

            var newContato = await ContatoModel.create(req.body);

            res.status(200).json({ data: newContato });


        } catch (err) {
            console.log(err);
            res.status(422).json({ MSG: "Erro ao cadastrar Contato" });
        }
    }

    async BuscarContatos(req, res) {
        try {
            var page = req.query.page === undefined ? 1 : parseInt(req.query.page);
            var size = req.query.size === undefined ? 10 : parseInt(req.query.size);

            const contatos = await ContatoModel.findAll({ offset: page, limit: size });
            res.status(200).json({ MSG: "Acessando Method BuscarContatos", data: contatos });


        } catch (err) {
            res.status(422).json({ MSG: Message.Usuario.ConsultaErr, info: err.errors[0].message });
        }
    }


    routes() {
        this.router.get('/:id', this.BuscarContatoPorId);

        this.router.put('/:id', this.AtualizarContato);

        this.router.delete('/:id', this.removerContato);

        this.router.post('/', this.GravarContato);

        this.router.get('/', this.BuscarContatos);
    }
}
module.exports = new ContatosRouter().router;
