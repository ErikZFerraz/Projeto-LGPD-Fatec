import React from "react";

const PoliticaDePrivacidade = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1>Política de Cookies</h1>

      <p>
        Esta Política de Cookies explica como o nosso site de venda de
        suplementos utiliza cookies e tecnologias similares para oferecer a
        melhor experiência de navegação, personalizar conteúdo, analisar o
        tráfego e melhorar nossos serviços. Ao continuar utilizando o nosso
        site, você concorda com o uso de cookies conforme descrito nesta
        política.
      </p>

      <h2>1. O que são cookies?</h2>
      <p>
        Cookies são pequenos arquivos de texto armazenados no seu dispositivo
        (computador, smartphone, tablet) quando você visita um site. Eles ajudam
        a reconhecer seu dispositivo em futuras visitas, armazenar preferências
        e coletar informações sobre sua navegação.
      </p>

      <h2>2. Para que usamos cookies?</h2>
      <ul>
        <li><strong>Funcionamento essencial:</strong> garantir que áreas do site funcionem corretamente, como login, carrinho de compras e formulários.</li>
        <li><strong>Personalização:</strong> lembrar suas preferências de tema, idioma e localização.</li>
        <li><strong>Análise de desempenho:</strong> entender como os usuários interagem com nosso site para melhorias contínuas.</li>
        <li><strong>Marketing:</strong> exibir anúncios relevantes com base no comportamento de navegação.</li>
      </ul>

      <h2>3. Tipos de cookies que utilizamos</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tipo de Cookie</th>
            <th>Finalidade</th>
            <th>Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Necessários</td>
            <td>Essenciais para o funcionamento do site</td>
            <td>Login, segurança, sessão</td>
          </tr>
          <tr>
            <td>Funcionais</td>
            <td>Personalizam a experiência do usuário</td>
            <td>Tema, idioma</td>
          </tr>
          <tr>
            <td>Analíticos</td>
            <td>Coletam dados para análise</td>
            <td>Google Analytics, Hotjar</td>
          </tr>
          <tr>
            <td>Marketing</td>
            <td>Publicidade personalizada</td>
            <td>Meta Pixel, Google Ads</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Cookies de terceiros</h2>
      <p>
        Podemos permitir que parceiros como Google, Meta (Facebook/Instagram) e
        plataformas de pagamento armazenem cookies em seu dispositivo. Esses
        cookies são usados de acordo com as políticas desses terceiros.
      </p>

      <h2>5. Como gerenciar ou desativar cookies</h2>
      <p>Você pode controlar ou desativar cookies nas configurações do seu navegador:</p>
      <ul>
        <li>Google Chrome: <a href="chrome://settings/cookies">chrome://settings/cookies</a></li>
        <li>Mozilla Firefox: <a href="about:preferences#privacy">about:preferences#privacy</a></li>
        <li>Safari: Preferências &gt; Privacidade</li>
        <li>Edge: Configurações &gt; Cookies e permissões do site</li>
      </ul>
      <p>
        A desativação de alguns cookies pode afetar o funcionamento correto do
        site.
      </p>

      <h2>6. Alterações nesta política</h2>
      <p>
        Podemos atualizar esta Política de Cookies periodicamente para refletir
        mudanças na legislação ou melhorias nos nossos serviços. Recomendamos
        que você revise esta página regularmente.
      </p>

      <h2>7. Contato</h2>
      <p>
        Se você tiver dúvidas, entre em contato:
        <br />
        <strong>E-mail:</strong> suporte@suplementosaudavel.com.br<br />
        <strong>Telefone:</strong> (11) 99999-9999<br />
        <strong>Endereço:</strong> Rua da Saúde, 123, São Paulo – SP, Brasil
      </p>
    </div>
  );
};

export default PoliticaDePrivacidade;
