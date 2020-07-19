const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./database/database");

const comissoesController = require("./comissoes/comissoesController")
const lojaCotroller = require("./loja/lojaController");
const clienteController = require("./cliente/clienteController");


const Comissoes = require("./comissoes/Comissoes")
const Loja = require("./loja/Loja");
const Cliente = require("./cliente/Cliente");
//view engine
app.set("view engine","ejs");

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//conexao com o banco
connection
    .authenticate()
    .then(()=>{
        console.log("conexão feita com sucesso");
    }).catch(error=>{
        console.log(error);
    });

app.use("/",comissoesController);
app.use("/",lojaCotroller);
app.use("/",clienteController);


app.get("/",(req,res)=>{
    res.render("index");
});


app.listen(8180,()=>{
    console.log("O servidor esta rodando");
});