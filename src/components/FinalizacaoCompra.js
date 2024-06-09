import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { finalizarCompra, novaCompra } from '../redux/actions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && !!error}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const FinalizacaoCompra = ({ handleSubmit }) => {
  const produtos = useSelector((state) => state.produtos);
  const cliente = useSelector((state) => state.cliente);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = produtos.reduce((acc, produto) => acc + produto.quantidade, 0);

  const onSubmit = (values) => {
    dispatch(finalizarCompra(values));
    navigate('/finalizacao');
  };

  const iniciarNovaCompra = () => {
    dispatch(novaCompra());
    navigate('/');
  };

  return (
    <div>
      <h2>Finalização de Compra</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="nomeCliente"
            component={renderTextField}
            label="Nome do Cliente"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Finalizar Compra
        </Button>
      </form>
      <h3>Resumo</h3>
      <p>Nome do Cliente: {cliente.nomeCliente}</p>
      <p>Total de Produtos: {total}</p>
      <Button variant="contained" color="secondary" onClick={iniciarNovaCompra}>
        Iniciar Nova Compra
      </Button>
    </div>
  );
};

export default reduxForm({
  form: 'finalizacaoForm',
  validate: (values) => {
    const errors = {};
    if (!values.nomeCliente) {
      errors.nomeCliente = 'Obrigatório';
    }
    return errors;
  },
})(FinalizacaoCompra);