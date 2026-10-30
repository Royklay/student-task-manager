const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", function () {
  const taskName = taskInput.value;

  const newTask = document.createElement("li");

  newTask.textContent = taskName;

  taskList.appendChild(newTask);

  taskInput.value = "";

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

});
