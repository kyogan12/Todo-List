import { createTask } from './taskCreation';
import { showAllProjects } from './showAllProjects';

export function removeChildNodes(toRemove) {
  while (toRemove.hasChildNodes()) {
    toRemove.removeChild(toRemove.firstChild);
  }
}

// Change arrow and show projects
function changeArrowOnSidebar() {
  const imgArrow = document.querySelector('.toggle');
  if (imgArrow.getAttribute('src') === './images/arrow-bottom.svg') {
    imgArrow.src = './images/arrow-right.svg';
  } else {
    imgArrow.src = './images/arrow-bottom.svg';
  }
  divSidebar.classList.toggle('removeTask');
}

const sidebarArrow = document.getElementById('projectsExpand');
sidebarArrow.addEventListener('click', changeArrowOnSidebar);

const taskMain = document.querySelector('.tasksMain');

// Creates all tasks on page load
export function showLocalStorage() {
  removeChildNodes(taskMain);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === 'projects') { continue; }
    const toCreate = (JSON.parse(localStorage[key]));
    createTask(toCreate.nameValue, toCreate.descValue, toCreate.dateValue);
  }
}

// Shows all tasks on page load
const allTasks = document.querySelector('.showAllTasks');
allTasks.addEventListener('click', () => {
  showLocalStorage();
  allTasks.classList.add('inSidebarClicked');
  const project = document.querySelectorAll('.projectInSidebar');
  project.forEach((para) => para.classList.remove('inSidebarClicked'));
});

// Shows all projects onsidebar
let divSidebar = document.querySelector('.projectsContainer');
export function showProjectsFromStorage() {
  removeChildNodes(divSidebar);
  const prArray = JSON.parse(localStorage.getItem('projects'));
  if (prArray === null) { return; }

  for (let i = 0; i < prArray.length; i++) {
    const para = document.createElement('p');
    para.classList.add('projectInSidebar');
    para.textContent = prArray[i];
    divSidebar.appendChild(para);
  }
}

// Clicking a project in sidebar creates new tasks that belong to that project and shows only them
export function clickProjects() {
  const projects = document.querySelectorAll('.projectInSidebar');
  projects.forEach((project) => project.addEventListener('click', () => {
    projects.forEach((project) => project.classList.remove('inSidebarClicked'));
    project.classList.add('inSidebarClicked');
    allTasks.classList.remove('inSidebarClicked');
    removeChildNodes(taskMain);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'projects') { continue; }

      const toCreate = (JSON.parse(localStorage[key]));
      if (toCreate.projectValue === project.textContent) {
        createTask(toCreate.nameValue, toCreate.descValue, toCreate.dateValue);
      }
    }
  }));
}

window.onload = showLocalStorage();
window.onload = showProjectsFromStorage();
window.onload = clickProjects();
