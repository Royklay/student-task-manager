class Task {
    constructor(name, completed = false) {
        this.name = name;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}


// Get HTML elements
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

const allFilter = document.getElementById("all-filter");
const pendingFilter = document.getElementById("pending-filter");
const completedFilter = document.getElementById("completed-filter");

const loadTasksButton = document.getElementById("load-tasks");

let tasks = [];
let currentFilter = "all";


// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Load saved tasks
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const savedData = JSON.parse(savedTasks);

        tasks = savedData.map(function(task) {
            return new Task(task.name, task.completed);
        });
    }
}


// Add a new task
addButton.addEventListener("click", function() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = new Task(taskName);

    tasks.push(newTask);

    saveTasks();
    displayTask();

    taskInput.value = "";
});


// Display tasks
function displayTask() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });
    }

    filteredTasks.forEach(function(task) {
        const newTask = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";

        completeButton.addEventListener("click", function() {
            task.toggleComplete();
            saveTasks();
            displayTask();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            newTask.remove();
        });

        newTask.appendChild(taskText);
        newTask.appendChild(completeButton);
        newTask.appendChild(deleteButton);

        taskList.appendChild(newTask);
    });
}


// Filters
allFilter.addEventListener("click", function() {
    currentFilter = "all";
    displayTask();
});

pendingFilter.addEventListener("click", function() {
    currentFilter = "pending";
    displayTask();
});

completedFilter.addEventListener("click", function() {
    currentFilter = "completed";
    displayTask();
});


// Fetch sample tasks
loadTasksButton.addEventListener("click", async function() {
    loadTasksButton.textContent = "Loading...";
    loadTasksButton.disabled = true;

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        const sampleTasks = await response.json();

        const formattedTasks =
         sampleTasks.map(function(task) {
           const{title, completed} = task;

           return new Task(title, completed);
        });

        tasks = tasks.concat(formattedTasks);

        saveTasks();
        displayTask();

    } catch (error) {
        console.log("Error loading tasks:", error);
        alert("Could not load sample tasks. Please try again.");

    } finally {
        loadTasksButton.textContent = "Load Sample Tasks";
        loadTasksButton.disabled = false;
    }
});


// Start application
loadTasks();
displayTask();