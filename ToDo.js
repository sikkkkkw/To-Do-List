const ToDoForm=document.querySelector("#todoform");
const ToDoInput =document.querySelector("#todoinput");
const ToDoUl = document.querySelector("#todoul");
let toDos=[];

// 로컬 스토리지에 저장
function saveToDos(){
    localStorage.setItem("todos",JSON.stringify(toDos)); //(키값,배열)
}

// 삭제
function deleteToDo(deevent){
    // 삭제할 타겟설정
    const deli = deevent.target.parentElement
    deli.remove();
}

// 그려주는 함수
function paintToDo(newToDo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.innerText = "💢";
    //삭제
    button.addEventListener("click",deleteToDo)
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
ToDoForm.addEventListener("submit",handleToDoSubmit);
// 로컬 스토리지에 저장된 값 가져오기
const savedToDos = localStorage.getItem("todos");
// 로컬 스토리지에 저장된 값을 콘솔 창에 불러오기
if(saveToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    console.log(parsedToDos);
    // --------------------------- 
    toDos = parsedToDos;
    toDos.forEach(paintToDo);
}
