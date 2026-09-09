function Footer() {

  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">

      <p>
        Desenvolvido com React + JSON Server
      </p>

      <span>
        © {ano} • Desvendando o Código
      </span>

    </footer>
  );
}

export default Footer;