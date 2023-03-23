let sidebar = document.querySelector(".sidebar");
ButtonShow.addEventListener("mouseenter", function () {
  iconButton.classList.add("fa-spin");
});
ButtonShow.addEventListener("mouseleave", function () {
  iconButton.classList.remove("fa-spin");
});
ButtonShow.addEventListener("click", function () {
  if (sidebar.classList.contains("hide")) {
    sidebar.classList.remove("hide");
    sidebar.classList.add("show");
    sidebar.style.setProperty("--hight", "0%");
    supmitTask.style.left = "-10vw";
    taskes.style.left = "-10vw";
  } else {
    sidebar.classList.add("hide");
    sidebar.classList.remove("show");
    sidebar.style.setProperty("--hight", "100%");
    supmitTask.style.left = "0";
    taskes.style.left = "0";
  }
});

// _________________________________________________________
// end of sidebar
// _________________________________________________________

let cs = document.styleSheets[0].cssRules[0].style;
let ColorSpan = document.querySelectorAll(".colorSpan");
let colorItem = document.querySelectorAll(".colorItem");
let colorById;
let taskNumber = window.localStorage.getItem("taskNumber");
let task = document.createElement("div");

if (window.localStorage.getItem("color") != null) {
  colorItem.forEach(function (item) {
    if (
      window
        .getComputedStyle(document.getElementById(item.childNodes[0].id))
        .getPropertyValue("background-image") ==
      window.localStorage.getItem("color")
    ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  colorById = window.localStorage.getItem("color");
  cs.setProperty("--gradient", colorById);
}
// _________________________________________________________
// end of color
// _________________________________________________________
ColorSpan.forEach(function (span) {
  span.addEventListener("click", function () {
    colorItem.forEach(function (item) {
      item.classList.remove("active");
    });
    colorById = window
      .getComputedStyle(document.getElementById(span.id))
      .getPropertyValue("background-image");
    cs.setProperty("--gradient", colorById);
    span.parentElement.classList.add("active");
    colorById = window.localStorage.setItem("color", colorById);
  });
});
// _________________________________________________________
// end of color
// _________________________________________________________
addTaskButton.addEventListener("click", function () {
  if (addTask.value != "") {
    task.innerHTML = `<div class="task" id="task${taskNumber}">
        <div class="taskText">
            <p class="taskP">${addTask.value}</p>
        </div>
        <div class="taskIcons">
            <i class="fa fa-check fa-fw iconCheck"></i>
            <i class="fa fa-trash fa-fw iconTrash"></i>
        </div>    
    </div>`;
    if (taskNumber == null || taskNumber == 0) {
      taskNumber = 1;
    }
    window.localStorage.setItem(`task${taskNumber}`, `${task.innerHTML}`);
    taskes.innerHTML += window.localStorage.getItem(`task${taskNumber}`);
    window.localStorage.setItem("taskNumber", taskNumber);
    taskNumber++;
  } else {
    console.log("error");
  }
});
// _________________________________________________________
// end of add task
// _________________________________________________________
if (window.localStorage.getItem("taskNumber") != null) {
  for (let i = 1; i <= window.localStorage.getItem("taskNumber"); i++) {
    if (window.localStorage.getItem(`task${i}`) != null) {
      taskes.innerHTML += window.localStorage.getItem(`task${i}`);
    }
  }
}
// _________________________________________________________
// end of add task
// _________________________________________________________
let taskesDiv = document.querySelectorAll(".task");
let iconTrash = document.querySelectorAll(".iconTrash");
let iconCheck = document.querySelectorAll(".iconCheck");
iconTrash.forEach(function (icon) {
  icon.addEventListener("click", function () {
    let countCheck = 0;
    for (let i = 1; i <= window.localStorage.getItem("taskNumber"); i++) {
      countCheck++;
    }
    if (
      icon.parentElement.parentElement.id == `task${taskNumber}` ||
      countCheck <= 2
    ) {
      window.localStorage.removeItem(icon.parentElement.parentElement.id);
      icon.parentElement.parentElement.remove();
      taskNumber--;
      if (taskNumber == 0) {
        taskNumber = 1;
      }
      window.localStorage.setItem("taskNumber", taskNumber);
    } else if (icon.parentElement.parentElement.id == `task1`) {
      window.localStorage.removeItem(icon.parentElement.parentElement.id);
      icon.parentElement.parentElement.remove();
      taskNumber--;
      if (taskNumber == 0) {
        taskNumber = 1;
      }
      window.localStorage.setItem("taskNumber", taskNumber);
    } else {
      sweep(icon.parentElement.parentElement.id);
      window.localStorage.removeItem(`task${taskNumber}`);
      icon.parentElement.parentElement.remove();
      taskNumber--;
      if (taskNumber == 0) {
        taskNumber = 1;
      }
      window.localStorage.setItem("taskNumber", taskNumber);
    }
  });
});
// _________________________________________________________
// end of delete task
// _________________________________________________________
function clearAll() {
  window.localStorage.clear();
  taskes.innerHTML = "";
  taskNumber = 1;
}
// _________________________________________________________
// end of clear all
// _________________________________________________________
iconCheck.forEach(function (icon) {
  icon.addEventListener("click", function () {
    if (icon.parentElement.parentElement.classList.contains("done")) {
      icon.parentElement.parentElement.classList.remove("done");
      window.localStorage.setItem(
        icon.parentElement.parentElement.id,
        icon.parentElement.parentElement.outerHTML
      );
    } else {
      icon.parentElement.parentElement.classList.add("done");
      window.localStorage.setItem(
        icon.parentElement.parentElement.id,
        icon.parentElement.parentElement.outerHTML
      );
    }
  });
});
// _________________________________________________________
// end of check task
// _________________________________________________________

function sweep(id) {
  let temp = localStorage.getItem(id);
  localStorage.setItem(
    id,
    localStorage.getItem(`task${taskNumber}`).replace(`task${taskNumber}`, id)
  );
  localStorage.setItem(`task${taskNumber}`, temp);
}

// _________________________________________________________
// end of sweep
// _________________________________________________________
