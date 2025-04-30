import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormularioCadastroCliente from "../componentes/formularioCadastroCliente";
import FormularioCadastroProduto from "../componentes/formularioCadastroProduto";
import ListaProdutos from "../componentes/listaProdutos";
import AdicionarRG from "../componentes/adicionarRG";
import AdicionarTelefone from "../componentes/adicionarTelefone";
import { Carrosel, Intro } from "../componentes/home";
import Inicio from "../componentes/paginaInicial";
import Dashboard from "../componentes/dashboard";
import PoliticaDePrivacidade from "../componentes/politicaDePrivacidade"; 


export const Rotas = () => {
return (
<BrowserRouter>
<Routes>
<Route path='/home' element={<Inicio />} />
<Route path='/lista-produtos' element={<ListaProdutos tema="#1f2023"/>} />
<Route path='/cadastro-cliente' element={<FormularioCadastroCliente tema="#1f2023"/>} />
<Route path='/cadastro-produto' element={<FormularioCadastroProduto tema="#1f2023"/>} />

<Route path='/adicionar-rg' element={<AdicionarRG tema="#1f2023"/>} />
<Route path='/adicionar-telefone' element={<AdicionarTelefone tema="#1f2023"/>} />

<Route path='/dashboard' element={<Dashboard />} />
<Route path='/' element={<Navigate to={'/home'} />} />

<Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />

</Routes>
</BrowserRouter>
)
}