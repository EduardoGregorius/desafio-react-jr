const db = require("../db");

module.exports = {
  getProducts: () => {
    return new Promise((accepted, rejected) => {
      db.query("SELECT * FROM produtos", (error, results) => {
        if (error) {
          rejected(error);
          return;
        }
        accepted(results);
      });
    });
  },

  getProduct: (codigo) => {
    return new Promise((accepted, rejected) => {
      db.query(
        "SELECT * FROM produtos WHERE codigo = ?",
        [codigo],
        (error, results) => {
          if (error) {
            rejected(error);
            return;
          }
          if (results.length > 0) {
            accepted(results[0]);
          } else {
            accepted(false);
          }
        }
      );
    });
  },

  insert: (descricao, preco, dataCadastro) => {
    return new Promise((accepted, rejected) => {
      db.query(
        "INSERT INTO produtos (descricao, preco, data_cadastro) VALUES (?, ?, ?)",
        [descricao, preco, dataCadastro],
        (error, results) => {
          if (error) {
            rejected(error);
            return;
          }
          accepted(results.insertCodigo);
        }
      );
    });
  },

  update: (codigo, descricao, preco, dataCadastro) => {
    return new Promise((accepted, rejected) => {
      db.query(
        "UPDATE produtos SET descricao = ?, preco = ?, data_cadastro = ? WHERE codigo = ?",
        [descricao, preco, dataCadastro, codigo],
        (error, results) => {
          if (error) {
            rejected(error);
            return;
          }
          accepted(results);
        }
      );
    });
  },

  delete: (codigo) => {
    return new Promise((accepted, rejected) => {
      db.query(
        "DELETE FROM produtos WHERE codigo = ?",
        [codigo],
        (error, results) => {
          if (error) {
            rejected(error);
            return;
          }
          accepted(results);
        }
      );
    });
  },
};
