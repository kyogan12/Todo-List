import { removeChildNodes, confirm } from ".";

let divCont = document.createElement("div");
divCont.classList.add("divContainerRow");

let allProjectsP = document.createElement("p");
allProjectsP.textContent = "All projects";

export let showAllProjects = document.querySelector(".showAllProjects");
showAllProjects.addEventListener("click", allProjectsPage);
 

function allProjectsPage() {
    let paragraphCont = document.querySelector(".forPara");
    paragraphCont.classList.add("showAllProjectsParagraph");
    
    paragraphCont.appendChild(allProjectsP);
    document.querySelector(".editTask").classList.add("removeTask");
    document.querySelector(".form").classList.add("removeTask");
    document.querySelector(".addBtn").classList.add("removeTask");
    document.querySelector(".sidebar").classList.add("removeTask");
    document.querySelector(".tasksMain").classList.add("removeTask");

    let prArray = JSON.parse(localStorage.getItem("projects"));
    if(prArray === null || prArray.length === 0) {

        removeChildNodes(paragraphCont);
        let para = document.createElement("p");
        para.textContent = "You have no created projects."
        paragraphCont.appendChild(para);
        
    } else {
        //looping through project list and then looping through every task that has project value and showing all of them on the page
        removeChildNodes(divCont);
        for(let i = 0; i < prArray.length; i++) {

            let div = document.createElement("div");
            div.classList.add("allProjects");

            let divForP = document.createElement("div");
            divForP.classList.add("divForP");

            let h3 = document.createElement("h3");
            h3.textContent = prArray[i];

            let trashImg = document.createElement("img");
            trashImg.src = "./images/trash.svg";
            trashImg.classList.add("removeTask", "bin");
            trashImg.addEventListener("click", () => {
                    divCont.removeChild(div);
                    for(let i = 0; i < localStorage.length; i++) {
                        let key = localStorage.key(i);
                        let toCreate = (JSON.parse(localStorage[key]));

                        let index = prArray.indexOf(prArray[i - 1]);
                        prArray.splice(index, 1);
                    
                        localStorage.setItem("projects", JSON.stringify(prArray));

                        if(toCreate.projectValue === h3.textContent) {
                            localStorage.removeItem(localStorage.key(i));
                        };
                    };
                });

            for(let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);
            let toCreate = (JSON.parse(localStorage[key]));
                if(toCreate.projectValue === h3.textContent) {
                    let taskPara = document.createElement("p");
                    taskPara.textContent = toCreate.nameValue;
                    divForP.appendChild(taskPara);
                };
            };

            div.appendChild(h3);
            div.appendChild(divForP);
            div.appendChild(trashImg);

            div.addEventListener("mouseenter", () => {
                trashImg.classList.remove("removeTask");
            });

            div.addEventListener("mouseleave", () => {
                trashImg.classList.add("removeTask");
            });

            
            divCont.appendChild(div);
        };
        document.body.appendChild(divCont);
    };
};
