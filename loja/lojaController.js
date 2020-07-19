const express = require("express");
const router = express.Router();
const Loja = require("./Loja");
const slugify = require("slugify");


router.get("/loja",(req,res)=>{
    Loja.findAll().then(lojas=>{
        res.render("loja/index",{lojas:lojas});
    })
    
});

router.get("/loja/novo",(req,res)=>{
    res.render("loja/novo");
});

router.post("/loja/salvar",(req,res)=>{
    var loja = req.body.loja;

    Loja.create({
        nome_loja:loja,
        slug:slugify(loja)
    }).then(()=>{
        res.redirect("/loja")
    })
});

router.get("/loja/editar/:id",(req,res)=>{
    var id = req.params.id;
    Loja.findByPk(id).then(loja =>{
        if(loja != undefined){
            res.render("loja/editar",{loja,loja});
        }else{
            res.redirect("/loja");
        }        
    }).catch(error=>{
        res.redirect("/loja");
    })
});

router.post("/loja/atualizar",(req,res)=>{
    var id = req.body.id;
    var loja = req.body.loja;

    Loja.update({ nome_loja: loja,slug: slugify(loja) }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/loja");
    }).catch(erro=>{
        res.redirect("/");
    });
});
module.exports = router;