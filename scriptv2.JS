let submit = document.getElementById('submit');

// Class for all the tasks
class Task {
  constructor(title, date, description, urgency) {
    this._title = title;
    this._date = date;
    this._description = description;
    this._urgency = urgency;
  }

  get title() {
    return this._title;
  }

  get date() {
    return this._date;
  }

  get description() {
    return this._description;
  }

  get urgency() {
    return this._urgency;
  }
}

// Function for creating tasks

let tasks = {};
let taskOrder = [];

let createTask = event => {
  event.preventDefault();

  // Get the values from the form inputs
  let title = document.getElementById('taskTitle').value;
  let date = document.getElementById('taskDate').value;
  let description = document.getElementById('taskDes').value;
  let urgent = document.querySelector('input[name="urgency"]:checked').value === 'true';

  if (title) {
    // Transform the title: to lowercase, remove spaces, and append "Obj"
    let objTitle = title.toLowerCase().replace(/\s+/g, '') + "Obj";

    // Create a new task object using the Task class
    let newTask = new Task(title, date, description, urgent);

    // Add the new task object to the tasks object with the dynamic key
    tasks[objTitle] = newTask;
    if (urgent) {
      taskOrder.unshift(objTitle);
    } else {
      taskOrder.push(objTitle);
    }

    // Reset the form
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskDes').value = '';
    document.getElementById('urgent').checked = false;
    document.getElementById('notUrgent').checked = true;

    // Display the tasks in the "Your tasks" section
    displayTasks();
  }
}

let displayTasks = () => {
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear the current list

  taskOrder.forEach(key => {
    let task = tasks[key];
    let listItem = document.createElement('li');
    let title = `<h4>${task.title}</h4>`;
    let date = task.date ? `<p class="dueDate">${task.date.replace('T', ' at ')}</p>` : '';
    let description = `<p class="description">${task.description}</p>`;
    let checkBox = '<div class="leftColumn"><div class="doneButton"></div></div>';

    if (task.urgency) {
      listItem.innerHTML = `${checkBox}
        <div class="taskInfo">
          <h4 class="urgent">${task.title}</h4>
          ${date}
          ${description}
        </div>`;
    } else {
      listItem.innerHTML = `${checkBox}
        <div class="taskInfo">
          ${title}
          ${date}
          ${description}
        </div>`;
    }

    taskList.appendChild(listItem);
  });
}

// Function for removing tasks
const taskCompleted = (event) => {
  if (event.target.classList.contains('doneButton')) {
    // Find the parent <li> element
    const listItem = event.target.closest('li');
    // Find the <h4> element inside the <li>
    const titleElement = listItem.querySelector('h4');
    // Get the key for the task object
    let taskKey = titleElement.textContent.toLowerCase().replace(/\s+/g, '') + "Obj";

    // Remove the task from the tasks object
    delete tasks[taskKey];
    // Remove the key from the taskOrder array
    taskOrder = taskOrder.filter(key => key !== taskKey);

    // Remove the list item from the DOM
    listItem.remove();

    // Display the tasks in the "Your tasks" section
    displayTasks();
  }
}

//Event handlers
submit.addEventListener('click', createTask);
taskList.addEventListener('click', taskCompleted);