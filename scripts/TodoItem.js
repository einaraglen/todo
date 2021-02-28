class TodoItem {
    constructor(item) {
        this.item = item;
    }

    getItem() {
        let item = document.createElement("div");
        item.setAttribute("class", "box");
        item.setAttribute("value", this.item.value);

        item.appendChild(this.buildTitle());
        item.appendChild(this.buildInfo());
        item.appendChild(this.buildStatus());
        item.appendChild(this.buildEdit());

        return item;
    }

    buildTitle() {
        let title = document.createElement("div");
        title.setAttribute("class", "title");
        title.innerHTML = this.item.title;
        return title;
    }

    buildInfo() {
        let info = document.createElement("div");
        info.setAttribute("class", "info");
        info.innerHTML = this.item.info;
        return info;
    }

    buildStatus() {
        let states = ["Select Status", "Doing", "Done"];
        let status = document.createElement("div");
        let dropDown = document.createElement("select");
        status.setAttribute("class", "status")
        dropDown.setAttribute("class", "drop-down")

        for(let i = 0; i < states.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = states[i];
            if(i == 0) {
                option.setAttribute("value", "");
                option.disabled;
                option.selected;
            }
            option.setAttribute("value", i - 1);

            dropDown.appendChild(option);
        }

        status.appendChild(dropDown);

        return status;
    }

    buildEdit() {
        let button = document.createElement("button");
        button.setAttribute("class", "edit-button");
        button.setAttribute("value", this.item.value);
        button.innerHTML = "Edit";

        return button;
    }
}