import React from "react";
import { Container } from "react-bootstrap";
import products from "../../data/products";
import "./Home.css";

function Home() {
  return (
      <div className="home-container">
            <h1>
              <span className="text-danger fw-bold">
                Treine, Supere,<br />Conquiste
              </span>
            </h1>
            <p>
        Bem-vindo à FitZone – Sua Zona de Performance.
        Na FitZone, você encontra tudo o que precisa para alcançar o seu melhor: desde suplementos como creatina até roupas fitness de alta performance.
        Potencialize seus treinos e eleve seu estilo com nossos produtos selecionados para quem vive o mundo fitness.            </p>
               
      <h2 className="home-title">Produtos em Destaque</h2>

        <div className="product-grid">
          {products.slice(0, 8).map((product) => (
            <a key={product.id} href={product.href} className="product-card">
              <div className="product-image">
                <img src={product.imageSrc} alt={product.imageAlt} />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </a>
          ))}
        </div>
    </div>
  );
}

export default Home;
