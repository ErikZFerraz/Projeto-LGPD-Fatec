import React, { useEffect, useState } from "react";
import "./adminTermos.css";

type Termo = {
  id: number;
  titulo: string;
  conteudo: string;
  obrigatorio: boolean;
  versao: string;
};

export default function TermosAdmin() {
  const [termos, setTermos] = useState<Termo[]>([]);
  const [form, setForm] = useState<Omit<Termo, "id">>({
    titulo: "",
    conteudo: "",
    obrigatorio: false,
    versao: "",
  });
  const [editingTerm, setEditingTerm] = useState<Termo | null>(null);

  // Carregar termos ao montar
  useEffect(() => {
    fetch("http://localhost:5000/termos", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: Termo[]) => setTermos(data))
      .catch(() => setTermos([]));
  }, []);

  const handleCreate = async () => {
    const res = await fetch("http://localhost:5000/termos", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const novoTermo = await res.json();
      setTermos([novoTermo, ...termos]);
      setForm({ titulo: "", conteudo: "", obrigatorio: false, versao: "" });
    } else {
      alert("Erro ao criar termo");
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:5000/termos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setTermos(termos.filter((t) => t.id !== id));
    } else {
      alert("Erro ao deletar termo");
    }
  };

  const handleSaveEdit = async () => {
    if (!editingTerm) return;

    const res = await fetch(`http://localhost:5000/termos/${editingTerm.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingTerm),
    });

    if (res.ok) {
      const atualizado = await res.json();
      setTermos(termos.map((t) => (t.id === atualizado.id ? atualizado : t)));
      setEditingTerm(null);
    } else {
      alert("Erro ao atualizar termo");
    }
  };

  return (
    <div className="termos-admin-container">
      <h1 className="titulo-pagina">Gerenciar Termos</h1>

      <div className="termos-form">
        <h2>Novo Termo</h2>
        <input
          type="text"
          placeholder="Título"
          className="termos-input"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Versão"
          className="termos-input"
          value={form.versao}
          onChange={(e) => setForm({ ...form, versao: e.target.value })}
        />
        <textarea
          placeholder="Conteúdo do termo"
          className="termos-textarea"
          rows={4}
          value={form.conteudo}
          onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
        />
        <label className="termos-checkbox-label">
          <input
            type="checkbox"
            checked={form.obrigatorio}
            onChange={(e) => setForm({ ...form, obrigatorio: e.target.checked })}
          />{" "}
          Termo obrigatório
        </label>
        <button onClick={handleCreate} className="btn-criar">
          Criar termo
        </button>
      </div>

      <h2 className="subtitulo">Termos Criados</h2>
      {termos.length === 0 ? (
        <p className="nenhum-termo">Nenhum termo cadastrado ainda.</p>
      ) : (
        termos.map((termo) => (
          <div key={termo.id} className="termos-card">
            {editingTerm && editingTerm.id === termo.id ? (
              <>
                <input
                  type="text"
                  className="termos-input"
                  value={editingTerm.titulo}
                  onChange={(e) =>
                    setEditingTerm({ ...editingTerm, titulo: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="termos-input"
                  value={editingTerm.versao}
                  onChange={(e) =>
                    setEditingTerm({ ...editingTerm, versao: e.target.value })
                  }
                />
                <textarea
                  className="termos-textarea"
                  rows={4}
                  value={editingTerm.conteudo}
                  onChange={(e) =>
                    setEditingTerm({ ...editingTerm, conteudo: e.target.value })
                  }
                />
                <label className="termos-checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingTerm.obrigatorio}
                    onChange={(e) =>
                      setEditingTerm({ ...editingTerm, obrigatorio: e.target.checked })
                    }
                  />{" "}
                  Termo obrigatório
                </label>
                <div className="termos-card-actions">
                  <button className="btn-editar" onClick={handleSaveEdit}>
                    Salvar Alterações
                  </button>
                  <button className="btn-cancelar" onClick={() => setEditingTerm(null)}>
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="termos-card-header">
                  <h3>
                    {termo.titulo} (v{termo.versao})
                  </h3>
                </div>
                <p className="termos-versao">{termo.obrigatorio ? "Obrigatório" : "Opcional"}</p>
                <p className="termos-conteudo">{termo.conteudo}</p>
                <div className="termos-card-actions">
                  <button className="btn-editar" onClick={() => setEditingTerm(termo)}>
                    Editar
                  </button>
                  <button className="btn-excluir" onClick={() => handleDelete(termo.id)}>
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
