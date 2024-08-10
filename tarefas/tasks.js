import { createTask, taskId } from "./script.js";

var createBtn = document.getElementById('submitBtn');

let totalTasksIds = taskId;

createBtn.addEventListener('click', () => {
    createTask();
    totalTasksIds++;
    console.log('o total de tarefas é', totalTasksIds);
});