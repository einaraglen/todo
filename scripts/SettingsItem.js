class SettingsItem {
    constructor(index, text, content) {
        this.content = content;
        this.text = text;
        this.index = index;
    }

    //complete build of the DOM element
    getItem() {
        let item = document.createElement("div");

        //item.appendChild(this.buildContent());
        item.appendChild(this.buildHandle());
        item.appendChild(this.buildContent());

        return item;
    }

    buildHandle() {
        let div = document.createElement("div");
        let icon = document.createElement("img");
        let title = document.createElement("p");

        div.setAttribute("class", "handle");
        div.setAttribute("id", this.index);

        icon.setAttribute("class", "settings-img");
        icon.setAttribute("id", this.index);
        icon.setAttribute("src", "img/icon.png");
        icon.setAttribute("value", "0");

        title.setAttribute("class", "handle-text");
        title.setAttribute("id", this.index);
        title.innerHTML = this.text;

        div.appendChild(icon);
        div.appendChild(title);

        return div;
    }

    buildContent() {
        let div = document.createElement("div");

        div.setAttribute("class", "content");
        
        div.appendChild(this.content);

        return div;
    }

}