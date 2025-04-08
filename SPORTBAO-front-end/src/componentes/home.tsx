import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
import FormularioCadastroCliente from "./formularioCadastroCliente"; // Verifique se o caminho está correto
import './margin.css';
import ListaProdutos from "./listaProdutos";

export class Carrosel extends Component {
render() {
return (
<Carousel className='tamanho-imagem'>
<Carousel.Item>
<img
className="img1"
src="https://www.gsuplementos.com.br/upload/banner/69ec921a247fdf8ca524e0dc8787ecd6.webp"
alt="Primeiro slide"
/>
</Carousel.Item>
<Carousel.Item>
<img
className="img2"
src="https://www.gsuplementos.com.br/upload/banner/629d18b9f32e78d53c8a3418f7e197ba.webp"
alt="Segundo slide"
/>
</Carousel.Item>
<Carousel.Item>
<img
className="img3"
src="https://www.gsuplementos.com.br/upload/banner/c2d42531e6380afaeb293582db3697ca.webp"
alt="Terceiro slide"
/>
</Carousel.Item>
</Carousel>
);
}
}

export class Intro extends Component {
render() {
return (
<>
<div className="row row-cols-1 row-cols-md-2 g-4">
<div className="col">
<div className="card">
<div className="card-body">
<h5 className="card-title title-custom">Promoção 1</h5>
<p className="card-text">
Aproveite 15% de desconto em todos os suplementos alimentares!
</p>
</div>
</div>
</div>
<div className="col">
<div className="card">
<div className="card-body">
<h5 className="card-title title-custom">Promoção 2</h5>
<p className="card-text">
Compre um kit de acessórios para treino e ganhe 10% de desconto!
</p>
</div>
</div>
</div>
<div className="col">
<div className="card">
<div className="card-body">
<h5 className="card-title title-custom">Promoção 3</h5>
<p className="card-text">
Plano de adesão anual com 20% de desconto para novos membros.
</p>
</div>
</div>
</div>
<div className="col">
<div className="card">
<div className="card-body">
<h5 className="card-title title-custom">Promoção 4</h5>
<p className="card-text">
Desconto de 10% em todos os acessórios para treino e roupas de ginástica.
</p>
</div>
</div>
</div>
</div>

<div className="row row-cols-1 row-cols-md-2 g-4">
<div className="col">
<div className="card">
<div className="card-body">
<h5 className="card-title title-custom">Cadastro de Novos Membros</h5>
<p className="card-text">
Cadastre-se agora e ganhe descontos exclusivos em nossa loja de suplementos!
</p>
<FormularioCadastroCliente tema="cor_do_tema" /> {/* Use o componente FormularioCadastroCliente */}
</div>
</div>
</div>
<div className="col">
<div className="card">
<div className="card-body">
<h5 className="card-title title-custom">Nossos Produtos</h5>
<p className="card-text">
Descubra os melhores suplementos e equipamentos para sua jornada fitness!
</p>
<ListaProdutos tema="cor_do_tema" /> {/* Use o componente ListaProdutos */}
</div>
</div>
</div>
</div>
</>
);
}
}
