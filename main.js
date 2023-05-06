/*
유저가 값 입력.
+버튼 누르면 할 일 추가.
delete 버튼 누르면 할 일 삭제.
check 버튼 누르면 할 일 끝나면서 밑줄.
check 버튼 누르면 false -> true
true 면 밑줄, false면 그대로
메뉴 탭을 누르면 언더바 이동.
 */

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
addButton.addEventListener("click", addTask);
for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
function filter(event) {
  mode = event.target.id;
  filterList= [];
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
function addTask() {
  let task = {
    taskContent: taskInput.value,
    isComplete: false,
    id: randomIDGenerate(),
  };
  console.log(task);
  taskList.push(task);
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode=="done") {
    list = filterList;
  } 
  
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
    <div class="task-done">${list[i].taskContent}</div>
    <div>
      <button onclick="toggleComplete('${list[i].id}')">Check</button>
      <button onclick="deleteTask('${list[i].id}')">Delete</button>
    </div>
  </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; //!는 값의 반댓값
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}
function randomIDGenerate() {
  //랜덤 아이디 생성 함수
  return "_" + Math.random().toString(36).substring(2, 9);
}
