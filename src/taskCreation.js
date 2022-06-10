import { removeChildNodes, showLocalStorage } from '.';
import { checkIfProjectsExist, x } from './addNewForm';

const divCont = document.createElement('div');

export function elemCreate(ele, eleText, eleTwo, eleTwoText, eleTwoClass, eleTwoType) {
  const div = document.createElement('div');
  const elem = document.createElement(ele);
  elem.textContent = eleText;

  const elemTwo = document.createElement(eleTwo);
  elemTwo.placeholder = eleTwoText;
  elemTwo.classList.add(eleTwoClass);
  elemTwo.type = eleTwoType;

  div.classList.add('divMargin');
  div.appendChild(elem);
  div.appendChild(elemTwo);
  divCont.appendChild(div);
}

function editBtnSubmit(name) {
  const form = document.querySelector('.editTask');
  const editBtn = document.querySelector('.editBtn');
  editBtn.addEventListener('click', () => {
    form.classList.toggle('removeTask');
    const nameValue = document.querySelector('.editName').value;
    const descValue = document.querySelector('.editDesc').value;
    const dateValue = document.querySelector('.editDate').value;
    if (nameValue === '' || nameValue === ' ' || dateValue === '') {
      alert('Please fill out task and date before you submit.');
      return;
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'projects') { continue; }

      const toCreate = (JSON.parse(localStorage[key]));
      if (toCreate.nameValue === name) {
        localStorage.removeItem(localStorage.key(i));
      }

      if (toCreate.projectValue !== null) {
        const { projectValue } = toCreate;
        const selectTaskOrProject = {
          nameValue, descValue, dateValue, projectValue,
        };
        localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
      } else {
        const selectTaskOrProject = { nameValue, descValue, dateValue };
        localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
      }
    }
    createTask(nameValue, descValue, dateValue);
    showLocalStorage();
  });
}

export function createTask(name, desc, dueDate) {
  const div = document.createElement('div');
  div.classList.add('divTask');

  const para = document.createElement('p');
  para.classList.add('task');
  para.textContent = name;
  div.appendChild(para);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === 'projects') { continue; }
    const toCreate = (JSON.parse(localStorage[key]));
    if (toCreate.nameValue === name) {
      if (toCreate.completed !== undefined) {
        para.classList.add('completed');
      }
    }
  }

  const paraDesc = document.createElement('p');
  paraDesc.textContent = desc;
  paraDesc.classList.add('removeTask', 'taskParagraph');
  para.append(paraDesc);

  const paraDate = document.createElement('p');
  paraDate.textContent = `Due date: ${dueDate}`;
  paraDate.classList.add('removeTask', 'taskDate');
  para.append(paraDate);

  const divImgCont = document.createElement('div');
  divImgCont.classList.add('divExistingProjects');

  const imgComplete = document.createElement('img');
  imgComplete.classList.add('removeTask');
  imgComplete.src = './images/check-square.svg';
  imgComplete.addEventListener('click', () => {
    para.classList.toggle('completed');

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'projects') { continue; }
      const toCreate = (JSON.parse(localStorage[key]));
      if (toCreate.nameValue === name) {
        const { nameValue } = toCreate;
        const { descValue } = toCreate;
        const { dateValue } = toCreate;
        const { projectValue } = toCreate;
        const completed = 'completed';

        if (toCreate.completed !== undefined) {
          const selectTaskOrProject = {
            nameValue, descValue, dateValue, projectValue,
          };
          localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
        } else {
          const selectTaskOrProject = {
            nameValue, descValue, dateValue, projectValue, completed,
          };
          localStorage.setItem(nameValue, JSON.stringify(selectTaskOrProject));
        }
      }
    }
  });

  const imgDelete = document.createElement('img');
  imgDelete.classList.add('removeTask');
  imgDelete.src = './images/trash.svg';
  // Deletes values when you press the bin
  imgDelete.addEventListener('click', () => {
    removeChildNodes(div);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === 'projects') { continue; }
      const toCreate = (JSON.parse(localStorage[key]));
      if (toCreate.nameValue === name) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  });

  const imgEdit = document.createElement('img');
  imgEdit.classList.add('removeTask', 'edit');
  imgEdit.src = './images/edit.svg';
  const form = document.querySelector('.editTask');
  imgEdit.addEventListener('click', () => {
    document.querySelector('.form').classList.add('removeTask');
    form.classList.toggle('removeTask');
    removeChildNodes(divCont);

    const editX = document.createElement('img');
    editX.src = './images/x.svg';
    editX.classList.add('x');
    divCont.appendChild(editX);
    editX.addEventListener('click', () => {
      form.classList.toggle('removeTask');
    });

    elemCreate('label', 'Edit Task Name: ', 'input', name, 'editName', 'text');
    elemCreate('label', 'Edit Task Date: ', 'input', dueDate, 'editDate', 'date');
    elemCreate('label', 'Edit Task Description: ', 'input', desc, 'editDesc', 'text');

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.classList.add('editBtn');
    editBtn.textContent = 'Submit';

    divCont.appendChild(editBtn);
    form.appendChild(divCont);
    editBtnSubmit(name);
  });

  divImgCont.appendChild(imgComplete);
  divImgCont.appendChild(imgEdit);
  divImgCont.appendChild(imgDelete);
  div.appendChild(divImgCont);

  document.querySelector('.tasksMain').appendChild(div);

  para.addEventListener('click', () => {
    paraDesc.classList.toggle('removeTask');
    paraDate.classList.toggle('removeTask');
    para.classList.toggle('taskShowDateAndDesc');
  });

  div.addEventListener('mouseover', () => {
    imgDelete.classList.add('removeTaskShow');
    imgEdit.classList.add('removeTaskShow');
    imgComplete.classList.add('removeTaskShow');
  });

  div.addEventListener('mouseleave', () => {
    imgDelete.classList.remove('removeTaskShow');
    imgEdit.classList.remove('removeTaskShow');
    imgComplete.classList.remove('removeTaskShow');
  });
}
