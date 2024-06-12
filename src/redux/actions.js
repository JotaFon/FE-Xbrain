// Para adicionar um produto ao carrinho
export const adicionarProduto = (produto) => ({
    type: 'ADICIONAR_PRODUTO',
    payload: produto,
  });
  // Para finalizar a compra
  export const finalizarCompra = (cliente) => (dispatch, getState) => {
    const { nome, email } = cliente;
    if (nome && email) {
      dispatch({ type: 'FINALIZAR_COMPRA', payload: cliente });
    } else {
      console.error('Preencha todos os campos obrigatórios.');
    }
  };
  // Para iniciar uma nova compra
  export const novaCompra = () => ({
    type: 'NOVA_COMPRA',
  });