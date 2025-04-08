import { Component } from 'react';
import Table from 'react-bootstrap/Table';

export function ListagemMaisConsumidos() {

return (
<div className='container-fluid'>
<div className='row'>
<div className="col-12">
<div className="card">
<div className="card-body">
<Table striped bordered hover>
<thead>
<tr>
<th></th>
<th>Produto / Serviço</th>
<th>Quantidade Consumida (em centenas)</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Halteres</td>
<td>5000</td>
</tr>
<tr>
<td>2</td>
<td>Suplemento Whey Protein</td>
<td>4500</td>
</tr>
<tr>
<td>3</td>
<td>Faixas Elásticas</td>
<td>3000</td>
</tr>
<tr>
<td>4</td>
<td>Shaker</td>
<td>2500</td>
</tr>
<tr>
<td>5</td>
<td>Tapetes de Yoga</td>
<td>1000</td>
</tr>
<tr>
<td>6</td>
<td>Aula de Yoga</td>
<td>2000</td>
</tr>
<tr>
<td>7</td>
<td>Treinamento Funcional</td>
<td>1500</td>
</tr>
</tbody>
</Table>
</div>
</div>
</div>
</div>
</div>
);
}
