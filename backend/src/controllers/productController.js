const productService = require("../services/productService");

module.exports = {
  getProducts: async (req, res) => {
    let json = { error: "", result: [] };

    let products = await productService.getProducts();

    for (let i in products) {
      json.result.push({
        codigo: products[i].codigo,
        descricao: products[i].descricao,
        preco: products[i].preco,
        data_cadastro: products[i].data_cadastro,
      });
    }
    res.json(json);
  },

  getProduct: async (req, res) => {
    let json = { error: "", result: {} };

    let codigo = req.params.codigo;
    let product = await productService.getProduct(codigo);

    if (product) {
      json.result = product;
    }

    res.json(json);
  },

  insert: async (req, res) => {
    let json = { error: "", result: {} };

    let descricao = req.body.descricao;
    let preco = req.body.preco;
    let dataCadastro = req.body.data_cadastro;

    if (descricao && preco && dataCadastro) {
      let productCodigo = await productService.insert(
        descricao,
        preco,
        dataCadastro
      );
      json.result = {
        codigo: productCodigo,
        descricao,
        preco,
        dataCadastro,
      };
    } else {
      json.error = "Campos não enviados";
    }

    res.json(json);
  },

  update: async (req, res) => {
    let json = { error: "", result: {} };

    let codigo = req.params.codigo;
    let descricao = req.body.descricao;
    let preco = req.body.preco;
    let dataCadastro = req.body.data_cadastro;

    if (codigo && descricao && preco && dataCadastro) {
      await productService.update(codigo, descricao, preco, dataCadastro);
      json.result = {
        codigo,
        descricao,
        preco,
        dataCadastro,
      };
    } else {
      json.error = "Campos não enviados";
    }

    res.json(json);
  },

  delete: async (req, res) => {
    let json = { error: "", result: {} };

    await productService.delete(req.params.codigo);

    res.json(json);
  },
};
