import { Component } from "react";
import { ListagemMaisConsumidos } from "./tabelas";
import "./margin.css"
import "./dashboard.css"

function Dashboard() {
return (
<>
<div className="margin-lista">

<div className="margin-lista">
<h1 style={{ textAlign: "center", marginBottom: "25px" }}>Top Produtos e Serviços mais consumidos</h1>
<ListagemMaisConsumidos />
</div>
</div>
</>
);
}

export default Dashboard;