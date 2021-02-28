window.onload = function(){
    const todoContainer = document.getElementById("todo-container");

    let item = {
        value: 0,
        title: "Wash Dish",
        info: "Wash the damn dishes retard",
        status: "" 
    }

    let todoItem = new TodoItem(item);

    todoContainer.appendChild(todoItem.getItem())

    function addTodoItem() {
        let div = document.createElement("div");
        div.setAttribute("class", "box");
        todoContainer.appendChild(div);
    }
};