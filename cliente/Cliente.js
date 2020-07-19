const Sequelize = require("sequelize");
const connection = require("../database/database");

const Cliente = connection.define('cliente',{
    nome_cliente:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Cliente.sync({force: false}).then(()=> {});

module.exports = Cliente;