import { gerarId, removerDespesa } from "./calcDespezas.js";

let tagsList = []; // Lista para armazenar todas as tags criadas

// Função para criar uma nova despesa
export function criar() {
  // Obter os valores dos campos de entrada
  let nomeDespesa = document.getElementById('nome').value;
  let valorDespesaString = document.getElementById('valor').value; // Pegando o valor como string
  let valorDespesa = parseFloat(valorDespesaString); // Convertendo para float
  let tagName = document.getElementById('tag').value.toLowerCase();
  let color = document.getElementById('color').value;

  // Validar se os campos estão preenchidos corretamente
  if (!nomeDespesa || isNaN(valorDespesa) || !tagName || !color) {
    alert('Por favor, preencha todos os campos.');
    console.log('Erro: campos incompletos.', { nomeDespesa, valorDespesaString, tagName, color });
    return;
  }

  // Criar um identificador único para a despesa
  let despesaId = gerarId();

  // Adicionar a tag à lista de tags com o identificador
  tagsList.push({ id: despesaId, tag: tagName });

  // Recuperar despesas do localStorage
  let despesas = JSON.parse(localStorage.getItem('despesas')) || [];

  // Criar nova despesa com ID único
  let novaDespesa = {
    id: despesaId,
    descricao: nomeDespesa,
    valor: valorDespesa
  };

  // Adicionar a nova despesa ao array
  despesas.push(novaDespesa);

  // Armazenar o array de despesas atualizado no localStorage
  localStorage.setItem('despesas', JSON.stringify(despesas));

  // Atualizar o total de despesas
  let totalDespesa = parseFloat(localStorage.getItem('totalDespesa')) || 0;
  totalDespesa += valorDespesa;
  localStorage.setItem('totalDespesa', totalDespesa.toString());

  // Exibir o total atualizado no console
  console.log('Novo total despesa:', totalDespesa);
  console.log('id despesa', novaDespesa.id);

  // Criar os elementos HTML
  var despezaHolder = document.createElement('div');
  var visibleDespesas = document.querySelector('.despezas');
  let nomeElement = document.createElement('p');
  let valorElement = document.createElement('p');
  let tagElement = document.createElement('p');
  var checkButton = document.createElement('button');

  // Configurar os elementos
  despezaHolder.classList.add('newDespeza');
  despezaHolder.dataset.id = despesaId; // Definir o id como atributo do elemento
  despezaHolder.dataset.tag = tagName; // Definir a tag como atributo do elemento
  nomeElement.textContent = nomeDespesa;
  valorElement.textContent = valorDespesa.toFixed(2); // Arredondar para duas casas decimais
  tagElement.textContent = tagName;
  checkButton.textContent = 'Fechar';
  despezaHolder.style.backgroundColor = color;

  // Adicionar os elementos ao 'despezaHolder'
  despezaHolder.appendChild(nomeElement);
  despezaHolder.appendChild(valorElement);
  despezaHolder.appendChild(tagElement);
  despezaHolder.appendChild(checkButton);

  // Adicionar 'despezaHolder' ao elemento pai
  visibleDespesas.appendChild(despezaHolder);

  checkButton.addEventListener('click', () => {
    removerDespesa(despesaId, valorDespesa);
    despezaHolder.remove();
  });
}

export { tagsList };
