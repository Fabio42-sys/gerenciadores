import { tagsList } from "./despesas.js";

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
    const isExistingTag = tagsList.some(tagItem => tagItem.tag.toLowerCase() === query);

    const despesasContainer = document.querySelector('.despezas');

    // Trazer a despesa correspondente à tag pesquisada para a primeira posição
    if (isExistingTag) {
        const despesas = document.querySelectorAll('.newDespeza');
        despesas.forEach(despesa => {
            const tag = despesa.dataset.tag.toLowerCase();
            if (tag.includes(query)) {
                despesasContainer.insertBefore(despesa, despesasContainer.firstChild);
                despesa.style.visibility = 'visible';
            } else {
                despesa.style.display = 'none';
            }
        });
    } else {
        // Ocultar todas as despesas se a tag não existir
        const despesas = document.querySelectorAll('.newDespeza');
        despesas.forEach(despesa => despesa.style.visibility = 'hidden');


        window.alert(errorMessage);
        console.log(errorMessage);
    }
});

// Limpar a pesquisa e restaurar todas as despesas ao limpar o campo de pesquisa
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
        // Exibir todas as despesas ao limpar a pesquisa
        const despesas = document.querySelectorAll('.newDespeza');
        despesas.forEach(despesa => despesa.style.display = 'flex');
    }
});
