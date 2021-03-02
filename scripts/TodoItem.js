class TodoItem {
    constructor(item, value) {
        this.item = item;
        this.value = value;
    }

    //complete build of the DOM element
    getItem() {
        let item = document.createElement("div");
        item.setAttribute("class", "box");
        item.setAttribute("value", this.value);

        item.appendChild(this.buildTitle());
        item.appendChild(this.buildInfo());
        item.appendChild(this.buildStatus());
        item.appendChild(this.buildDelete());

        return item;
    }

    //builds title of element
    buildTitle() {
        let title = document.createElement("div");
        title.setAttribute("class", "title " + "t" + (parseInt(this.item.status) + 1));
        title.innerHTML = this.item.title;
        return title;
    }

    //builds info area of element
    buildInfo() {
        let info = document.createElement("div");
        info.setAttribute("class", "info");
        info.innerHTML = this.item.info;
        return info;
    }

    //sets up the select element based on the data given
    buildStatus() {
        let states = ["Status", "In-Progress", "Done"];
        let status = document.createElement("div");
        let dropDown = document.createElement("select");
        status.setAttribute("class", "status");
        dropDown.setAttribute("class", "drop-down");
        dropDown.setAttribute("id", this.value);

        for(let i = 0; i < states.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = states[i];
            if(i == 0) {
                option.disabled = "disabled";
            }  

            if(i == (parseInt(this.item.status) + 1)) {
                option.selected = "true";
            }

            option.setAttribute("value", i - 1);
            option.setAttribute("id", i - 1);
            dropDown.appendChild(option);
        }

        status.appendChild(dropDown);

        return status;
    }

    //builds the delete buttin with the id that coresponds to the index of the item
    buildDelete() {
        let button = document.createElement("img");
        button.setAttribute("src", "img/delete.png");
        button.setAttribute("class", "delete-button");
        button.setAttribute("id", this.value);

        return button;
    }
}