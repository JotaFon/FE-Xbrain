import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adicionarProduto, finalizarCompra } from '../redux/actions';
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
import { orange } from '@mui/material/colors';

import produto01 from '../assets/imagens/produto-01.jpeg';
import produto02 from '../assets/imagens/produto-02.jpeg';
import produto03 from '../assets/imagens/produto-03.jpeg';
import produto04 from '../assets/imagens/produto-04.jpeg';
import produto05 from '../assets/imagens/produto-05.jpeg';
import produto06 from '../assets/imagens/produto-06.jpeg';
import produto07 from '../assets/imagens/produto-07.jpeg';
import produto08 from '../assets/imagens/produto-08.jpeg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
  alignItems: 'center',
  '& img': {
    height: '200px',
    maxWidth: '80%',
    marginBottom: 20,
  },
}));

const CardOverlay = styled('div')({
  position: 'absolute',
  top: '30%',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  height: '70%',
  '&:hover': {
    opacity: 1,
  },
});

const CustomTextField = styled(TextField)({
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
    '-webkit-appearance': 'none',
    margin: 0,
    color: 'white',
    textAlign: 'center',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& .MuiInputBase-input': {
    padding: '0 5px',
  },
});

const RoundButton = styled(Button)({
  borderRadius: '50%',
  minWidth: '40px',
  width: '40px',
  height: '40px',
  padding: 0,
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
        total + parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.')) * produto.quantidade,
      0
    );
  };

  const produtosArray = [
    { id: 1, nome: 'AirPods Apple Fones de ouvido', preco: 'R$1.499,00', imagem: produto01, parcelas: 'Em até 12x de R$124,92', desc: 'R$ 1.349 à vista (10% de desconto)' },
    { id: 2, nome: 'Capa de solicone para iphone 8/7 cor Areia - Rosa', preco: 'R$299,00', imagem: produto02, parcelas: 'Em até 12x de R$24,92', desc: 'R$ 269.10 à vista (10% de desconto)' },
    { id: 3, nome: 'Apple pencil', preco: 'R$729,00', imagem: produto03, parcelas: 'Em até 12x de R$60,75', desc: 'R$ 656,10 à vista (10% de desconto)' },
    { id: 4, nome: 'Magic Mouse 2 - Prateado', preco: 'R$549,00', imagem: produto04, parcelas: 'Em até 12x de R$45,75', desc: 'R$ 494,10 à vista (10% de desconto)' },
    { id: 5, nome: 'Caixa prateada de aluminio com pulseira esportiva branca', preco: 'R$2.899,00', imagem: produto05, parcelas: 'Em até 12x de R$241,58', desc: 'R$ 2.609,10 à vista (10% de desconto)' },
    { id: 6, nome: 'Cabo de lightning para USB(1m)', preco: 'R$149,00', imagem: produto06, parcelas: 'Em até 12x de R$12,42', desc: 'R$ 134,10 à vista (10% de desconto)' },
    { id: 7, nome: 'Smart Keyboard para iPad Pro 12,9 polegadas - inglês(EUA)', preco: 'R$1.099,00', imagem: produto07, parcelas: 'Em até 12x de R$ 91,58', desc: 'R$ 989,10 à vista (10% de desconto)' },
    { id: 8, nome: 'Carregador USB de 5W Apple', preco: 'R$149,00', imagem: produto08, parcelas: 'Em até 12x de R$12,42', desc: 'R$ 989,10 à vista (10% de desconto)' },
  ];

  return (
    <div>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Produtos
        </Typography>
      </Grid>
      <div style={{display: 'grid',
         gridTemplateColumns: '1fr 1fr 1fr 1fr',
         gap: 20,
        }}
        >
      {produtosArray.map((produto) => (
        <StyledPaper
        onMouseEnter={() => {
          console.log('passou!')
          setHoveredProduto(produto.id)}}
        onMouseLeave={() => setHoveredProduto(null)}>
            <img src={produto.imagem} alt={produto.nome}/>
            <Typography variant="subtitle1">{produto.nome}</Typography>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>{produto.preco}</Typography>
            <Typography variant="body2">{produto.parcelas}</Typography>
            <Typography variant="body3">{produto.desc}</Typography>
            {hoveredProduto === produto.id && (
              <CardOverlay>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RoundButton
                    onClick={() =>
                      setQuantidade((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    -
                  </RoundButton>
                  <CustomTextField
                    type="number"
                    value={quantidade}
                    onChange={(e) =>
                      setQuantidade(parseInt(e.target.value) || 1)
                    }
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    size="small"
                    style={{ width: '50px', margin: '0 5px' }}
                  />
                  <RoundButton
                    onClick={() => setQuantidade((prev) => prev + 1)}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    +
                  </RoundButton>
                </div>
                <Button
                  onClick={() => adicionarProdutoHandler(produto)}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '8px' }}
                >
                  Adicionar ao Carrinho
                </Button>
              </CardOverlay>
            )}
          </StyledPaper>
      ))}
    </div>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Dados do Cliente
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Paper elevation={3}>
          <TextField
            label="Nome do cliente aqui"
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
            label="Digite seu email aqui"
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
              <MenuItem value="outro">Outros</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px' }}>
          <Typography variant="body1" align="right" style={{ marginRight: '16px' }}>
            Total: R${calcularTotal().toFixed(2)}
          </Typography>
          <Button
            onClick={finalizarCompraHandler}
            variant="contained"
            color="primary"
            style={{ backgroundColor: orange[500] }}
          >
            Finalizar Compra
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default ProdutosGrid;
