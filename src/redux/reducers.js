import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const produtosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADICIONAR_PRODUTO':
      return [...state, action.payload];
    case 'NOVA_COMPRA':
      return [];
    default:
      return state;
  }
};

const clienteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FINALIZAR_COMPRA':
      return action.payload;
    case 'NOVA_COMPRA':
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  produtos: produtosReducer,
  cliente: clienteReducer,
  form: formReducer,
});

export default rootReducer;
