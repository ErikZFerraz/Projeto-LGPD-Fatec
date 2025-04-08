import { useState } from "react";
import { Carrosel, Intro } from "./home";

// Função para exibir o aviso de cookies
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
      <p>
        Este site utiliza cookies para melhorar sua experiência.{" "}
        <button
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
          }}
          onClick={onAceitarCookies}
        >
          Aceitar
        </button>
        <a href="/politica-de-privacidade" style={{ marginLeft: "10px" }}>
          Saiba mais
        </a>
      </p>
    </div>
  );
};

function Inicio() {
  const [cookiesAceitos, setCookiesAceitos] = useState(false);

  const aceitarCookies = () => {
    setCookiesAceitos(true);
    // Aqui você pode salvar a escolha do usuário (por exemplo, em localStorage ou via backend)
    alert("Cookies aceitos!");
  };

  return (
    <>
      {/* Exibe o aviso de cookies se ainda não foi aceito */}
      {!cookiesAceitos && <AvisoCookies onAceitarCookies={aceitarCookies} />}

      <Carrosel />
      <Intro />
    </>
  );
}

export default Inicio;
