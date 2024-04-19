var adicionar = document.querySelector('.add');
let tarefa = document.getElementById('nova-tarefa');
var new_tarefa = document.querySelector('.container');

function add() {
    // Criando elementos
    var div_tarefa = document.createElement('div');
    div_tarefa.classList.add('tarefa');
    
    var div_botoes = document.createElement('div');
    div_botoes.classList.add('bnts');
    
    var bntConcluir = document.createElement('button');
    bntConcluir.classList.add('bnt', 'concluir');
    bntConcluir.textContent = 'Concluir';
    // Adicionando evento de clique ao botão "Concluir"
    bntConcluir.addEventListener('click', function() {
        div_tarefa.style.backgroundColor = 'rgb(49, 195, 49)';
        console.log('Tarefa concluída:', div_tarefa.textContent);
    });
    
    var bntExcluir = document.createElement('button');
    bntExcluir.classList.add('bnt', 'excluir');
    bntExcluir.textContent = 'Excluir';

    // Adicionando evento de clique ao botão "Excluir"
    bntExcluir.addEventListener('click', function() {
        div_tarefa.remove();
        console.log('Tarefa excluída:', div_tarefa.textContent);
    });
    
    let nomeTarefa = tarefa.value;
    
    new_tarefa.appendChild(div_tarefa);
    div_tarefa.textContent = nomeTarefa;
    div_tarefa.appendChild(div_botoes);
    div_botoes.appendChild(bntConcluir);
    div_botoes.appendChild(bntExcluir);
}