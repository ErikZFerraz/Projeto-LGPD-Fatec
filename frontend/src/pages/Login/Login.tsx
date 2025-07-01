import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // certifique-se de importar o CSS

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = await login(email, senha);
    if (sucesso) {
      navigate("/profile");
    } else {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        {erro && <p className="login-error">{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
