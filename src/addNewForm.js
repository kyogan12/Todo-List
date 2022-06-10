import { removeChildNodes, showProjectsFromStorage, clickProjects } from '.';
import { createTask } from './taskCreation';

// Creating the form
const form = document.querySelector('.form');
const selectTaskOrProject = document.createElement('select');
selectTaskOrProject.setAttribute('id', 'select');
selectTaskOrProject.addEventListener('change', taskOrProject);

const optionTask = document.createElement('option');
optionTask.setAttribute('value', 'task');
optionTask.textContent = 'Task';

const optionProject = document.createElement('option');
optionProject.setAttribute('value', 'project');
optionProject.textContent = 'Project';

const x = document.createElement('img');
x.src = './images/x.svg';
x.classList.add('x');
x.addEventListener('click', () => {
  form.classList.toggle('removeTask');
});

const addNewText = document.createElement('p');
addNewText.textContent = 'Add New';
addNewText.classList.add('addNewText');

const addToExistingProjects = document.createElement('select');
addToExistingProjects.classList.add('selectValue');

const btnSubmit = document.querySelector('.addBtn');
btnSubmit.addEventListener('click', addNew);

const divCont = document.createElement('div');

// Template for creating stuff in the form
function createEle(
  ele,
  atr,
  val,
  text,
  eclass,
  eleTwo,
  eleTwoInputType,
  eleTwoClass,
  eleTwoText,
) {
  const div = document.createElement('div');
  div.classList.add('divName');

  const element = document.createElement(ele);
  element.setAttribute(atr, val);
  element.textContent = text;
  element.classList.add(eclass);
  div.appendChild(element);

  const elementTwo = document.createElement(eleTwo);
  elementTwo.type = eleTwoInputType;
  elementTwo.classList.add(eleTwoClass);
  elementTwo.textContent = eleTwoText;

  div.appendChild(elementTwo);

  divCont.appendChild(div);
  form.appendChild(divCont);
}

// If projects exist show them on add form
function checkIfProjectsExist() {
  removeChildNodes(addToExistingProjects);
  const div = document.createElement('div');
  div.classList.add('divExistingProjects');

  const existingProjects = JSON.parse(localStorage.getItem('projects'));
  if (existingProjects === null) {
    return;
  }

  const label = document.createElement('label');
  label.textContent = 'Add to existing project:';

  const optionNone = document.createElement('option');
  optionNone.textContent = 'None';
  addToExistingProjects.appendChild(optionNone);

  for (let i = 0; i < existingProjects.length; i++) {
    const option = document.createElement('option');
    option.textContent = existingProjects[i];
    addToExistingProjects.appendChild(option);
  }

  div.appendChild(label);
  div.appendChild(addToExistingProjects);
  divCont.appendChild(div);
}

// Task submit button, creates a new array and stores it as a new value in local storage
export function btnSubmitTask() {
  const btnSubmit = document.querySelector('.btnSubmit');
  btnSubmit.addEventListener('click', () => {
    const nameValue = document.querySelector('.inputValue').value;
    const descValue = document.getElementById('textarea').value;
    const dateValue = document.querySelector('.inputValueDate').value;
    let projectValue;
    if (nameValue === '' || nameValue === ' ' || dateValue === '') {
      alert('Please fill out task and date before you submit.');
      return;
    }
    console.log(descValue);
    form.classList.toggle('removeTask');
    createTask(nameValue, descValue, dateValue);

    if (document.querySelector('.selectValue') !== null) {
      projectValue = document.querySelector('.selectValue').value;
      const setValue = {
        nameValue,
        descValue,
        dateValue,
        projectValue,
      };
      localStorage.setItem(nameValue, JSON.stringify(setValue));
    } else {
      const setValue = { nameValue, descValue, dateValue };
      localStorage.setItem(nameValue, JSON.stringify(setValue));
    }
  });
}

// Project submit button, creates a new key for projects value to display on page load
function btnSubmitProject() {
  const btnSubmitP = document.querySelector('.btnSubmitP');
  btnSubmitP.addEventListener('click', () => {
    const nameValue = document.querySelector('.inputValue').value;
    if (nameValue === '' || nameValue === ' ') {
      alert('Please fill out the project name before you submit.');
      return;
    }
    const existingEntries = JSON.parse(
      localStorage.getItem('projects') || '[]',
    );
    for (let i = 0; i < existingEntries.length; i++) {
      if (nameValue === existingEntries[i]) {
        alert('A project with that name already exists.');
        return;
      }
    }
    existingEntries.push(nameValue);
    localStorage.setItem('projects', JSON.stringify(existingEntries));
    showProjectsFromStorage();
    form.classList.toggle('removeTask');
    clickProjects();
  });
}

// If task is selected, create form for task, if project, create it for project
export function taskOrProject() {
  if (selectTaskOrProject.value === 'task') {
    removeChildNodes(divCont);
    createEle(
      'label',
      'for',
      'name',
      'Task Name: ',
      'label',
      'input',
      'text',
      'inputValue',
    );
    createEle(
      'label',
      'for',
      'date',
      'Due Date:  ',
      'label',
      'input',
      'date',
      'inputValueDate',
    );
    createEle('label', 'id', 'labelTxtArea', 'Description: ');
    const txtForm = document.createElement('textarea');
    txtForm.setAttribute('id', 'textarea');
    divCont.appendChild(txtForm); // cant use the template to make this one
    checkIfProjectsExist();
    createEle('button', 'type', 'Button', 'Submit', 'btnSubmit');
    btnSubmitTask();
  } else if (selectTaskOrProject.value === 'project') {
    removeChildNodes(divCont);
    createEle(
      'label',
      'for',
      'name',
      'Project Name: ',
      'label',
      'input',
      'text',
      'inputValue',
    );
    createEle('button', 'type', 'Button', 'Submit', 'btnSubmitP');
    btnSubmitProject();
  }
}

function addNew() {
  removeChildNodes(divCont);
  document.querySelector('.editTask').classList.add('removeTask');
  form.classList.toggle('removeTask');

  selectTaskOrProject.appendChild(optionTask);
  selectTaskOrProject.appendChild(optionProject);
  form.appendChild(x);
  form.appendChild(addNewText);
  form.appendChild(selectTaskOrProject);
  taskOrProject();
}
