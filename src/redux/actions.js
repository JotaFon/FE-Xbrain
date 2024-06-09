export const adicionarProduto = (produto) => ({
    type: 'ADICIONAR_PRODUTO',
    payload: produto,
  });
  
  export const finalizarCompra = (cliente) => ({
    type: 'FINALIZAR_COMPRA',
    payload: cliente,
  });
  
  export const novaCompra = () => ({
    type: 'NOVA_COMPRA',
  });
  