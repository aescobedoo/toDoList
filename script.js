//defining variables
let submitBu = document.getElementById('submit');
let taskList = document.getElementById('taskList');
let doneButtons = document.getElementsByClassName('doneButton');
let dueDateElement = document.querySelector('.dueDate');

// Function for adding tasks
const addTask = (event) => {
  event.preventDefault();
  let title = document.getElementById('taskTitle').value;
  let date = document.getElementById('taskDate').value;
  let description = document.getElementById('taskDes').value;
  let urgent = document.getElementById('urgent');
  let newItem = document.createElement("li");
  let checkBox = '<div class="leftColumn"><div class="doneButton"></div></div>'
  if (urgent.checked) {
    if (date && description){
      date = date.replace('T', ' at ');
      newItem.innerHTML = `${checkBox}<div class="taskInfo"><h4>${title}</h4><p class="urgent dueDate">due ${date}</p><p class="description">${description}</p></div>`;
    }
    else if (date){
      date = date.replace('T', ' at ');
      newItem.innerHTML = checkBox + '<div class="taskInfo"><h4>' + title + '</h4>' + '<p class="urgent dueDate">due ' + date + '</p></div>';
    }
    else if (description){
      newItem.innerHTML = checkBox + '<div class="taskInfo"><h4 class="urgent">' + title + '</h4>' + '<p class="description"> ' + description + '</p></div>';
    }
    else{
      newItem.innerHTML = checkBox + '<div class="taskInfo"><h4 class="urgent">' + title + '</h4></div>';
    }
  } else {
    if (date && description){
      date = date.replace('T', ' at ');
      newItem.innerHTML = checkBox + '<div class="taskInfo"><h4>' + title + '</h4>' + '<p class="dueDate">due ' + date + '</p>' + '<p class="description">' + description + '</p></div>';
    }
    else if (date){
      date = date.replace('T', ' at ');
      newItem.innerHTML = checkBox + '<div class="taskInfo"><h4>' + title + '</h4>' + '<p class="dueDate">due ' + date + '</p></div>';
    }
    else if (description){
      newItem.innerHTML = checkBox + '<div class="taskInfo"><h4>' + title + '</h4>' + '<p class="description"> ' + description + '</p></div>';
    }
    else{
      newItem.innerHTML = checkBox + '<div class="taskInfo"><h4>' + title + '</h4></div>';
    }
  }

  document.getElementById('taskList').appendChild(newItem);
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskDes').value = '';
  document.getElementById('urgent').checked = false;
  document.getElementById('notUrgent').checked = true;
}

// Function for removing tasks
const taskCompleted = (event) => {
  if (event.target.classList.contains('doneButton')) {
    // Remove the parent <li> element of the clicked button
    event.target.closest('li').remove();
  }
}



// Event handlers
submitBu.addEventListener('click', addTask);
taskList.addEventListener('click', taskCompleted);
urgencyCheckbox.addEventListener('change', function() {
  // Toggle the 'urgent' class on the due date element based on the checkbox's checked state
  dueDateElement.classList.toggle('urgent', this.checked);
});

