import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CreatePoint from './pages/CreatePoint';
import Home from './pages/Home';
import SearchPoint from './pages/SearchPoint';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/point/new" />
      <Route component={SearchPoint} path="/point/search" />
    </BrowserRouter>
  );
};

export default Routes;
