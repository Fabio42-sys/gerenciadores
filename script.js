import { criar } from './despesas/despesas.js';
import { createTask } from './tarefas/script.js';

const despesaBtn = document.querySelector('#despesa');
const tarefaBtn = document.querySelector('#submitBtn');

despesaBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // Chama a função criar() para processar a despesa
    const novaDespesa = criar();

    // Atualiza a lista de despesas no localStorage
    if (novaDespesa) {
        // Atualiza o total de despesas no localStorage
        let totalDespesa = parseFloat(localStorage.getItem('totalDespesa')) || 0;
        totalDespesa += novaDespesa.valor;
        localStorage.setItem('totalDespesa', totalDespesa.toString());
        
        // Atualiza a lista de despesas no localStorage
        let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
        despesas.push(novaDespesa);
        localStorage.setItem('despesas', JSON.stringify(despesas));
    }
});

tarefaBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // Chama a função createTask() para processar a tarefa
    createTask();
});
