import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
          <Link to="/point/new">
            <FiLogIn />
            Cadastre um ponto de coleta
          </Link>
        </header>
        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>
          <Link to="/point/search">
            <span>
              <FiSearch />
            </span>
            <strong>Pesquisar pontos de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
