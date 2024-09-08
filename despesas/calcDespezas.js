import { criar, tagsList } from "./despesas.js";

// Função para gerar ID aleatório
export function gerarId() {
  return '_' + Math.random().toString(36);
}

document.addEventListener('DOMContentLoaded', function () {
  const botaoCriar = document.querySelector('.btn');
  botaoCriar.addEventListener('click', function () {
    // Chama a função criar() ao clicar no botão
    criar();
  });
});
export function removerDespesa(despesaId) {
  // Recuperar as despesas do Local Storage
  let despesas = JSON.parse(localStorage.getItem('despesas')) || [];

  // Encontrar o índice da despesa a ser removida
  let despesaIndex = despesas.findIndex(despesa => despesa.id === despesaId);

  if (despesaIndex !== -1) {
    // Recuperar e analisar o total das despesas
    let totalDespesa = parseFloat(localStorage.getItem('totalDespesa')) || 0;

    // Obter o valor da despesa a ser removida
    let valorDespesa = parseFloat(despesas[despesaIndex].valor);

    // Subtrair o valor da despesa do total das despesas
    totalDespesa -= valorDespesa;

    // Atualizar o total das despesas no Local Storage
    localStorage.setItem('totalDespesa', totalDespesa.toString());

    // Remover a despesa do array de despesas
    despesas.splice(despesaIndex, 1);

    // Armazenar o array de despesas atualizado no Local Storage
    localStorage.setItem('despesas', JSON.stringify(despesas));

    // Exibir o total atualizado no console
    console.log('Despesa removida. Novo total despesa:', totalDespesa);

    // Remover a despesa da lista de tags
    tagsList = tagsList.filter(tag => tag.id !== despesaId);
  } else {
    // Exibir uma mensagem de erro se a despesa não for encontrada
    console.error('Despesa não encontrada ou ID não corresponde');
  }
}
