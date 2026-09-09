const URL_API = "http://localhost:3000/produtos";

export async function buscarProdutos() {
  const resposta = await fetch(URL_API);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return await resposta.json();
}

export async function criarProduto(produto) {
  const resposta = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produto)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao criar produto");
  }

  return await resposta.json();
}

export async function excluirProduto(id) {
  const resposta = await fetch(`${URL_API}/${id}`, {
    method: "DELETE"
  });

  if (!resposta.ok) {
    throw new Error("Erro ao excluir produto");
  }
}

export async function atualizarProduto(id, produto) {
  const resposta = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produto)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao atualizar produto");
  }

  return await resposta.json();
}
