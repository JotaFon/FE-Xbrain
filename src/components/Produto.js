import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adicionarProduto, finalizarCompra } from '../redux/actions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

import produto01 from '../assets/imagens/produto-01.jpeg';
import produto02 from '../assets/imagens/produto-02.jpeg';
import produto03 from '../assets/imagens/produto-03.jpeg';
import produto04 from '../assets/imagens/produto-04.jpeg';
import produto05 from '../assets/imagens/produto-05.jpeg';
import produto06 from '../assets/imagens/produto-06.jpeg';
import produto07 from '../assets/imagens/produto-07.jpeg';
import produto08 from '../assets/imagens/produto-08.jpeg';

// Estilos customizados para o componente Paper (card do produto)
const StyledPaper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
  alignItems: 'center',
  transition: 'all 0.5s ease-in-out',
  '& img': {
    height: '200px',
    maxWidth: '80%',
    marginBottom: 20,
  },
  '&:hover': {
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    transform: 'scale(1.05)',
  },
}));

const CardOverlay = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(225, 225, 225, 1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.3s ease',
  padding: '10px',
  '&:hover': {
    opacity: 1,
  },
});

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
  },
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
    '-webkit-appearance': 'none',
    color: 'black',
    textAlign: 'center',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& .MuiInputBase-input': {
    padding: '1px',
  },
});

const RoundButton = styled(Button)({
  borderRadius: '50%',
  minWidth: '40px',
  width: '40px',
  height: '40px',
  padding: 0,
});

// Componente funcional para renderizar a página de produtos
const ProdutosGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const produtos = useSelector((state) => state.app.produtos);
  const cliente = useSelector((state) => state.app.cliente);

  const [quantidade, setQuantidade] = useState(1);
  const [hoveredProduto, setHoveredProduto] = useState(null);
  const [validacaoNome, setValidacaoNome] = useState(true);
  const [validacaoEmail, setValidacaoEmail] = useState(true);

  // Função para adicionar produto ao carrinho
  const adicionarProdutoHandler = (produto) => {
    dispatch(adicionarProduto({ ...produto, quantidade }));
    setQuantidade(1);
  };

  // Função para finalizar a compra
  const finalizarCompraHandler = () => {
    const clienteFinal = {
      nome: cliente.nome,
      email: cliente.email,
      sexo: cliente.sexo,
    };
    if (produtos.length === 0) {
      alert('Por favor, escolha pelo menos um produto antes de finalizar a compra.');
      return;
    }
    if (!cliente.nome || !cliente.email || !cliente.sexo || !validacaoNome || !validacaoEmail) {
      alert('Por favor, preencha todos os campos obrigatórios corretamente antes de finalizar a compra.');
      return;
    }

    navigate('/finalizacao');
    console.log('Dados do Cliente ao Finalizar a Compra:', clienteFinal);// Navega para a página de finalização de compra
    dispatch(finalizarCompra(clienteFinal));// Despacha ação para finalizar a compra
  };
  // Função para calcular o total da compra
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
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '1200px' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Produtos
          </Typography>
          <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid container spacing={2}>
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
              <StyledPaper>
                <img src={produto.imagem} alt={produto.nome} />
                <div style={{ position: 'relative', height: '100px' }}>
                  {hoveredProduto !== produto.id && (
                    <>
                      <Typography variant="subtitle1">{produto.nome}</Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>{produto.preco}</Typography>
                      <Typography variant="body2">{produto.parcelas}</Typography>
                      <Typography variant="body3">{produto.desc}</Typography>
                    </>
                  )}
                  {hoveredProduto === produto.id && (
                    <CardOverlay>
                      <Typography variant="subtitle1" style={{ color: 'white' }}>{produto.nome}</Typography>
                      <Typography variant="body1" style={{ fontWeight: 'bold', color: 'white' }}>{produto.preco}</Typography>
                      <Typography variant="body2" style={{ color: 'white' }}>{produto.parcelas}</Typography>
                      <Typography variant="body3" style={{ color: 'white' }}>{produto.desc}</Typography>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <RoundButton
                          onClick={() =>
                            setQuantidade((prev) => (prev > 1 ? prev - 1 : prev))
                          }
                          variant="outlined"
                          color="secondary"
                          size="small"
                          style={{ color: 'black', background: 'grey', borderColor: 'grey' }}
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
                          style={{ width: '120px', height: '30px', backgroundColor: 'white', marginLeft: 10, marginRight: 10, borderRadius: '10%' }}
                        />
                        <RoundButton
                          onClick={() => setQuantidade((prev) => prev + 1)}
                          variant="outlined"
                          color="primary"
                          size="small"
                          style={{ color: 'black', background: 'grey', borderColor: 'grey' }}
                        >
                          +
                        </RoundButton>
                      </div>
                      <Button
                        onClick={() => adicionarProdutoHandler(produto)}
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '8px', width: '200px', backgroundColor: blue[500] }}
                      >
                        ADICIONAR
                      </Button>
                    </CardOverlay>
                  )}
                </div>
              </StyledPaper>
              <div style={{ marginTop: '30px' }}></div>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Dados do Cliente
          </Typography>
          <hr style={{ margin: '10px 0' }} />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              label="Nome do cliente aqui"
              variant="outlined"
              fullWidth
              value={cliente.nome}
              onChange={(e) => {
                dispatch({ type: 'SET_NOME_CLIENTE', payload: e.target.value });
                setValidacaoNome(!/\d/.test(e.target.value));
              }}
              required={true}
              error={!validacaoNome}
              helperText={!validacaoNome ? 'Não inclua números no nome' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              label="Digite seu email aqui"
              variant="outlined"
              fullWidth
              value={cliente.email}
              onChange={(e) => {
                dispatch({ type: 'SET_EMAIL_CLIENTE', payload: e.target.value });
                setValidacaoEmail(/\S+@\S+\.\S+/.test(e.target.value));
              }}
              required={true}
              error={!validacaoEmail}
              helperText={!validacaoEmail ? 'Digite um email válido' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
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
                required={true}
              >
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="feminino">Feminino</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="body1" align="right" style={{fontWeight: 'bold' }} >
            Total: R${calcularTotal().toFixed(2) }
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button
              onClick={finalizarCompraHandler}
              variant="contained"
              color="primary"
              style={{ backgroundColor: orange[500], fontWeight: 'bold' }}
            >
              Finalizar Compra
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProdutosGrid;