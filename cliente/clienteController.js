const express = require("express");
const router = express.Router();
const Cliente = require("./Cliente");
const slugify = require("slugify");


router.get("/cliente", (req, res) => {
    Cliente.findAll().then(clientes=>{
        res.render("cliente/index",{clientes: clientes});
    });
});

router.get("/cliente/novo", (req, res) => {
    res.render("cliente/novo");
});

router.post("/cliente/salvar",(req,res)=>{
    var cliente = req.body.cliente;

    Cliente.create({
        nome_cliente: cliente,
        slug: slugify(cliente)
    }).then(()=>{
        res.redirect("/cliente")
    });

});

router.get("/cliente/editar/:id",(req,res)=>{
    var id = req.params.id;
    Cliente.findByPk(id).then(cliente =>{
        if(cliente != undefined){
            res.render("cliente/editar",{cliente,cliente});
        }else{
            res.redirect("/cliente");
        }        
    }).catch(error=>{
        res.redirect("/cliente");
    });
});

router.post("/cliente/atualizar",(req,res)=>{
    var id = req.body.id;
    var cliente = req.body.cliente;

    Cliente.update({nome_cliente: cliente,slug: slugify(cliente)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/cliente");
    }).catch(error=>{
        res.redirect("/cliente");
    });
});



module.exports = router;