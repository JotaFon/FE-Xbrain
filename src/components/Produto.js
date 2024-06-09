import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adicionarProduto } from '../redux/actions';
import { finalizarCompra } from '../redux/actions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import produto01 from '../assets/imagens/produto-01.jpeg';
import produto02 from '../assets/imagens/produto-02.jpeg';
import produto03 from '../assets/imagens/produto-03.jpeg';
import produto04 from '../assets/imagens/produto-04.jpeg';
import produto05 from '../assets/imagens/produto-05.jpeg';
import produto06 from '../assets/imagens/produto-06.jpeg';
import produto07 from '../assets/imagens/produto-07.jpeg';
import produto08 from '../assets/imagens/produto-08.jpeg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
  '& img': {
    maxWidth: '100%',
    maxHeight: '150px',
  },
}));

const CardOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Alterado para um fundo mais escuro
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
});

const ProdutosGrid = () => {
  const dispatch = useDispatch();
  const produtos = useSelector((state) => state.produtos);
  const cliente = useSelector((state) => state.cliente);

  const [quantidade, setQuantidade] = useState(1);
  const [hoveredProduto, setHoveredProduto] = useState(null);

  const adicionarProdutoHandler = (produto) => {
    dispatch(adicionarProduto({ ...produto, quantidade }));
    setQuantidade(1);
  };

  const finalizarCompraHandler = () => {
    dispatch(finalizarCompra(cliente));
  };

  const calcularTotal = () => {
    return produtos.reduce(
      (total, produto) =>
        total + parseFloat(produto.preco.replace('$', '')) * produto.quantidade,
      0
    );
  };

  const produtosArray = [
    { id: 1, nome: 'Produto 01', preco: '$10,00', imagem: produto01 },
    { id: 2, nome: 'Produto 02', preco: '$15,00', imagem: produto02 },
    { id: 3, nome: 'Produto 03', preco: '$20,00', imagem: produto03 },
    { id: 4, nome: 'Produto 04', preco: '$25,00', imagem: produto04 },
    { id: 5, nome: 'Produto 05', preco: '$30,00', imagem: produto05 },
    { id: 6, nome: 'Produto 06', preco: '$35,00', imagem: produto06 },
    { id: 7, nome: 'Produto 07', preco: '$40,00', imagem: produto07 },
    { id: 8, nome: 'Produto 08', preco: '$45,00', imagem: produto08 },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Nossos Produtos
        </Typography>
      </Grid>
      {produtosArray.map((produto) => (
        <Grid
          key={produto.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          onMouseEnter={() => setHoveredProduto(produto.id)}
          onMouseLeave={() => setHoveredProduto(null)}
        >
          <StyledPaper elevation={3}>
            <img src={produto.imagem} alt={produto.nome} />
            <Typography variant="subtitle1">{produto.nome}</Typography>
            <Typography variant="body1">{produto.preco}</Typography>
            {hoveredProduto === produto.id && (
              <div>
                <Button
                  onClick={() =>
                    setQuantidade((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  -
                </Button>
                <TextField
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
                  inputProps={{ min: 1 }}
                  variant="outlined"
                  size="small"
                  style={{ width: '40px', margin: '0 5px' }}
                />
                <Button
                  onClick={() => setQuantidade((prev) => prev + 1)}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  +
                </Button>
              </div>
            )}
            {hoveredProduto === produto.id && (
              <Button
                onClick={() => adicionarProdutoHandler(produto)}
                variant="contained"
                color="primary"
                style={{ marginTop: '8px' }}
              >
                Adicionar ao Carrinho
              </Button>
            )}
          </StyledPaper>
        </Grid>
      ))}
      {/* Adicione as caixas de texto abaixo dos produtos */}
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Informações do Cliente
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Paper elevation={3}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={cliente.nome}
            onChange={(e) =>
              dispatch({ type: 'SET_NOME_CLIENTE', payload: e.target.value })
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Paper elevation={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={cliente.email}
            onChange={(e) =>
              dispatch({ type: 'SET_EMAIL_CLIENTE', payload: e.target.value })
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Paper elevation={3}>
          <FormControl fullWidth>
            <InputLabel id="sexo-label">Sexo</InputLabel>
            <Select
              labelId="sexo-label"
              id="sexo-select"
              value={cliente.sexo}
              label="Sexo"
              onChange={(e) =>
                dispatch({ type: 'SET_SEXO_CLIENTE', payload: e.target.value })
              }
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="outro">Outro</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Grid>
      {/* Botão Finalizar Compra e Valor Total */}
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Typography variant="body1" align="right">
            Total: ${calcularTotal().toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={finalizarCompraHandler}
          >
            Finalizar Compra
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProdutosGrid;