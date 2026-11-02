const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = [];
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

  function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
      tasks = JSON.parse(savedTasks);
    }
  }


addButton.addEventListener("click", function () {
  const taskName = taskInput.value;

  if (taskName === "") {
    alert("Please enter a task!");
    return;
  } 
tasks.push(taskName);

saveTasks();
displayTask();

taskInput.value = "";  
});

loadTasks();
displayTask(); 

function displayTask(){
  taskList.innerHTML = "";

  tasks.forEach(function(task){
    const newTask = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteButton =
    document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function(){
      newTask.remove();
    });

    newTask.appendChild(taskText);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);
  });
}
