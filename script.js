function createChart(e) {
  const days = document.querySelectorAll(".chart-values li");
  const tasks = document.querySelectorAll(".chart-bars li");
  const daysArray = [...days];
  
  tasks.forEach(el => {
    const duration = el.dataset.duration.split("-");
    const startDay = duration[0];
    const endDay = duration[1];
    let left = 0, width = 0;

    if (startDay.endsWith("½")) {
      const filteredArray = daysArray.filter(day => day.textContent == startDay.slice(0, -1));
      left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
    } else {
      const filteredArray = daysArray.filter(day => day.textContent == startDay);
      left = filteredArray[0].offsetLeft;
    }

    if (endDay.endsWith("½")) {
      const filteredArray = daysArray.filter(day => day.textContent == endDay.slice(0, -1));
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - left;
    } else {
      const filteredArray = daysArray.filter(day => day.textContent == endDay);
      width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left;
    }

    // Styles
    el.style.left = `${left}px`;
    el.style.width = `${width}px`;
    if (e.type == "load") {
      el.style.backgroundColor = el.dataset.color;
      el.style.opacity = 1;
    }
  });

}

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var dayStartInput = document.querySelector("select[name='day-start']").value;
  var dayendInput = document.querySelector("select[name='day-end']").value;

  // check if input values are empty strings
  if (!dayStartInput || !dayendInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  formEl.reset();

  // package up data as an object
  var taskDataObj = {
    task: taskNameInput,
    start: dayStartInput,
    end: dayendInput
  };

  alert("Task: " + taskDataObj.task + " - " + taskDataObj.start + " through " + taskDataObj.end);

  let left = 0;
  switch(taskDataObj.start) {
    case "Mon":
      left = 112;
      break;
    case "Tue":
      left = 225;
      break;
    case "Wed":
      left = 338;
      break;
    case "Thu":
      left = 450;
      break;
    case "Fri":
      left = 562;
      break;
    case "Sat":
      left = 674;
      break;
    case "Sun":
      left = 0;
      break;
    default:
      left = 0;
  }
  // alert(left);

  let width = 0;
  switch(taskDataObj.end) {
    case "Mon":
      width = 112;
      break;
    case "Tue":
      width = 225;
      break;
    case "Wed":
      width = 338;
      break;
    case "Thu":
      width = 450;
      break;
    case "Fri":
      width = 562;
      break;
    case "Sat":
      width = 674;
      break;
    case "Sun":
      width = 0;
      break;
    default:
      width = 0;
  }
  // alert(width);

  let width1 = left + width;
  alert("new task width should be: " + width1 + "px wide");

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};


var createTaskEl = function (taskDataObj, left, width) {
  // Create list item
  var listItemEl = document.createElement("ul");
  listItemEl.className = "chart-bars";
  listItemEl.id = "tasks-to-do";
  //let left = 0, width = 0;

  if (taskDataObj.type == "load") {
    listItemEl.style.backgroundColor = listItemEl.dataset.color;
    listItemEl.style.opacity = 1;
  }
 
  // Create element to hold task info and add to list item
  // ORIGINAL KINDA WORKING - listItemEl.innerHTML = `<li data-duration="wed-sat" data-color="#b03532" class="task-item" style="left: 338px; width: 404px; background-color: rgb(51, 168, 165); opacity: 1;">${taskDataObj.task}</li>`;
  listItemEl.innerHTML = `<li data-duration="${taskDataObj.start} - ${taskDataObj.end}" data-color="#b03532" class="task-item" style="left: ${left}px; width: ${width}px; background-color: rgb(51, 168, 165); opacity: 1;">${taskDataObj.task}</li>`;
  // listItemEl.innerHTML = `<li data-duration="${USER IN}" data-color="#b03532" class="task-item" style="left: ${CODE GEN}; width: ${CODE GEN}; background-color: rgb(51, 168, 165); opacity: 1;">${taskDataObj.task}</li>`;

  // Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  
};

formEl.addEventListener("submit", taskFormHandler);
window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);
