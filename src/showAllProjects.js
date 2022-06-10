import { removeChildNodes, confirm } from '.';

const divCont = document.createElement('div');
divCont.classList.add('divContainerRow');

const allProjectsP = document.createElement('p');
allProjectsP.textContent = 'All projects';

function allProjectsPage() {
  const paragraphCont = document.querySelector('.forPara');
  paragraphCont.classList.add('showAllProjectsParagraph');

  paragraphCont.appendChild(allProjectsP);
  document.querySelector('.editTask').classList.add('removeTask');
  document.querySelector('.form').classList.add('removeTask');
  document.querySelector('.addBtn').classList.add('removeTask');
  document.querySelector('.sidebar').classList.add('removeTask');
  document.querySelector('.tasksMain').classList.add('removeTask');

  const prArray = JSON.parse(localStorage.getItem('projects'));
  if (prArray === null || prArray.length === 0) {
    removeChildNodes(paragraphCont);
    const para = document.createElement('p');
    para.textContent = 'You have no created projects.';
    paragraphCont.appendChild(para);
  } else {
    removeChildNodes(divCont);
    for (let i = 0; i < prArray.length; i++) {
      const div = document.createElement('div');
      div.classList.add('allProjects');

      const divForP = document.createElement('div');
      divForP.classList.add('divForP');

      const h3 = document.createElement('h3');
      h3.textContent = prArray[i];

      const trashImg = document.createElement('img');
      trashImg.src = './images/trash.svg';
      trashImg.classList.add('removeTask', 'bin');
      trashImg.addEventListener('click', () => {
        divCont.removeChild(div);
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const toCreate = (JSON.parse(localStorage[key]));

          const index = prArray.indexOf(prArray[i - 1]);
          prArray.splice(index, 1);

          localStorage.setItem('projects', JSON.stringify(prArray));

          if (toCreate.projectValue === h3.textContent) {
            localStorage.removeItem(localStorage.key(i));
          }
        }
      });

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const toCreate = (JSON.parse(localStorage[key]));
        if (toCreate.projectValue === h3.textContent) {
          const taskPara = document.createElement('p');
          taskPara.textContent = toCreate.nameValue;
          divForP.appendChild(taskPara);
        }
      }

      div.appendChild(h3);
      div.appendChild(divForP);
      div.appendChild(trashImg);

      div.addEventListener('mouseenter', () => {
        trashImg.classList.remove('removeTask');
      });

      div.addEventListener('mouseleave', () => {
        trashImg.classList.add('removeTask');
      });

      divCont.appendChild(div);
    }
    document.body.appendChild(divCont);
  }
}

const showAllProjects = document.querySelector('.showAllProjects');
showAllProjects.addEventListener('click', allProjectsPage);
