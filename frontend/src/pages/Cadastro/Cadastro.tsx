import { useState } from "react";
import "./Cadastro.css"; // novo CSS importado

function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    aceite: false,
    receberEmails: false,
    compartilharGenero: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.aceite) {
      alert("Você precisa aceitar os termos de uso.");
      return;
    }

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert("Cadastro realizado!");
    } else {
      alert("Erro no cadastro.");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          id="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          name="senha"
          id="senha"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="receberEmails"
            checked={form.receberEmails}
            onChange={handleChange}
          />
          Desejo receber promoções e novidades por e-mail
        </label>

        <label>
          <input
            type="checkbox"
            name="compartilharGenero"
            checked={form.compartilharGenero}
            onChange={handleChange}
          />
          Concordo em compartilhar meu gênero para fins estatísticos
        </label>

        <label>
          <input
            type="checkbox"
            name="aceite"
            checked={form.aceite}
            onChange={handleChange}
            required
          />
          Aceito os <a href="/termos" target="_blank" rel="noopener noreferrer">termos de uso e tratamento de dados (LGPD)</a>
        </label>

        <br /><br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
