import { removeChildNodes } from ".";

export function createTask(name, desc, dueDate) {

    let div = document.createElement("div");
    div.classList.add("divTask");

    let para = document.createElement("p");
    para.classList.add("task");
    para.textContent = name;
    div.appendChild(para);
    
    let paraDesc = document.createElement("p");
    paraDesc.textContent = desc;
    paraDesc.classList.add("removeTask", "taskParagraph");
    para.append(paraDesc);

    let paraDate = document.createElement("p");
    paraDate.textContent = `Due date: ${dueDate}`;
    paraDate.classList.add("removeTask", "taskDate");
    para.append(paraDate);

    let imgDelete = document.createElement("img");
    imgDelete.classList.add("removeTask", "toDelete");
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
    div.appendChild(imgDelete);

    document.querySelector(".tasksMain").appendChild(div);

    div.addEventListener("click", () => {
        paraDesc.classList.toggle("removeTask");
        paraDate.classList.toggle("removeTask");
        para.classList.toggle("taskShowDateAndDesc");
    });

    div.addEventListener("mouseover", () => {
        imgDelete.classList.add("removeTaskShow");
    });

    div.addEventListener("mouseleave", () => {
        imgDelete.classList.remove("removeTaskShow");
    });
};