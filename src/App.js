import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Produto from './components/Produto';
import FinalizacaoCompra from './components/FinalizacaoCompra';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Produto />} />
        <Route path="/finalizacao" element={<FinalizacaoCompra />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;