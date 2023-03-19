
const mytodo_list = []; //array 

// This portion of the code defines four constant in the array and uses
// web based applications that allows the user to add, update, and keeo
//track of the todolist. The list of tasks will be displayed here. 
// to edit, delete, update. 
const tasksContainer = document.getElementById("mytodo-tasks");
const counter = document.getElementById("counter");
const addForm = document.getElementById("add-form");
const updateForm = document.getElementById("update-form");
const cancelUpdateBtn = document.getElementById("cancel-update");


// This portion of the code defines the add task function. 
// It triggers it.
// The event paramater is passed as an argument. the readAllTasks function
// is called and displays all tasks in the mytodolist array. Then when
// a tasks is added, it resets to clear the input feiled so a new task can be added

function addTask(event) {
  event.preventDefault(); // prevents default form submission behavioor
  const task = document.getElementById("add-task").value.trim(); // retrives value of imput element
  if (task) {
    mytodo_list.push(task);
    readAllTasks();
    addForm.reset();
  }
}

// To Read. This portion of the code displayed all the stored data and tasks.
// It initilizes emoty string variable called data. then has a for loop to
// iterate over each task and creates a row for each one.
// one that has the task and the one one to update and delate
// then the showupdate and delete task functions are passed the index of
// the current task, 
// then the total number of tasks is displayed. 
function readAllTasks() {
  let data = "";
  for (let i = 0; i < mytodo_list.length; i++) {
    data += `
      <tr>
        <td>${mytodo_list[i]}</td>
        <td>
          <button onclick="showUpdateForm(${i})">Update</button>
          <button onclick="deleteTask(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
  tasksContainer.innerHTML = data;
  counter.textContent = `${mytodo_list.length} Tasks`;
}

// To Update. This portion of the code used to update and close an update form from the todo list
// The showUpdateForm function takes an index parameter that 
//specifies which task in the list should be updated.
// Then  function sets the display style property of the update form 
//to block, making it visible. It then retrieves the task input 
//element and sets its value to the task at the specified index.
// If the new task value is not empty, the function uses the splice method 
//to replace the old task at the specified index with the new one
// he onclick event handler for the cancel button to call the closeUpdateForm 
// function, which hides the update form and resets its values.

function showUpdateForm(index) {
  updateForm.style.display = "block";
  const taskInput = document.getElementById("update-task");
  taskInput.value = mytodo_list[index];
  updateForm.onsubmit = function (event) {
    event.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask) {
      mytodo_list.splice(index, 1, newTask);
      readAllTasks();
      closeUpdateForm();
    }
  };
  cancelUpdateBtn.onclick = closeUpdateForm;
}

function closeUpdateForm() {
  updateForm.style.display = "none";
  updateForm.reset();
}

// To Delte
// This portion of the code uses the delete task funtion as an index paramater
// Which task specifically should be deleted. 
// It uses splice method to remove the task and calls the realall task to refesh the dispplay
// then it displaus exisiting tasks. 
// Then the event listers submit even of the add form
// calls the add tasks function when the form is submitted. 
function deleteTask(index) {
  mytodo_list.splice(index, 1);
  readAllTasks();
}

//the page starts by displaying tasks so none for now till user adds
readAllTasks();
addForm.addEventListener("submit", addTask);
