import { useState } from "react";
import axios from "axios";  // Para realizar as requisições HTTP
import "./margin.css";

type Props = {
tema: string;
};

function FormularioCadastroCliente(props: Props) {
const tema = props.tema;

// Estado para armazenar os valores dos campos do formulário
const [nome, setNome] = useState("");
const [nomeSocial, setNomeSocial] = useState("");
const [cpf, setCpf] = useState("");
const [dataEmissaoCpf, setDataEmissaoCpf] = useState("");
const [rg, setRg] = useState("");
const [dataEmissaoRg, setDataEmissaoRg] = useState("");
const [telefone, setTelefone] = useState("");
const [aceitouMarketing, setAceitouMarketing] = useState(false);

// Função para lidar com o envio do formulário
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();

// Dados a serem enviados para o backend
const dadosCliente = {
nome,
nomeSocial,
cpf,
dataEmissaoCpf,
rg,
dataEmissaoRg,
telefone,
aceitouMarketing
};

try {
// Enviando os dados para o backend
const response = await axios.post("http://localhost:5000/api/lgpd/cadastrar_cliente", dadosCliente);
console.log("Cliente cadastrado com sucesso:", response.data);
alert("Cadastro realizado com sucesso!");
} catch (error) {
console.error("Erro ao cadastrar cliente:", error);
alert("Erro ao cadastrar cliente.");
}
};

return (
<div className="container-fluid">
<form onSubmit={handleSubmit}>
    <div className="margin-lista">
        <h2 style={{ textAlign: "center" }}>Cadastro de clientes</h2>
    </div>
    <div className="margin-lista">
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Nome"
                aria-label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
        </div>
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Nome social"
                aria-label="Nome social"
                value={nomeSocial}
                onChange={(e) => setNomeSocial(e.target.value)}
            />
        </div>
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="CPF"
                aria-label="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
            />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ background: tema, color: "white" }}>
                dd/mm/yyyy
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Data de emissão do CPF"
                value={dataEmissaoCpf}
                onChange={(e) => setDataEmissaoCpf(e.target.value)}
            />
        </div>
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="RG"
                aria-label="RG"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                required
            />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ background: tema, color: "white" }}>
                dd/mm/yyyy
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Data de emissão do RG"
                value={dataEmissaoRg}
                onChange={(e) => setDataEmissaoRg(e.target.value)}
            />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ background: tema, color: "white" }}>
                DDD
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                aria-label="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
            />
        </div>
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                aria-label="Telefone"
            />
        </div>

        {/* Checkbox de Consentimento para Marketing */}
        <div className="input-group mb-3">
            <input
                type="checkbox"
                checked={aceitouMarketing}
                onChange={() => setAceitouMarketing(!aceitouMarketing)}
                id="marketing"
            />
            <label htmlFor="marketing" style={{ marginLeft: "10px" }}>
                Aceito receber e-mails promocionais
            </label>
        </div>

        {/* Botão para enviar o formulário */}
        <div className="input-group mb-3">
            <button
                className="btn btn-outline-secondary"
                type="submit"
                style={{ background: tema, color: "white" }}
            >
                Cadastrar
            </button>
        </div>
    </div>
</form>
</div>
);
}

export default FormularioCadastroCliente;
