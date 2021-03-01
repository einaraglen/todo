window.onload = function(){
    const todoContainer = document.getElementById("todo-container");
    const title = document.getElementById("title");
    const info = document.getElementById("info");
    const error = document.getElementById("error");
    let displayNumber = 2;

    let data = [];

    if(localStorage.getItem("data") === null) {
        localStorage.setItem("data", JSON.stringify(data));
    }
    data = JSON.parse(localStorage.getItem("data"));

    document.addEventListener('click', (e) => {
        if(e.target && e.target.className == 'delete-button') {
            //edit the todoitem with value e.target.value
            data.splice(e.target.id, 1);
            localStorage.setItem("data", JSON.stringify(data));
            rendreItems();
        }

        if(e.target && e.target.className == 'drop-down') {
            let id = e.target.id;
            let value = e.target.value;
            changeStatus(id, value);
        }

        if(e.target && e.target.className == "display-button") {
            if(e.target.value == 0) {
                displayNumber = 1;
                displayButton(0);
            } else {
                displayNumber = 2;
                displayButton(1);
            }
            rendreItems();
        }

        if(e.target && e.target.id == "form-button") {
            if(title.value.replaceAll(/\s/g,'') !== "" && info.value.replaceAll(/\s/g,'') !== "") {
                addToData(title.value, info.value);
            title.value = "";
            info.value = "";
            rendreItems();
            } else {
                error.innerHTML = "Empty Field";
            }
        }
    });

    let prevValue;

    info.addEventListener("keyup", () => {
        if(info.value.length >= 120) {
            info.value = prevValue;
            error.innerHTML = "Max characters : 120";
        } else {
            error.innerHTML = "";
        }
        prevValue = info.value;

    });

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", () => {
        searchFor(searchInput.value);
    });

    function searchFor(key) {
        let result = [];
        data.forEach((item) => {
            if(item.title.toLowerCase().indexOf(key) != -1 || item.info.toLowerCase().indexOf(key) != -1) {
                result.push(item);
            }
        });

        rendre(result);
    }


    displayButton(displayNumber);

    function displayButton(x) {
        if(x == 0) {
            document.getElementById("b1").setAttribute("class", "display-button active");
            document.getElementById("b2").setAttribute("class", "display-button");
        } else {
            displayNumber = 2;
            document.getElementById("b2").setAttribute("class", "display-button active");
            document.getElementById("b1").setAttribute("class", "display-button");
        }
    }

    function changeStatus(id, value) {
        if(value != -1 && data[id].status != value) {
            data[id].status = value;
            rendreItems();
            localStorage.setItem("data", JSON.stringify(data));
        }
    }

    function addToData(title, info) {
        let item = {
            title: title,
            info: info,
            status: -1
        }

        data.push(item);
        localStorage.setItem("data", JSON.stringify(data));
    }

    function rendre(data) {
        while(todoContainer.firstChild) {
            todoContainer.firstChild.remove();
        }
        data.forEach((item, index) => {
            if(item.status != displayNumber) {
                let todoItem = new TodoItem(item, index);
                todoContainer.appendChild(todoItem.getItem());
            }
        });
    }

    function rendreItems() {
        rendre(data);
    }

    rendreItems();
};