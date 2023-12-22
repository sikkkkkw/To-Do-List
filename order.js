const ul = document.querySelector("ul");
const lists = ul.querySelectorAll("li:not(.dragging)");

lists.forEach((list) => {
  list.addEventListener("dragstart", () => {
    setTimeout(() => list.classList.add("dragging"), 0);
  });
  list.addEventListener("dragend", () => {
    list.classList.remove("dragging");
  });
});

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = ul.querySelector(".dragging");
  const siblings = [...ul.querySelectorAll("li:not(.dragging)")];

  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  ul.insertBefore(draggingItem, nextSibling);
};

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function reSave(newLi) {
  toDos = [];
  newLi.forEach((item) => {
    const text = item.querySelector("span").textContent;
    toDos.push(text);
    saveToDos();
  });
}

ul.addEventListener("dragover", initSortableList);
ul.addEventListener("dragenter", (e) => e.preventDefault());
ul.addEventListener("drop", () => {
  // console.log("로컬스토리지 저장")
  const newLi = document.querySelectorAll("li");
  reSave(newLi);
});
