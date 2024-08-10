import { tagList } from "./script.js";

var searchBtn = document.getElementById('searchIcon');
var searchHolder = document.getElementById('searchHolder');
var searchInput = document.getElementById('search');
var errorMessage = 'Erro! tag não encontrada!';

searchInput.addEventListener('focus', () => {
    searchInput.style.outline = 'none';
    searchHolder.style.border = '1px solid #000';
});

searchInput.addEventListener('blur', () => {
    searchHolder.style.border = 'none';
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();

    // Verificar se a pesquisa é uma tag existente
    const isExistingTag = tagList.some(tagItem => tagItem.tag.toLowerCase() === query);

    const tarefasContainer = document.querySelector('.tasksHolder');

    if (isExistingTag) {
        const tarefas = document.querySelectorAll('.task');
        tarefas.forEach(task => {
            const tag = task.dataset.tag ? task.dataset.tag.toLowerCase() : '';
            if (tag.includes(query)) {
                tarefasContainer.insertBefore(task, tarefasContainer.firstChild);
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    } else {
        const tarefas = document.querySelectorAll('.task');
        tarefas.forEach(task => task.style.display = 'none');

        window.alert(errorMessage);
        console.log(errorMessage);
    }
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
        const tarefas = document.querySelectorAll('.task');
        tarefas.forEach(task => task.style.display = 'flex');
    }
});
