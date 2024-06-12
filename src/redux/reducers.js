import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Estado inicial para produtos e cliente
const initialStateProdutos = [];
const initialStateCliente = {
  nome: '',
  email: '',
  sexo: '',
};

// Reducer principal que combina todos os reducers da aplicação
const rootReducer = (state = { produtos: initialStateProdutos, cliente: initialStateCliente }, action) => {
  switch (action.type) {
    case 'ADICIONAR_PRODUTO':
      return {
        ...state,
        produtos: [...state.produtos, action.payload], // Adiciona um novo produto ao estado de produtos
      };
    case 'FINALIZAR_COMPRA':
      return {
        ...state,
        cliente: {
          ...state.cliente,
          nome: action.payload.nome,
          email: action.payload.email,
          sexo: action.payload.sexo,
        },
      };
    case 'NOVA_COMPRA':
      return {
        produtos: initialStateProdutos,
        cliente: initialStateCliente,
      };
    case 'SET_NOME_CLIENTE':
      return {
        ...state,
        cliente: {
          ...state.cliente,
          nome: action.payload,
        },
      };
    case 'SET_EMAIL_CLIENTE':
      return {
        ...state,
        cliente: {
          ...state.cliente,
          email: action.payload,
        },
      };
    case 'SET_SEXO_CLIENTE':
      return {
        ...state,
        cliente: {
          ...state.cliente,
          sexo: action.payload,
        },
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: rootReducer,
  form: formReducer,
});