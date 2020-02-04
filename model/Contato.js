
const Sequelize = require('sequelize');
const sequelize = new Sequelize('contato_database', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  const Contato = sequelize.define('contato', {
    // attributes
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false
        },
        nome: {
        type: Sequelize.STRING,
        allowNull: false
        },
        canal: {
            type: Sequelize.STRING,
            allowNull: false
        },
        valor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        obs: {
            type: Sequelize.STRING
            // allowNull defaults to true
        }
    }, {// options
        timestamps: false,
        freezeTableName: true,
  });

  module.exports = Contato;
  