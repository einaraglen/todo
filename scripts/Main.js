//script is called onload to wait for DOM to be loaded.
window.onload = () => {
    const todoContainer = document.getElementById("todo-container");
    const searchInput = document.getElementById("search-input");
    const title = document.getElementById("title");
    const info = document.getElementById("info");
    const error = document.getElementById("error");

    let displayNumber = 2;
    let prevValue;
    let lastClicked;

    //cookie storage
    let data = [];
    if(localStorage.getItem("data") === null) {
        localStorage.setItem("data", JSON.stringify(data));
    }
    data = JSON.parse(localStorage.getItem("data"));

    //click listening for all dom
    document.addEventListener('click', (e) => {
        //delete item
        if(e.target && e.target.className === 'delete-button') {
            //edit the todoitem with value e.target.value
            data.splice(e.target.id, 1);
            localStorage.setItem("data", JSON.stringify(data));
            rendre(data);
        }

        //change state
        if(e.target && e.target.className === 'drop-down') {
            let id = e.target.id;
            let value = e.target.value;
            changeStatus(id, value);
        }

        //change display
        if(e.target && e.target.className === "display-button") {
            displayNumber = (e.target.value == 0) ? 1 : 2;
            displayButton((e.target.value == 0) ? 0 : 1);
            rendre(data);
        }

        //add item
        if(e.target && e.target.id === "form-button") {
            if(title.value.replaceAll(/\s/g,'') !== "" && info.value.replaceAll(/\s/g,'') !== "") {
                addToData(title.value, info.value);
                title.value = "";
                info.value = "";
                rendre(data);
            } else {
                error.innerHTML = "Empty Field";
            }
        }

        if(e.target && e.target.className === "handle" 
        || e.target.className === "settings-img" 
        || e.target.className === "handle-text") {
            let imgs = Array.from(document.getElementsByClassName("settings-img"));
            let contents = Array.from(document.getElementsByClassName("content"));
            if(lastClicked === e.target.id) {
                let state = parseInt(imgs[parseInt(e.target.id)].value);
                settingsState(imgs[parseInt(e.target.id)], contents[parseInt(e.target.id)], (state == 0) ? 1 : 0);
            } else {
                for(let i = 0; i < imgs.length; i++) {
                    settingsState(imgs[i], contents[i], (i == parseInt(e.target.id)) ? 1 : 0);
                }
            }
            
            lastClicked = e.target.id;
        }
    });

    function settingsState(img, content, state) {
        let degrees = (state != 1) ? 0 : 180;
        let height = (state != 1) ? 0 : 150;
        img.style = "transform: rotate(" + degrees +"deg)";
        content.style = "height: " + height + "px";
        img.value = state;
    }

    //input checking for add form
    info.addEventListener("keyup", () => {
        info.value = (info.value.length >= 120) ? prevValue : info.value;
        error.innerHTML = (info.value.length >= 120) ? "Max characters : 120" : "";
        prevValue = info.value;

    });

    //seach event
    searchInput.addEventListener("keyup", () => {
        searchFor(searchInput.value);
    });

    //search that renders result
    function searchFor(key) {
        let result = [];
        data.forEach((item) => {
            if(item.title.toLowerCase().indexOf(key) != -1 || item.info.toLowerCase().indexOf(key) != -1) {
                result.push(item);
            }
        });

        rendre(result);
    }

    //quick switch for display buttons
    function displayButton(x) {
        document.getElementById("b1").setAttribute("class", (x == 0) ? "display-button active" : "display-button");
        document.getElementById("b2").setAttribute("class", (x != 0) ? "display-button active" : "display-button");
    }

    //function for changing the state of an todoItem when changed on dropdown
    function changeStatus(id, value) {
        if(value != -1 && data[id].status != value) {
            data[id].status = value;
            localStorage.setItem("data", JSON.stringify(data));
            rendre(data);
        }
    }

    //add function re saves the data object to cookies
    function addToData(title, info) {
        let item = {
            title: title,
            info: info,
            status: -1
        }

        data.push(item);
        localStorage.setItem("data", JSON.stringify(data));
    }

    //rendres all the todo items from data object based on the global displayNumber
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

    function buildSettings() {
        for(let i = 0; i < 3; i++) {
            let titles = ["Colors", "Sizing", "Scheme"];
            let content = document.createElement("div");
            let item = new SettingsItem(i, titles[i], content);
            document.getElementById("settings-container").appendChild(item.getItem());
        }
    }

    //initialize site
    displayButton(displayNumber);
    rendre(data);
    buildSettings();
};