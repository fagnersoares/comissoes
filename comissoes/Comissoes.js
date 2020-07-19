const Sequelize = require("sequelize");
const connection = require("../database/database");
const Loja = require("../loja/Loja");
const Cliente = require("../cliente/Cliente")

const Comissoes = connection.define('comissoes', {
    data_processo:{
        type: Sequelize.DATE,
        allowNull: false
    },
    valor_comissao:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    pago:{
        type: Sequelize.CHAR,
        allowNull: false
    }
});


Loja.hasMany(Comissoes, {foreignKey: 'lojaId'});
Cliente.hasMany(Comissoes, {foreignKey: 'clienteId'});

//Comissoes.sync({force: false}).then(()=> {});
module.exports = Comissoes;

