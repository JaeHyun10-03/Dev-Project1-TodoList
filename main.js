// Project1 : To Do List
// 프로그래머스 데브코스 프론트엔드 3팀 - 임재현

// 날짜 자동 업데이트
function updateDate() {
  let date = new Date(); // 현재 날짜 가져오기
  let calcDays = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
  };
  let year = date.getFullYear();
  let month = `0${date.getMonth() + 1}`.slice(-2);
  let days = `0${date.getDate()}`.slice(-2);
  let yearMonthDay = `${year}/${month}/${days}`;
  let dayOfWeek = date.getDay();
  let $mainDateDays = document.querySelector(".main-date-days");
  let $mainDateYearMonthDay = document.querySelector(
    ".main-date-year-month-day"
  );
  $mainDateDays.textContent = calcDays[dayOfWeek];
  $mainDateYearMonthDay.textContent = yearMonthDay;
}
updateDate();
setInterval(updateDate, 1000); // 1초 마다 날짜를 업데이트함

// 할 일 입력 받아오기
// 할 일 입력값 todo-items에서 출력하기
let $inputAddButton = document.querySelector(".input-add-button");
$inputAddButton.addEventListener("click", () => {
  // input 입력값 받아오기
  let $inputText = document.querySelector(".input-text");
  let text = `${$inputText.value}`;
  $inputText.value = ""; // 입력창 초기화

  // todoItem 태그 복사하기 && 복사한 태그에 입력받은 입력값 대입 && 내용 변경한 태그 todo-items에 삽입
  if (text !== "") {
    const main = document.getElementsByClassName("main-todo-items");
    const todoItem = document.getElementsByClassName("main-todo-item");
    const newTodoItem = todoItem[0].cloneNode(true);
    newTodoItem.childNodes[3].innerText = text; // 복사한 "todo-item"태그에 text를 교체하여 삽입
    newTodoItem.style.display = "flex";
    main[0].appendChild(newTodoItem); // 복사한 노드 붙여넣기
    onClickCheckbox();
    onClickUpdate();
  } else {
    alert("할 일을 작성 후에 추가 버튼을 클릭해주세요");
  }
});

// 체크 눌렀을 때 취소선 & opacity 0.5로 만들기
function onClickCheckbox() {
  let $todoItemCheckbox = document.querySelectorAll(".todo-item-checkbox");
  for (let i = 0; i < $todoItemCheckbox.length; i++) {
    $todoItemCheckbox[i].addEventListener("click", () => {
      if ($todoItemCheckbox[i].nextElementSibling.style.opacity == "0.5") {
        $todoItemCheckbox[i].nextElementSibling.style.textDecoration = "none";
        $todoItemCheckbox[i].nextElementSibling.style.opacity = "1";
      } else {
        $todoItemCheckbox[i].nextElementSibling.style.textDecoration =
          "line-through";
        $todoItemCheckbox[i].nextElementSibling.style.opacity = "0.5";
      }
    });
  }
}
onClickCheckbox();

// 수정 버튼 클릭 시 아이콘 변경 - 완성
// 수정 완료 버튼 클릭 시 todo items에 반영 - 미완성
// 수정 취소 버튼 클릭 시 todo items에 미반영 - 미완성
// 삭제 버튼 클릭 시 todo item 삭제
function onClickUpdate() {
  let $todoItemUpdateButton = document.querySelectorAll(
    ".todo-item-update-button"
  );
  let $todoItemDeleteButton = document.querySelectorAll(
    ".todo-item-delete-button"
  );
  for (let i = 0; i < $todoItemUpdateButton.length; i++) {
    $todoItemUpdateButton[i].addEventListener("click", (e) => {
      let text = "";
      // 해당 내용 수정하도록 인풋 태그 생성 - 미완성
      let $oldTodoItem =
        e.target.parentElement.parentElement.parentElement.childNodes[3];
      let $editInputText = document.createElement("input");
      $editInputText.setAttribute("type", "text");
      $editInputText.setAttribute("value", `${$oldTodoItem.textContent}`);
      e.target.parentElement.parentElement.parentElement.replaceChild(
        $editInputText,
        $oldTodoItem
      );
      if (e.target.textContent === "edit") {
        e.target.textContent = "Check";
        e.target.parentElement.parentElement.lastElementChild.lastElementChild.textContent =
          "Close";
      } else if (e.target.textContent === "Check") {
        e.target.textContent = "edit";
        e.target.parentElement.parentElement.lastElementChild.lastElementChild.textContent =
          "delete";
        const todoItem = document.getElementsByClassName("main-todo-item");
        const newTodoItem = todoItem[0].childNodes[3].cloneNode(false);
        newTodoItem.textContent = $oldTodoItem.value;

        e.target.parentElement.parentElement.parentElement.replaceChild(
          newTodoItem,
          $editInputText
        );
      }
    });
    $todoItemDeleteButton[i].addEventListener("click", (e) => {
      if (e.target.textContent === "delete") {
        e.target.textContent = "Close";
        e.target.parentElement.parentElement.firstElementChild.firstElementChild.textContent =
          "Check";
        e.target.parentElement.parentElement.parentElement.remove();
      } else if (e.target.textContent === "Close") {
        // 수정 취소
        // <div class="todo-item"> 오늘의 할 일(변경 예정) </div>
        let $todoItemInput =
          e.target.parentElement.parentElement.parentElement.childNodes[3];
        let $newTodoItem = document.createElement("div");
        $newTodoItem.classList.add("todo-item");
        $newTodoItem.textContent = $todoItemInput.defaultValue;
        e.target.parentElement.parentElement.parentElement.replaceChild(
          $newTodoItem,
          $todoItemInput
        );

        // 버튼 텍스트 원래대로 돌리기
        e.target.parentElement.parentElement.firstElementChild.firstElementChild.textContent =
          "edit";
        e.target.textContent = "delete";
      }
    });
  }
}
onClickUpdate();
