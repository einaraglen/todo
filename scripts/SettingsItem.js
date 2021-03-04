class SettingsItem {
    constructor(index, content) {
        this.content = content;
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

        div.setAttribute("class", "handle");
        div.setAttribute("id", this.index);

        icon.setAttribute("class", "settings-img");
        icon.setAttribute("id", this.index);
        icon.setAttribute("src", "img/icon.png");
        icon.setAttribute("value", "0");

        div.appendChild(icon);

        return div;
    }

    buildContent() {
        let div = document.createElement("div");

        div.setAttribute("class", "content");

        return div;
    }

}