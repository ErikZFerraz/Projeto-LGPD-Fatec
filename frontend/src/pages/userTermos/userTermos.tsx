import React, { useEffect, useState } from "react";
import "./userTermos.css";

type Termo = {
  id: number;
  titulo: string;
  versao: string;
  conteudo: string;
  obrigatorio: boolean;
  data_criacao: string;
  status: "Aceito" | "Recusado" | null;
  data_resposta: string | null;
};

export default function MeusTermos() {
  const [termos, setTermos] = useState<Termo[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [termoSelecionado, setTermoSelecionado] = useState<Termo | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/termos", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setTermos)
      .catch(() => setTermos([]));
  }, []);

  const abrirModal = (termo: Termo) => {
    setTermoSelecionado(termo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTermoSelecionado(null);
  };

  const responderTermo = async (id: number, status: "Aceito" | "Recusado") => {
    const res = await fetch(`http://localhost:5000/termos/${id}/responder`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setTermos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status, data_resposta: new Date().toISOString() } : t
        )
      );
    } else {
      alert("Erro ao registrar resposta.");
    }
  };

  return (
    <div className="meus-termos-container">
      <h1 className="meus-termos-title">Meus Termos</h1>
      <div className="meus-termos-table-wrapper">
        <table className="meus-termos-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Versão</th>
              <th>Criado em</th>
              <th>Status</th>
              <th>Data de resposta</th>
              <th>Obrigatório</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {termos.map((termo) => (
              <tr key={termo.id}>
                <td>{termo.titulo}</td>
                <td>{termo.versao}</td>
                <td>{new Date(termo.data_criacao).toLocaleDateString()}</td>
                <td
                  className={
                    termo.status === "Aceito"
                      ? "status-aceito"
                      : termo.status === "Recusado"
                      ? "status-recusado"
                      : "status-pendente"
                  }
                >
                  {termo.status || "Pendente"}
                </td>
                <td>
                  {termo.data_resposta
                    ? new Date(termo.data_resposta).toLocaleDateString()
                    : "—"}
                </td>
                <td>{termo.obrigatorio ? "Sim" : "Não"}</td>
                <td>
                  <button className="btn-ver" onClick={() => abrirModal(termo)}>
                    Ver conteúdo
                  </button>
                  {(!termo.status || termo.status === "Recusado") && (
                    <div className="meus-termos-actions">
                      <button onClick={() => responderTermo(termo.id, "Aceito")}>Aceitar</button>
                      {!termo.obrigatorio && (
                        <button onClick={() => responderTermo(termo.id, "Recusado")}>Recusar</button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && termoSelecionado && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{termoSelecionado.titulo}</h2>
            <p className="modal-detalhes">
              Versão {termoSelecionado.versao} • Criado em{" "}
              {new Date(termoSelecionado.data_criacao).toLocaleDateString()}
            </p>
            <div className="modal-conteudo">{termoSelecionado.conteudo}</div>
            <button className="btn-fechar" onClick={fecharModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
