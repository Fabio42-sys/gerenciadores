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

    // Recuperar despesas do localStorage
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];

    // Verificar se já existe uma despesa com o mesmo nome e valor
    const despesaExistente = despesas.find(despesa => 
        despesa.descricao === nomeDespesa && despesa.valor === valorDespesa
    );

    if (!despesaExistente) {
        // Criar um identificador único para a nova despesa
        let despesaId = gerarId();

        // Adicionar o valor ao total de despesas
        let totalDespesa = parseFloat(localStorage.getItem('totalDespesa')) || 0;
        totalDespesa += valorDespesa;
        localStorage.setItem('totalDespesa', totalDespesa.toString());

        // Criar nova despesa com ID único
        let novaDespesa = {
            id: despesaId,
            descricao: nomeDespesa,
            valor: valorDespesa,
            tag: tagName,
            color: color
        };

        // Adicionar a nova despesa ao array
        despesas.push(novaDespesa);

        // Armazenar o array de despesas atualizado no localStorage
        localStorage.setItem('despesas', JSON.stringify(despesas));

        // Retorna a nova despesa para ser usada na página principal
        return novaDespesa;
    } else {
        // Se a despesa já existir, remover a duplicata e exibir uma mensagem
        removerDespesa(despesaExistente.id, valorDespesa);
        alert('Uma despesa com o mesmo nome e valor já existe! Despesa duplicada foi removida.');
    }
}

// Função para adicionar uma despesa ao DOM
function adicionarDespesaAoDOM(despesa) {
    const despezaHolder = document.createElement('div');
    const visibleDespesas = document.querySelector('.despezas');
    let name = document.createElement('p');
    let value = document.createElement('p');
    let tag = document.createElement('p');
    let checkButton = document.createElement('button');

    // Configurar os elementos
    despezaHolder.classList.add('newDespeza');
    despezaHolder.dataset.id = despesa.id; // Definir o id como atributo do elemento
    despezaHolder.dataset.tag = despesa.tag; // Definir a tag como atributo do elemento

    // Definir o conteúdo dos elementos
    name.textContent = despesa.descricao;
    value.textContent = despesa.valor.toFixed(2); // Arredondar para duas casas decimais
    tag.textContent = despesa.tag;
    checkButton.textContent = 'Fechar';
    despezaHolder.style.backgroundColor = despesa.color;

    // Adicionar os elementos ao 'despezaHolder'
    despezaHolder.appendChild(name);
    despezaHolder.appendChild(value);
    despezaHolder.appendChild(tag);
    despezaHolder.appendChild(checkButton);

    // Adicionar 'despezaHolder' ao elemento pai
    visibleDespesas.appendChild(despezaHolder);

    // Adicionar evento ao botão de fechar
    checkButton.addEventListener('click', () => {
        removerDespesa(despesa.id, despesa.valor);
        despezaHolder.remove();
        let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
        despesas = despesas.filter((d) => d.id !== despesa.id);
        localStorage.setItem('despesas', JSON.stringify(despesas));
        tagsList = tagsList.filter((tag) => tag.id !== despesa.id);
    });
}

// Função para carregar e exibir despesas ao carregar a página
function carregarDespesas() {
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    despesas.forEach(despesa => {
        adicionarDespesaAoDOM(despesa);
    });
}

// Carregar despesas ao carregar a página
window.addEventListener('DOMContentLoaded', carregarDespesas);

export { tagsList }