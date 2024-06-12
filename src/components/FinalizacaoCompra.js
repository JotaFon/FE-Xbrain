import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { novaCompra } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import produto01 from '../assets/imagens/purchase.png';

const FinalizacaoCompra = () => {
  // Hooks para acessar o estado global Redux
  const produtos = useSelector((state) => state.app.produtos || []);
  const cliente = useSelector((state) => state.app.cliente || { nomeCliente: '', email: '', sexo: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cálculo do total da compra
  const total = produtos.reduce((acc, produto) => {
    const preco = parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.'));
    return acc + preco * produto.quantidade;
  }, 0);

  // Função para iniciar uma nova compra
  const iniciarNovaCompra = () => {
    dispatch(novaCompra());
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          width: 400,
          height: 450,
          borderRadius: '5%',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center', marginBottom: 2 }}>
          <Typography
            component="div"
            sx={{ fontSize: '40px', fontWeight: 'bold', marginBottom: 1 }}
          >
            {cliente.nome}
          </Typography>
          <Typography
            component="div"
            sx={{ fontSize: '1.25rem', marginBottom: 1 }}
          >
            Sua compra no valor <strong style={{ color: '#007bff' }}>R$ {total.toFixed(2)}</strong>
          </Typography>
          <Typography
            component="div"
            sx={{ fontSize: '1.25rem' }}
          >
            foi finalizada com sucesso
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <img
            src={produto01}
            alt="Imagem de Confirmação"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'orange', color: 'white',marginTop: '20px', height: '50px',fontWeight: 'bold' , ':hover': { backgroundColor: 'darkorange' } }}
          onClick={iniciarNovaCompra}
        >
          Iniciar Nova Compra
        </Button>
      </Box>
    </Box>
  );
};

export default FinalizacaoCompra;
