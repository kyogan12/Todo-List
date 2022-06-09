import { createTask } from "./taskCreation";
import { showAllProjects } from "./showAllProjects";

export function removeChildNodes(toRemove) {
    while(toRemove.hasChildNodes()) {
        toRemove.removeChild(toRemove.firstChild);
    };
};

let sidebarArrow = document.getElementById("projectsExpand");
sidebarArrow.addEventListener("click", changeArrowOnSidebar);

//Change arrow and show projects
function changeArrowOnSidebar() {
    let imgArrow = document.querySelector(".toggle");
    if(imgArrow.getAttribute("src") === "../images/arrow-bottom.svg") {
        imgArrow.src = "../images/arrow-right.svg";
    } else {
        imgArrow.src = "../images/arrow-bottom.svg";
    };
    divSidebar.classList.toggle("removeTask");
};

let taskMain = document.querySelector(".tasksMain");

//Creates all tasks on page load
export function showLocalStorage() {
    removeChildNodes(taskMain);
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key === "projects") {continue};
        let toCreate = (JSON.parse(localStorage[key]));
        createTask(toCreate.nameValue, toCreate.descValue, toCreate.dateValue);
    };
};

//Shows all tasks on page load
let allTasks = document.querySelector(".showAllTasks");
allTasks.addEventListener("click", () => {
    showLocalStorage();
    allTasks.classList.add("inSidebarClicked");
    let project = document.querySelectorAll(".projectInSidebar");
    project.forEach(para => para.classList.remove("inSidebarClicked"));
});


//Shows all projects onsidebar
let divSidebar = document.querySelector(".projectsContainer");
export function showProjectsFromStorage() {

    removeChildNodes(divSidebar);
    let prArray = JSON.parse(localStorage.getItem("projects"));
    if(prArray === null) {return};

    for(let i = 0; i < prArray.length; i++) {

        let para = document.createElement("p");
        para.classList.add("projectInSidebar");
        para.textContent = prArray[i];
        divSidebar.appendChild(para);
    };
};

//Clicking a project in sidebar creates new tasks that belong to that project and shows only them
export function clickProjects() {
    
    let projects = document.querySelectorAll(".projectInSidebar");
    projects.forEach(project => project.addEventListener("click", () => {
        projects.forEach(project => project.classList.remove("inSidebarClicked"));
        project.classList.add("inSidebarClicked");
        allTasks.classList.remove("inSidebarClicked");
        removeChildNodes(taskMain);

        for(let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);
            if(key === "projects") {continue};

            let toCreate = (JSON.parse(localStorage[key]));
            if(toCreate.projectValue === project.textContent) {
                createTask(toCreate.nameValue, toCreate.descValue, toCreate.dateValue);
            };
        };
    }));
};

window.onload = showLocalStorage();
window.onload = showProjectsFromStorage();
window.onload = clickProjects();