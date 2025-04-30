import { useEffect, useState } from "react";
import { Carrosel, Intro } from "./home";



// Componente de aviso de cookies
const AvisoCookies = ({ onAceitarCookies }: { onAceitarCookies: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "10px",
        textAlign: "center",
        zIndex: 9999,
      }}
    >
      <p style={{ margin: 0 }}>
        Este site utiliza cookies para melhorar sua experiência.
        <button
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "5px 10px",
            marginLeft: "10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={onAceitarCookies}
        >
          Aceitar
        </button>
        <a
          href="/politicaDePrivacidade"
          style={{
            marginLeft: "15px",
            color: "#0056b3",
            textDecoration: "underline",
          }}
        >
          Saiba mais
        </a>
      </p>
    </div>
  );
};

// Componente principal da página inicial
function Inicio() {
  const [cookiesAceitos, setCookiesAceitos] = useState(false);

  // Verifica no carregamento inicial se o usuário já aceitou os cookies
  useEffect(() => {
    const consentimento = localStorage.getItem("cookiesAceitos");
    if (consentimento === "true") {
      setCookiesAceitos(true);
    }
  }, []);

  // Ao aceitar os cookies
  const aceitarCookies = () => {
    setCookiesAceitos(true);
    localStorage.setItem("cookiesAceitos", "true");
  };

  return (
    <>
      {/* Aviso de cookies só aparece se ainda não aceitou */}
      {!cookiesAceitos && <AvisoCookies onAceitarCookies={aceitarCookies} />}

      {/* Conteúdo principal da home */}
      <Carrosel />
      <Intro />
    </>
  );
}

export default Inicio;
