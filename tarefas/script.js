function gerarId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  let tagList = [];
  let taskId = gerarId();
  
  export function createTask() {
    // Obtendo os valores dos inputs dentro da função
    let taskName = document.getElementById('taskName').value;
    let taskDate = document.getElementById('taskLimit').valueAsDate;
    let formattedDate = `${taskDate.getDate()}/${taskDate.getMonth() + 1}/${taskDate.getFullYear()}`;
    let taskTag = document.getElementById('taskTag').value;
  
    console.log("Valores dos inputs:", { taskName, formattedDate, taskTag }); // Log de depuração
  
    taskId = gerarId(); // Gerar um novo ID para cada tarefa
  
    tagList.push({ id: taskId, tag: taskTag });
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Verifique se o valor da data está sendo capturado corretamente
    if (!taskDate) {
      console.error("A data da tarefa não está sendo capturada corretamente.");
      return;
    }
  
    let newTask = {
      id: taskId,
      name: taskName,
      date: formattedDate,
      tag: taskTag
    };
  
    tasks.push(newTask);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
    let taskHolder = document.getElementById('container');
    if (!taskHolder) {
      console.error("Elemento '#container' não encontrado");
      return;
    }
  
    taskHolder.classList.add('taskHolder');
  
    let task = document.createElement('div');
    task.setAttribute('data-tag', taskTag); // Definir o atributo data-tag
  
    let nameContent = document.createElement('p');
    let limitContent = document.createElement('p');
    let tagContent = document.createElement('p');
    let btnsHolder = document.createElement('div');
    let check = document.createElement('button');
    let close = document.createElement('button');
  
    task.classList.add('task');
    btnsHolder.classList.add('btns');
    check.classList.add('check');
    close.classList.add('close');
    nameContent.textContent = taskName;
    limitContent.textContent = formattedDate; // Formatando a data corretamente
    tagContent.textContent = taskTag;
  
    console.log("Nome da Tarefa:", taskName); // Log de depuração
    console.log("Data Limite:", limitContent.textContent); // Log de depuração
    console.log("Tag da Tarefa:", taskTag); // Log de depuração
  
    // Zona de appends
    task.appendChild(nameContent);
    task.appendChild(limitContent);
    task.appendChild(tagContent);
    task.appendChild(btnsHolder);
    btnsHolder.appendChild(check);
    btnsHolder.appendChild(close);
  
    taskHolder.appendChild(task);
  
    check.textContent = 'Concluir';
    close.textContent = 'Fechar';
  
    check.addEventListener('click', () => {
      task.style.backgroundColor = 'green';
    });
  
    close.addEventListener('click', () => {
      task.remove();
      // Remover a tarefa do localStorage e da tagList
      tasks = tasks.filter((task) => task.id !== newTask.id);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      tagList = tagList.filter((tag) => tag.id !== newTask.id);
    });
  }
  
  export { tagList, taskId };