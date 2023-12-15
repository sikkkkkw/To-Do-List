const ToDoForm=document.querySelector("#todoform");
const ToDoInput =document.querySelector("#todoinput");
const ToDoUl = document.querySelector("#todoul");
let toDos=[];

// 로컬 스토리지에 저장
function saveToDos(){
    localStorage.setItem("todos",JSON.stringify(toDos)); //(키값,배열)
}

function deleteToDo(deevent){
    const deli = deevent.target.parentElement;
    deli.remove();
    // 삭제한 항목을 로컬 스토리지에서도 삭제합니다.
    const updatedToDos = toDos.filter(todo => todo !== deli.querySelector("span").innerText); //필터를 사용해서 스토리지랑 배열을 지움 (삭제 버튼을 클릭했을때 지워움)
    toDos = updatedToDos;
    saveToDos();
}

// 그려주는 함수
function paintToDo(newToDo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.innerText = "❌";
    //삭제
    button.addEventListener("click",deleteToDo);
    // ---------------------
    span.innerText = newToDo;
    li.appendChild(button);
    li.appendChild(span);
    ToDoUl.appendChild(li);

}

function handleToDoSubmit(event){
    event.preventDefault(); //새로고침 막음
    const newToDo = ToDoInput.value
    ToDoInput.value = "";
    // 그려주는 함수
    paintToDo(newToDo);
    // 로컬 스토리지에 저장
    toDos.push(newToDo);
    saveToDos();
}
function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = ToDoInput.value;

    if (newToDo !== "") {  // 빈 문자열인 경우 추가하지 않도록 검사합니다.
        // 그려주는 함수
        paintToDo(newToDo);
        // 로컬 스토리지에 저장
        toDos.push(newToDo);
        saveToDos();
    }
    ToDoInput.value = "";
}
ToDoForm.addEventListener("submit",handleToDoSubmit);
// 로컬 스토리지에 저장된 값 가져오기
const savedToDos = localStorage.getItem("todos");
// 로컬 스토리지에 저장된 값을 콘솔 창에 불러오기
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    console.log(parsedToDos);
    // toDos를 parsedToDos로 업데이트합니다.
    toDos = parsedToDos;
    toDos.forEach(paintToDo);
}
