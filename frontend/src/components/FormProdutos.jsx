import { useState, useEffect } from "react";

function FormProdutos({ onAdicionar, onSalvarEdicao, produtoEditando, onCancelarEdicao   }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");


  useEffect(() => {
    if (produtoEditando) {
      setNome(produtoEditando.nome);
      setPreco(String(produtoEditando.preco));
    } else {
      setNome("");
      setPreco("");
    }
  }, [produtoEditando]);


  function enviar(event) {
    event.preventDefault();

    const nomeLimpo = nome.trim();
    const precoNumero = parseFloat(preco);


    if (!nomeLimpo || isNaN(precoNumero)) {
      return;
    }


    if (produtoEditando) {
      onSalvarEdicao(produtoEditando.id, nomeLimpo, precoNumero);
      
    } else {
      onAdicionar(nomeLimpo, precoNumero);
      
    }
    
    setNome("");
    setPreco("");
  }

  return (
    <form className="formulario" onSubmit={enviar}>



      <input 
      type="text"
      placeholder="Nome"
      value={nome}
      onChange={(event) => setNome(event.target.value)}      
      
      />
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Preço"
        value={preco}
        onChange={(event) => setPreco(event.target.value)}
      />

      <button type="submit">{produtoEditando ? "Salvar" : "Adicionar"}</button>

      {produtoEditando && (
        <button type="button" onClick={onCancelarEdicao}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default FormProdutos;

