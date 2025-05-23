import { Component } from "react";
import "./margin.css"

type props = {
tema: string
}

function AdicionarRG(props: { tema: any; }) {
const tema = props.tema;

return (
<div className="container-fluid">
<form>
<div className="margin-lista">
<h2 style={{ textAlign: "center" }}>Adicionar um RG</h2>
</div>
<div className="margin-lista">
<div className="input-group mb-3">
<input type="text" className="form-control" placeholder="RG" aria-label="RG" aria-describedby="basic-addon1" />
</div>
<div className="input-group mb-3">
<span className="input-group-text" id="basic-addon1" style={{ background: tema, color: 'white' }}>dd/mm/yyyy</span>
<input type="text" className="form-control" placeholder="Data de emissão do RG" aria-label="Data de emissão do RG" aria-describedby="basic-addon1" />
</div>
<div className="input-group mb-3">
<button className="btn btn-outline-secondary" type="button" style={{ background: tema, color: 'white' }}>Cadastrar</button>
</div>
</div>
</form>
</div>
);
}

export default AdicionarRG;