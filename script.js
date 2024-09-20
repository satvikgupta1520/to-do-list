// Function to load tasks from localStorage
function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let taskList = document.getElementById("task-list");
        let tasks = JSON.parse(savedTasks);

        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text">${task}</span>
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
}

// Function to save tasks to localStorage
function saveTasks() {
    let taskList = document.getElementById("task-list");
    let tasks = [];

    taskList.querySelectorAll("li").forEach(item => {
        tasks.push(item.querySelector(".task-text").textContent.trim());
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);

    taskInput.value = "";  // Clear the input field

    saveTasks();  // Save tasks after adding a new one
}

// Function to delete a task
function deleteTask(button) {
    let li = button.parentElement;
    li.remove();

    saveTasks();  // Save tasks after deletion
}

// Function to edit a task
function editTask(button) {
    let li = button.parentElement;
    let taskTextElement = li.querySelector(".task-text");
    let newTaskText = prompt("Edit your task:", taskTextElement.textContent);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskTextElement.textContent = newTaskText.trim();
        saveTasks();  // Save tasks after editing
    }
}

// Load tasks when the page is loaded
window.onload = function() {
    loadTasks();
};
