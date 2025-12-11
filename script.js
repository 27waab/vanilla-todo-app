const text = document.getElementById("text"),
    addBtn = document.getElementById("add"),
    resultSpace = document.querySelector("ul");

let arr = [];

addBtn.addEventListener("click", () => {addToArr(text)});

function addToArr(item) {
    if (item.value !== "") {
        let obj = {
            text: item.value,
            check: false,
        }
        arr.push(obj);
        item.value = "";
    }
    saveInLocalStorage();
    addInPage();
}

function addInPage() {
    resultSpace.innerHTML = "";
    arr.forEach((e, index) => {
        let li = document.createElement("li");
        let pragraph = document.createElement("p");
        let div = document.createElement("div");
        let checkBtn = document.createElement("button");
        let checkIcon = document.createElement("i");
        let deleteBtn = document.createElement("button");
        let deleteIcon = document.createElement("i");
        let editBtn = document.createElement("button");
        let editIcon = document.createElement("i");
        let content = document.createTextNode(e.text);
        pragraph.appendChild(content);
        checkBtn.className = "hgi hgi-stroke hgi-tick-02";
        deleteBtn.className = "hgi hgi-stroke hgi-delete-03";
        editBtn.className = "hgi hgi-stroke hgi-edit-01";
        checkBtn.appendChild(checkIcon);
        deleteBtn.appendChild(deleteIcon);
        editBtn.appendChild(editIcon);
        checkBtn.id = "check";
        deleteBtn.id = "delete";
        editBtn.id = "edit";
        checkBtn.dataset.selector = index;
        deleteBtn.dataset.selector = index;
        editBtn.dataset.selector = index;
        li.className = e.check ? "check" : "";
        div.appendChild(checkBtn);
        div.appendChild(deleteBtn);
        div.appendChild(editBtn);
        li.appendChild(pragraph);
        li.appendChild(div);
        resultSpace.appendChild(li);
    });
}

function saveInLocalStorage() {
    window.localStorage.setItem("tasks", JSON.stringify(arr));
}

function showInPage() {
    let newArr = window.localStorage.getItem("tasks");
    arr = JSON.parse(newArr);
    addInPage();
}

resultSpace.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const name = event.target.id;
        const index = event.target.dataset.selector;
        if (name === "check") {
            if (arr[index].check == false) {
                arr[index].check = true;
            } else {
                arr[index].check = false;
            }
        } else if (name === "edit") {
            let newText = prompt("Enter Your Edit");
            if (newText !== null) {
                arr[index].text = newText;
                arr[index].check = false;
            }
        } else if (name === "delete") {
            arr.splice(index, 1);
        }
    }
    saveInLocalStorage();
    addInPage();
});

showInPage();