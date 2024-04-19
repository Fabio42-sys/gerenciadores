function criar() {
    let nomeDespeza = document.getElementById('nome').value;
    let valorDespeza = document.getElementById('valor').value;
    let tagName = document.getElementById('tag').value;
    let color = document.getElementById('color').value;
    
    var despezaHolder = document.createElement('div');
    var visibleDespesas = document.querySelector('.despezas');
    let nome = document.createElement('p');
    let valor = document.createElement('p');
    let tag = document.createElement('p');
    var check = document.createElement('button');
  
    // Configuração dos elementos
    despezaHolder.classList.add('newDespeza');
    nome.textContent = nomeDespeza;
    valor.textContent = valorDespeza;
    tag.textContent = tagName;
    check.textContent = 'Fechar'; // Texto do botão 'check'
    despezaHolder.style.backgroundColor = color;
    // Adiciona os elementos ao 'despezaHolder'
    despezaHolder.appendChild(nome);
    despezaHolder.appendChild(valor);
    despezaHolder.appendChild(tag);
    despezaHolder.appendChild(check);
    // Adiciona 'despezaHolder' ao elemento pai
    visibleDespesas.appendChild(despezaHolder);
  
    // Evento para ocultar 'despezaHolder' ao clicar em 'check'
    check.addEventListener('click', (event) => {
      event.preventDefault();
      despezaHolder.style.display = 'none';
    });
  }