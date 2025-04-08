/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "./margin.css";

type props = {
  tema: string;
};

function ListaProdutos(props: { tema: any }) {
  let tema = props.tema;

  return (
    <div className="container-fluid">
      <div className="list-group">
        <div className="margin-lista">
          <h2 style={{ textAlign: 'center' }}>Nossos Produtos para Academia</h2>
          <a href="#" className="list-group-item list-group-item-action">
            Halteres
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Shakers
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Faixas Elásticas
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Suplementos
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Roupas de Treino
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Tapetes de Yoga
          </a>
        </div>
      </div>
    </div>
  );
}

export default ListaProdutos;
