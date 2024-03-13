import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

function App() {
  const [productID, setProductID] = useState(0);
  const [products, setProducts] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [data_cadastro, setData_Cadastro] = useState("");

  useEffect(() => {
    api.get("/api/produtos").then((response) => {
      setProducts(response.data.result);
    });
  }, []);

  function newProduct() {
    api
      .post("/api/produto", { descricao, preco, data_cadastro })
      .then((response) => {
        console.log(response);

        api.get("/api/produtos").then((response) => {
          setProducts(response.data.result);
        });
      });
  }

  parseInt(productID);
  function deleteProduct(codigo) {
    api
      .delete(`http://localhost:3000/api/produto/${codigo}`)
      .then((response) => {
        console.log(response);

        api.get("/api/produtos").then((response) => {
          setProducts(response.data.result);
        });
      });
  }

  function editProduct(codigo) {
    api
      .put(`http://localhost:3000/api/produto/${codigo}`, {
        descricao,
        preco,
        data_cadastro,
      })
      .then((response) => {
        api.get("/api/produtos").then((response) => {
          setProducts(response.data.result);
        });
      });
  }

  return (
    <>
      <h2>Cadastrar novo item</h2>
      <div className="InputNewItem">
        <input
          placeholder="Descrição"
          onChange={(event) => setDescricao(event.target.value)}
        />
        <input
          placeholder="Preço"
          onChange={(event) => setPreco(event.target.value)}
        />
        <input
          type="date"
          placeholder="Data de cadastro"
          onChange={(event) => setData_Cadastro(event.target.value)}
        />
        <button className="Insert" onClick={newProduct}>Cadastrar</button>
      </div>
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
          <>
            <li key={product.codigo}>
              Código: {product.codigo} - Descrição: {product.descricao} - Preço: {product.preco} - Data de cadastro: {new Date(product.data_cadastro).toLocaleDateString("pt-BR")}
            </li>
            <button
              onClick={() => {
                editProduct(product.codigo);
              }}
            >
              Editar
            </button>
            <button
              onClick={() => {
                deleteProduct(product.codigo);
              }}
            >
              Excluir
            </button>
          </>
        ))}
      </ul>
    </>
  );
}

export default App;
