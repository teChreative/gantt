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

// window.addEventListener("load", createChart); (keep here for when add-ons below are removed)
// window.addEventListener("resize", createChart);

// ADD-ONS START HERE

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

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};



var createTaskEl = function (taskDataObj) {
  // create list item
  var listItemEl = document.createElement("ul");
  listItemEl.className = "chart-bars";
  let left = 0, width = 0;
  

  // IMPLANT START from createChart for repurpose
  listItemEl.style.left = `${left}px`;
  listItemEl.style.width = `${width}px`;
  listItemEl.style.opacity = .5;
  //background-color: rgb(51, 168, 165); opacity: 1;
  // if (listItemEl.type == "load") {
  //   listItemEl.style.backgroundColor = listItemEl.dataset.color;
  //   listItemEl.style.opacity = 1;
  // }
  // IMPLANT END from createChart for repurpose
  

  // create element to hold task info and add to list item
  // STYLE NEEDS TO DYNAMICALLY GENERATE THE left AND width PROPERTIES: 
  listItemEl.innerHTML = `<li data-duration="wed-thu" data-color="#b03532" class="task-item" style="left: 103px; width: 404px; background-color: rgb(51, 168, 165);">${taskDataObj.task}</li>`;
  // listItemEl.innerHTML = `<li data-duration="${USER IN}" data-color="#b03532" class="task-item" style="left: ${CODE GEN}; width: ${CODE GEN}; background-color: rgb(51, 168, 165); opacity: 1;">${taskDataObj.task}</li>`;
  
  //listItemEl.appendChild();

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  
};

formEl.addEventListener("submit", taskFormHandler);
window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);
