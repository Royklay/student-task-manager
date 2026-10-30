const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");


}

addButton.addEventListener("click", function () {
  const taskName = taskInput.value;

  if (taskName === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = taskName;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    newTask.remove();
  });

  newTask.appendChild(taskText);
  newTask.appendChild(deleteButton);

  taskList.appendChild(newTask);
  tasks.push(taskName);
  saveTasks();

  taskInput.value = "";

  
});
