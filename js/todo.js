const toDoForm=document.querySelector("#todo-form");
const toDoInput=document.querySelector("#todo-form input");
const toDoList=document.querySelector("#todo-list");

const TODOS_KEY="todos";

let toDos=[];

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteToDo(event){
    const li=event.target.parentElement;
    toDos=toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    li.remove();
    saveToDos();
}

function paintTodo(newTodo){
    const li=document.createElement("li");
    li.id=newTodo.id;
    const span=document.createElement("span");
    const button=document.createElement("button");
    button.innerText="❌";
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    span.innerText=newTodo.text;
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    if(toDos.length===14){
        alert("Too many toDos!!");
        return
    }
    const newTodo=toDoInput.value;
    toDoInput.value="";
    const newToDoObj={
        text:newTodo,
        id:Date.now()
    }
    toDos.push(newToDoObj);
    paintTodo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);

const getToDos=localStorage.getItem(TODOS_KEY);

if(getToDos!==null){
    const parsedToDos=JSON.parse(getToDos);
    toDos=parsedToDos;
    parsedToDos.forEach(paintTodo);
}

