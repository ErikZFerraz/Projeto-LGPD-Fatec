import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import "./Perfil.css"; // importe aqui seu novo CSS

function Perfil() {
  const { user, logout, refreshUser } = useAuth();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senhaAtual: "",
    novaSenha: "",
    aceite: true,
    receberEmails: false,
    compartilharGenero: false,
  });

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        nome: user.nome || "",
        email: user.email || "",
        senhaAtual: "",
        novaSenha: "",
        aceite: true,
        receberEmails: user.receberEmails ?? false,
        compartilharGenero: user.compartilharGenero ?? false,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/usuario", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        senhaAtual: form.senhaAtual,
        novaSenha: form.novaSenha,
        aceite: true,
        receberEmails: form.receberEmails,
        compartilharGenero: form.compartilharGenero,
      }),
    });

    if (res.ok) {
      setMensagem("Dados atualizados com sucesso.");
      setForm((prev) => ({ ...prev, senhaAtual: "", novaSenha: "" }));
      refreshUser?.();
    } else {
      const erro = await res.text();
      setMensagem("Erro: " + erro);
    }
  };

  const handleExcluirConta = async () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.");

    if (!confirmacao) return;

    const res = await fetch("http://localhost:5000/usuario", {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      const resultado = await res.json();
      alert("Sua conta foi excluída com sucesso.\nCódigo de exclusão: " + resultado.id_exclusao);
      window.location.href = "/";
    } else {
      alert("Erro ao excluir conta");
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  if (!user) return <p>Carregando dados do usuário...</p>;

  return (
    <div className="perfil-container">
      <h2>Meu Perfil</h2>
      <form className="perfil-form" onSubmit={handleSalvar}>
        <label htmlFor="nome">Nome:</label>
        <input type="text" name="nome" id="nome" value={form.nome} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={form.email} onChange={handleChange} required />

        <label htmlFor="senhaAtual">Senha atual:</label>
        <input type="password" name="senhaAtual" id="senhaAtual" value={form.senhaAtual} onChange={handleChange} />

        <label htmlFor="novaSenha">Nova senha:</label>
        <input type="password" name="novaSenha" id="novaSenha" value={form.novaSenha} onChange={handleChange} />

        <label>
          <input type="checkbox" name="receberEmails" checked={form.receberEmails} onChange={handleChange} />
          Desejo receber promoções e novidades por e-mail
        </label>

        <label>
          <input type="checkbox" name="compartilharGenero" checked={form.compartilharGenero} onChange={handleChange} />
          Concordo em compartilhar meu gênero para fins estatísticos
        </label>

        <button type="submit">Salvar alterações</button>
      </form>

      {mensagem && <p className="perfil-message">{mensagem}</p>}

      <button onClick={handleExcluirConta} className="perfil-delete-button">
        Excluir minha conta
      </button>

      <button onClick={handleLogout} className="perfil-logout-button">
        Sair
      </button>
    </div>
  );
}

export default Perfil;
