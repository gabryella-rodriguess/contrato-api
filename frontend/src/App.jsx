import { useEffect, useState } from "react";
import FormProdutos from "./components/FormProdutos.jsx";
import ListaProdutos from "./components/ListaProdutos.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import {
  buscarProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto
} from "./services/ProdutoService.js";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarProdutos();
      setProdutos(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os produtos. Verifique se o backend está rodando.");
    } finally {
      setCarregando(false);
    }
  }

  async function adicionarProduto(nome, preco) {
    try {
      setErro("");

      const resposta = await criarProduto({ nome, preco });

      setProdutos((listaAtual) => [...listaAtual, resposta.produto]);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível cadastrar o produto.");
    }
  }

  async function salvarEdicao(id, nome, preco) {
    try {
      setErro("");

      await atualizarProduto(id, { nome, preco });

      setProdutos((listaAtual) =>
        listaAtual.map((produto) =>
          produto.id === id ? { ...produto, nome, preco } : produto
        )
      );

      setProdutoEditando(null);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível atualizar o produto.");
    }
  }

  async function removerProduto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      await excluirProduto(id);

      setProdutos((listaAtual) =>
        listaAtual.filter((produto) => produto.id !== id)
      );
    } catch (error) {
      console.error(error);
      setErro("Não foi possível excluir o produto.");
    }
  }

  return (
    <>
      <Header />

      <main className="container">
        <section className="apresentacao">
          <h1>Gerenciador de Produtos</h1>
          <p>React consumindo a API de Produtos (Node + Express + MySQL)</p>
        </section>

        <FormProdutos
          onAdicionar={adicionarProduto}
          onSalvarEdicao={salvarEdicao}
          produtoEditando={produtoEditando}
          onCancelarEdicao={() => setProdutoEditando(null)}
        />

        {erro && <p className="erro">{erro}</p>}

        {carregando ? (
          <p>Carregando...</p>
        ) : (
          <ListaProdutos
            produtos={produtos}
            onExcluir={removerProduto}
            onEditar={setProdutoEditando}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;