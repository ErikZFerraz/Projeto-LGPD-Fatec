import { useState, useEffect } from "react";
import axios from "axios";
import "./margin.css"; // Ajuste conforme necessário
import "./perfil.css"; // Adicione este arquivo para estilização do perfil

function Perfil() {
  const [userData, setUserData] = useState<any>(null);
  const [aceitouMarketing, setAceitouMarketing] = useState<boolean>(false);

  // Função para carregar os dados do usuário
  useEffect(() => {
    // Substitua pelo ID do usuário atual ou autenticação adequada
    const userId = 1; // Exemplo de ID de usuário

    axios
      .get(`http://localhost:5000/api/lgpd/exportar_dados/${userId}`)
      .then((response) => {
        // Carregar os dados do usuário
        setUserData(response.data);
        // Carregar o consentimento de marketing
        setAceitouMarketing(response.data.aceitou_marketing);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados do usuário:", error);
      });
  }, []);

  // Função para atualizar o consentimento de marketing
  const atualizarConsentimento = () => {
    const userId = 1; // Exemplo de ID do usuário
    axios
      .post(`http://localhost:5000/api/lgpd/atualizar_consentimento/${userId}`, {
        aceitou_marketing: aceitouMarketing,
      })
      .then((response) => {
        alert("Consentimento atualizado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao atualizar consentimento:", error);
      });
  };

  // Função para exportar dados
  const exportarDados = () => {
    const userId = 1; // Exemplo de ID do usuário
    axios
      .get(`http://localhost:5000/api/lgpd/exportar_dados/${userId}`)
      .then((response) => {
        // Supondo que a resposta seja o arquivo ou dados para download
        const dadosBlob = new Blob([JSON.stringify(response.data)], {
          type: "application/json",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(dadosBlob);
        link.download = `dados_usuario_${userId}.json`;
        link.click();
      })
      .catch((error) => {
        console.error("Erro ao exportar dados:", error);
      });
  };

  return (
    <div className="container">
      <h2>Meu Perfil</h2>

      {/* Exibir dados do usuário */}
      {userData ? (
        <div className="perfil-info">
          <p><strong>Nome:</strong> {userData.nome}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Data de Cadastro:</strong> {userData.data_cadastro}</p>
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}

      <div className="perfil-consentimento">
        <h3>Preferências de Marketing</h3>
        <label>
          <input
            type="checkbox"
            checked={aceitouMarketing}
            onChange={() => setAceitouMarketing(!aceitouMarketing)}
          />
          Aceito receber e-mails de marketing
        </label>

        <button
          className="btn"
          onClick={atualizarConsentimento}
          style={{ background: "#4CAF50", color: "white" }}
        >
          Atualizar Consentimento
        </button>
      </div>

      <div className="perfil-exportar">
        <h3>Exportar Dados</h3>
        <button
          className="btn"
          onClick={exportarDados}
          style={{ background: "#2196F3", color: "white" }}
        >
          Exportar Meus Dados
        </button>
      </div>
    </div>
  );
}

export default Perfil;
