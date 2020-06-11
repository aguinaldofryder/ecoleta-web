import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Ecoleta" />

      <Link to="/">
        <FiArrowLeft />
        Voltar para o início
      </Link>
    </header>
  );
};

export default Header;
