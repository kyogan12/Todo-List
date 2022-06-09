import { removeChildNodes, showProjectsFromStorage, clickProjects } from ".";
import { createTask } from "./taskCreation";

//Creating the form
const form = document.querySelector(".form");
const selectTaskOrProject = document.createElement("select");
selectTaskOrProject.setAttribute("id", "select");
selectTaskOrProject.addEventListener("change", taskOrProject);

const optionTask = document.createElement("option");
optionTask.setAttribute("value", "task");
optionTask.textContent = "Task";

const optionProject = document.createElement("option");
optionProject.setAttribute("value", "project");
optionProject.textContent = "Project";

export const x = document.createElement("img");
x.src = "../images/x.svg";
x.classList.add("x");
x.addEventListener("click", () => {
    form.classList.toggle("removeTask");
});

const addNewText = document.createElement("p");
addNewText.textContent = "Add New";
addNewText.classList.add("addNewText");

const addToExistingProjects = document.createElement("select");
addToExistingProjects.classList.add("selectValue");

const btnSubmit = document.querySelector(".addBtn");
btnSubmit.addEventListener("click", addNew);

const divCont = document.createElement("div");

function addNew() {

    removeChildNodes(divCont);
    document.querySelector(".editTask").classList.add("removeTask");
    form.classList.toggle("removeTask");

    selectTaskOrProject.appendChild(optionTask);
    selectTaskOrProject.appendChild(optionProject);
    form.appendChild(x);
    form.appendChild(addNewText);
    form.appendChild(selectTaskOrProject);
    taskOrProject();
};

//If task is selected, create form for task, if project, create it for project
export function taskOrProject() {

    if(selectTaskOrProject.value === "task") {

        removeChildNodes(divCont);
        createEle("label", "for", "name", "Task Name: ", "label", "input", "text", "inputValue");
        createEle("label", "for", "date", "Due Date:  ", "label", "input", "date", "inputValueDate");
        createEle("label", "id", "labelTxtArea", "Description: ");
        let txtForm = document.createElement("textarea");
        divCont.appendChild(txtForm); // cant use the template to make this one
        checkIfProjectsExist();
        createEle("button", "type", "Button", "Submit", "btnSubmit");
        btnSubmitTask();

    } else if(selectTaskOrProject.value === "project") {

        removeChildNodes(divCont);
        createEle("label", "for", "name", "Project Name: ", "label", "input", "text", "inputValue");
        createEle("button", "type", "Button", "Submit", "btnSubmitP");
        btnSubmitProject();
    };
};

//If projects exist show them on add form
function checkIfProjectsExist() {
    removeChildNodes(addToExistingProjects);
    let div = document.createElement("div");
    div.classList.add("divExistingProjects");

    let existingProjects = JSON.parse(localStorage.getItem("projects"));
    if(existingProjects === null) {return};

    let label = document.createElement("label");
    label.textContent = "Add to existing project:"

    let optionNone = document.createElement("option");
    optionNone.textContent = "None";
    addToExistingProjects.appendChild(optionNone);

    for(let i = 0; i < existingProjects.length; i++) {
        let option = document.createElement("option");
        option.textContent = existingProjects[i];
        addToExistingProjects.appendChild(option);
    };

    div.appendChild(label);
    div.appendChild(addToExistingProjects);
    divCont.appendChild(div);
};

//Task submit button, creates a new array and stores it as a new value in local storage
export function btnSubmitTask() {

    let btnSubmit = document.querySelector(".btnSubmit");
    btnSubmit.addEventListener("click", () => {

        let nameValue = document.querySelector(".inputValue").value;
        let descValue = document.querySelector(".undefined").value;
        let dateValue = document.querySelector(".inputValueDate").value;
        let projectValue;
        if(nameValue === "" || nameValue === " " ||  dateValue === "") {
            alert("Please fill out task and date before you submit.");
            return;
        };

        form.classList.toggle("removeTask");
        createTask(nameValue, descValue, dateValue);

        if(document.querySelector(".selectValue") !== null) {
            projectValue = document.querySelector(".selectValue").value;
            let selectTaskOrProject = {nameValue, descValue, dateValue, projectValue};
            localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
        } else {
            let selectTaskOrProject = {nameValue, descValue, dateValue};
            localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
        };
    });
};

//Project submit button, creates a new key for projects value to display on page load
function btnSubmitProject() {

    let btnSubmitP = document.querySelector(".btnSubmitP");
    btnSubmitP.addEventListener("click", () => {
        let nameValue = document.querySelector(".inputValue").value;
        if(nameValue === "" || nameValue === " ") {
            alert("Please fill out the project name before you submit.");
            return;
        };
        let existingEntries = JSON.parse(localStorage.getItem("projects") || '[]');
        for(let i = 0; i < existingEntries.length; i++) {
            if(nameValue === existingEntries[i]) {
                alert("A project with that name already exists.");
                return
            };
        };
        existingEntries.push(nameValue);
        localStorage.setItem("projects", JSON.stringify(existingEntries));
        showProjectsFromStorage();
        form.classList.toggle("removeTask");
        clickProjects();
    });
};

//Template for creating stuff in the form
export function createEle(ele, eleAttr, eleAttrVal, eleText, eleClass, eleTwo, eleTwoInputType, eleTwoClass, eleTwoText) {

    let div = document.createElement("div");
    div.classList.add("divName");

    let element = document.createElement(ele);
    element.setAttribute(eleAttr, eleAttrVal);
    element.textContent = eleText;
    element.classList.add(eleClass);
    div.appendChild(element);

    let elementTwo = document.createElement(eleTwo);
    elementTwo.type = eleTwoInputType; 
    elementTwo.classList.add(eleTwoClass);
    elementTwo.textContent = eleTwoText;
    div.appendChild(elementTwo);

    divCont.appendChild(div);
    form.appendChild(divCont);
};