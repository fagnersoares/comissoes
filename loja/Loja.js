const Sequelize = require("sequelize");
const connection = require("../database/database");

const Loja = connection.define("loja", {
  nome_loja: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Loja.sync({ force: false }).then(() => {});

module.exports = Loja;
