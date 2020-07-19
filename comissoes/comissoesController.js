const express = require("express");
const Comissoes = require("../comissoes/Comissoes");
const Cliente = require("../cliente/Cliente");
const Loja = require("../loja/Loja");
const router = express.Router();

router.get("/comissoes", (req, res) => {
    Comissoes.findAll({
        group:['clienteId']
    }).then(async comissoes => {
        console.log(comissoes.clienteId);
            if (comissoes != undefined) {
                
               const TotalLojas = await Comissoes.count({
                    where: { clienteId: comissoes.clienteId },
                    group:['lojaId'],
                })
                
                res.render("comissoes/index", { comissoes: comissoes,TotalLojas: TotalLojas});
            }
    })

});

router.get("/comissoes/novo", (req, res) => {
    Cliente.findAll().then(clientes => {
        Loja.findAll().then(lojas => {
            res.render("comissoes/novo", { clientes: clientes, lojas: lojas });
        });
    });
});

router.post("/comissoes/salvar", (req, res) => {
    var cliente = req.body.clienteId;
    var lojas = req.body.lojaId;
    var valor = req.body.valor;
    var data = '2020-01-15'//req.body.data;

    if (lojas.length > 1) {
        lojas.forEach(loja => {
            Comissoes.create({
                clienteId: cliente,
                lojaId: loja,
                valor_comissao: valor,
                data_processo: data,
                pago: 'N'
            })
        });
    } else {
        Comissoes.create({
            clienteId: cliente,
            lojaId: lojas,
            valor_comissao: valor,
            data_processo: data,
            pago: 'N'
        });
    }
    res.redirect("/comissoes");

});



module.exports = router;