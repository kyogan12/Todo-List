import { removeChildNodes, showLocalStorage } from ".";
import { checkIfProjectsExist, x } from "./addNewForm";

export function createTask(name, desc, dueDate) {

    let div = document.createElement("div");
    div.classList.add("divTask");

    let para = document.createElement("p");
    para.classList.add("task");
    para.textContent = name;
    div.appendChild(para);
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key === "projects") {continue};
        let toCreate = (JSON.parse(localStorage[key]));
        if(toCreate.nameValue === name) {
            if(toCreate.completed !== undefined) {
                para.classList.add("completed");
            };
    };
    };
    
    let paraDesc = document.createElement("p");
    paraDesc.textContent = desc;
    paraDesc.classList.add("removeTask", "taskParagraph");
    para.append(paraDesc);

    let paraDate = document.createElement("p");
    paraDate.textContent = `Due date: ${dueDate}`;
    paraDate.classList.add("removeTask", "taskDate");
    para.append(paraDate);

    let divImgCont = document.createElement("div");
    divImgCont.classList.add("divExistingProjects");

    let imgComplete = document.createElement("img");
    imgComplete.classList.add("removeTask");
    imgComplete.src = "../images/check-square.svg";
    //If i check the task as completed, it adds "completed" to that local storage value and it greys out the task
    imgComplete.addEventListener("click", () => {

        para.classList.toggle("completed");

        for(let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);
            if(key === "projects") {continue};
            let toCreate = (JSON.parse(localStorage[key]));
            if(toCreate.nameValue === name) {

                let nameValue = toCreate.nameValue;
                let descValue = toCreate.descValue;
                let dateValue = toCreate.dateValue;
                let projectValue = toCreate.projectValue;
                let completed = "completed";

                if(toCreate.completed !== undefined) {
                    let selectTaskOrProject = {nameValue, descValue, dateValue, projectValue};
                    localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
                } else {
                    let selectTaskOrProject = {nameValue, descValue, dateValue, projectValue, completed};
                    localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
                }
            };
        };
    });

    let imgDelete = document.createElement("img");
    imgDelete.classList.add("removeTask");
    imgDelete.src = "../images/trash.svg";
    //Deletes values when you press the bin
    imgDelete.addEventListener("click", () => {
        removeChildNodes(div);
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if(key === "projects") {continue};
            let toCreate = (JSON.parse(localStorage[key]));
            if(toCreate.nameValue === name) {
                localStorage.removeItem(localStorage.key(i));
            };
        };
    });

    let imgEdit = document.createElement("img");
    imgEdit.classList.add("removeTask", "edit");
    imgEdit.src = "../images/edit.svg";
    let form = document.querySelector(".editTask");
    imgEdit.addEventListener("click", () => {

        document.querySelector(".form").classList.add("removeTask");
        form.classList.toggle("removeTask");
        removeChildNodes(divCont);

        let editX = document.createElement("img");
        editX.src = "../images/x.svg";
        editX.classList.add("x");
        divCont.appendChild(editX);
        editX.addEventListener("click", () => {
            form.classList.toggle("removeTask");
        });

        elemCreate("label", "Edit Task Name: ", "input", name, "editName", "text");
        elemCreate("label", "Edit Task Date: ", "input", dueDate, "editDate", "date");
        elemCreate("label", "Edit Task Description: ", "input", desc, "editDesc", "text");

        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("editBtn");
        editBtn.textContent = "Submit";

        divCont.appendChild(editBtn);
        form.appendChild(divCont);
        editBtnSubmit(name);
    });

    divImgCont.appendChild(imgComplete);
    divImgCont.appendChild(imgEdit);
    divImgCont.appendChild(imgDelete);
    div.appendChild(divImgCont);

    document.querySelector(".tasksMain").appendChild(div);

    para.addEventListener("click", () => {
        paraDesc.classList.toggle("removeTask");
        paraDate.classList.toggle("removeTask");
        para.classList.toggle("taskShowDateAndDesc");
    });

    div.addEventListener("mouseover", () => {
        imgDelete.classList.add("removeTaskShow");
        imgEdit.classList.add("removeTaskShow");
        imgComplete.classList.add("removeTaskShow");
    });

    div.addEventListener("mouseleave", () => {
        imgDelete.classList.remove("removeTaskShow");
        imgEdit.classList.remove("removeTaskShow");
        imgComplete.classList.remove("removeTaskShow");
    });
};

let divCont = document.createElement("div");

function editBtnSubmit(name) {

    let form = document.querySelector(".editTask");
    let editBtn = document.querySelector(".editBtn");
    editBtn.addEventListener("click", () => {

        form.classList.toggle("removeTask");
        let nameValue = document.querySelector(".editName").value;
        let descValue = document.querySelector(".editDesc").value;
        let dateValue = document.querySelector(".editDate").value;
        if(nameValue === "" || nameValue === " " ||  dateValue === "") {
            alert("Please fill out task and date before you submit.");
            return;
        };
        // Taking the values, creating a new form, deleting the old one from storage and checking if theres project value for each one
        for(let i = 0; i < localStorage.length; i++) {
            
            let key = localStorage.key(i);
            if(key === "projects") {continue};

            let toCreate = (JSON.parse(localStorage[key]));
            if(toCreate.nameValue === name) {
                localStorage.removeItem(localStorage.key(i));
            };

            if(toCreate.projectValue !== null) {
                let projectValue = toCreate.projectValue;
                let selectTaskOrProject = {nameValue, descValue, dateValue, projectValue};
                localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
            } else {
                let selectTaskOrProject = {nameValue, descValue, dateValue};
                localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
            }
        };
        createTask(nameValue, descValue, dateValue);
        showLocalStorage();
    });
};

export function elemCreate(ele, eleText, eleTwo, eleTwoText, eleTwoClass, eleTwoType) {
    
    let div = document.createElement("div");
    let elem = document.createElement(ele);
    elem.textContent = eleText;

    let elemTwo = document.createElement(eleTwo);
    elemTwo.placeholder = eleTwoText;
    elemTwo.classList.add(eleTwoClass);
    elemTwo.type = eleTwoType;

    div.classList.add("divMargin");
    div.appendChild(elem);
    div.appendChild(elemTwo);
    divCont.appendChild(div);
};