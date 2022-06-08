/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addNewForm.js":
/*!***************************!*\
  !*** ./src/addNewForm.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n/* harmony import */ var _taskCreation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskCreation */ \"./src/taskCreation.js\");\n\r\n\r\n\r\n//Creating the form\r\nlet formDiv = document.querySelector(\".form\");\r\nlet formName = document.createElement(\"select\");\r\nformName.setAttribute(\"id\", \"select\");\r\nformName.addEventListener(\"change\", taskOrProject);\r\n\r\nlet addTask = document.createElement(\"option\");\r\naddTask.setAttribute(\"value\", \"task\");\r\naddTask.textContent = \"Task\";\r\n\r\nlet addProject = document.createElement(\"option\");\r\naddProject.setAttribute(\"value\", \"project\");\r\naddProject.textContent = \"Project\";\r\n\r\nlet addPara = document.createElement(\"p\");\r\naddPara.textContent = \"Add New\";\r\naddPara.classList.add(\"addPara\");\r\n\r\nlet addToExisting = document.createElement(\"select\");\r\naddToExisting.classList.add(\"selectValue\");\r\n\r\nlet addBtn = document.querySelector(\".addBtn\");\r\naddBtn.addEventListener(\"click\", addNew);\r\n\r\nlet divCont = document.createElement(\"div\");\r\n\r\n//Template for creating stuff in the form\r\nfunction createForm(eleOne, eleOneAttr, eleOneSetAttr, eleOneText, eleOneClass, eleTwo, eleTwoInputType, eleTwoClass) {\r\n\r\n    let div = document.createElement(\"div\");\r\n    div.classList.add(\"divName\");\r\n\r\n    let label = document.createElement(eleOne);\r\n    label.setAttribute(eleOneAttr, eleOneSetAttr);\r\n    label.textContent = eleOneText;\r\n    label.classList.add(eleOneClass);\r\n    div.appendChild(label);\r\n\r\n    let input = document.createElement(eleTwo);\r\n    input.type = eleTwoInputType; \r\n    input.classList.add(eleTwoClass);\r\n    div.appendChild(input);\r\n\r\n    divCont.appendChild(div);\r\n    formDiv.appendChild(divCont);\r\n};\r\n\r\nfunction taskOrProject() {\r\n\r\n    if(formName.value === \"task\") {\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.removeChildNodes)(divCont);\r\n        createForm(\"label\", \"for\", \"name\", \"Task Name: \", \"label\", \"input\", \"text\", \"inputValue\");\r\n        createForm(\"label\", \"for\", \"date\", \"Due Date:  \", \"label\", \"input\", \"date\", \"inputValueDate\");\r\n        createForm(\"label\", \"id\", \"labelTxtArea\", \"Description: \");\r\n        let txtForm = document.createElement(\"textarea\");\r\n        divCont.appendChild(txtForm); // cant use the template to make this one\r\n        checkIfProjectsExist();\r\n        createForm(\"button\", \"type\", \"Button\", \"Submit\", \"btnSubmit\");\r\n        btnStuff();\r\n\r\n    } else if(formName.value === \"project\") {\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.removeChildNodes)(divCont);\r\n        createForm(\"label\", \"for\", \"name\", \"Project Name: \", \"label\", \"input\", \"text\", \"inputValue\");\r\n        createForm(\"button\", \"type\", \"Button\", \"Submit\", \"btnSubmitP\");\r\n        btnStuffForProject();\r\n    };\r\n};\r\n\r\nfunction addNew() {\r\n\r\n    (0,___WEBPACK_IMPORTED_MODULE_0__.removeChildNodes)(divCont);\r\n    formDiv.classList.toggle(\"removeTask\");\r\n\r\n    formName.appendChild(addTask);\r\n    formName.appendChild(addProject);\r\n    formDiv.appendChild(addPara);\r\n    formDiv.appendChild(formName);\r\n    taskOrProject();\r\n};\r\n\r\n//Task submit button, creates a new array and stores it as a new value in local storage\r\nfunction btnStuff() {\r\n\r\n    let btnSubmit = document.querySelector(\".btnSubmit\");\r\n    btnSubmit.addEventListener(\"click\", () => {\r\n\r\n        let nameValue = document.querySelector(\".inputValue\").value;\r\n        let descValue = document.querySelector(\".undefined\").value;\r\n        let dateValue = document.querySelector(\".inputValueDate\").value;\r\n        let projectValue = document.querySelector(\".selectValue\").value;\r\n\r\n        if(nameValue === \"\" || nameValue === \" \" ||  dateValue === \"\") {\r\n            alert(\"Please fill out task and date before you submit.\");\r\n            return;\r\n        };\r\n\r\n        formDiv.classList.toggle(\"removeTask\");\r\n\r\n        (0,_taskCreation__WEBPACK_IMPORTED_MODULE_1__.createTask)(nameValue, descValue, dateValue);\r\n\r\n        let formName = {nameValue, descValue, dateValue, projectValue};\r\n        localStorage.setItem(nameValue, JSON.stringify(formName));\r\n    });\r\n};\r\n\r\n//Project submit button, creates a new key for projects value to display on page load\r\nfunction btnStuffForProject() {\r\n\r\n    let btnSubmitP = document.querySelector(\".btnSubmitP\");\r\n    btnSubmitP.addEventListener(\"click\", () => {\r\n\r\n        let nameValue = document.querySelector(\".inputValue\").value;\r\n\r\n        if(nameValue === \"\" || nameValue === \" \") {\r\n            alert(\"Please fill out the project name before you submit.\");\r\n            return;\r\n        };\r\n\r\n        let existingEntries = JSON.parse(localStorage.getItem(\"projects\") || '[]');\r\n        existingEntries.push(nameValue);\r\n        localStorage.setItem(\"projects\", JSON.stringify(existingEntries));\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.showProjectsFromStorage)();\r\n        formDiv.classList.toggle(\"removeTask\");\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.clickProjects)();\r\n    });\r\n};\r\n\r\n\r\n//If projects exist show them on create new task\r\nfunction checkIfProjectsExist() {\r\n\r\n    (0,___WEBPACK_IMPORTED_MODULE_0__.removeChildNodes)(addToExisting);\r\n\r\n    let div = document.createElement(\"div\");\r\n    div.classList.add(\"flexRow\");\r\n\r\n    let prArray = JSON.parse(localStorage.getItem(\"projects\"));\r\n    if(prArray === null) {return};\r\n\r\n    let label = document.createElement(\"label\");\r\n    label.textContent = \"Add to existing project:\"\r\n\r\n    let optionNone = document.createElement(\"option\");\r\n    optionNone.textContent = \"None\";\r\n    addToExisting.appendChild(optionNone);\r\n\r\n    for(let i = 0; i < prArray.length; i++) {\r\n        let option = document.createElement(\"option\");\r\n        option.textContent = prArray[i];\r\n        addToExisting.appendChild(option);\r\n    };\r\n\r\n    div.appendChild(label);\r\n    div.appendChild(addToExisting);\r\n    divCont.appendChild(div);\r\n};\n\n//# sourceURL=webpack://to-do-list/./src/addNewForm.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clickProjects\": () => (/* binding */ clickProjects),\n/* harmony export */   \"removeChildNodes\": () => (/* binding */ removeChildNodes),\n/* harmony export */   \"showProjectsFromStorage\": () => (/* binding */ showProjectsFromStorage)\n/* harmony export */ });\n/* harmony import */ var _taskCreation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskCreation */ \"./src/taskCreation.js\");\n/* harmony import */ var _addNewForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addNewForm */ \"./src/addNewForm.js\");\n\r\n\r\n\r\nfunction removeChildNodes(toRemove) {\r\n    while(toRemove.hasChildNodes()) {\r\n        toRemove.removeChild(toRemove.firstChild);\r\n    };\r\n};\r\n\r\n//change arrow and show projects\r\nfunction changeArrow() {\r\n    let imgArrow = document.querySelector(\".toggle\");\r\n    if(imgArrow.getAttribute(\"src\") == \"../images/arrow-bottom.svg\") {\r\n        imgArrow.src = \"../images/arrow-right.svg\";\r\n    } else {\r\n        imgArrow.src = \"../images/arrow-bottom.svg\";\r\n    };\r\n    let div = document.querySelector(\".inSidebarProjects\");\r\n    div.classList.toggle(\"removeTask\");\r\n};\r\n\r\nlet taskMain = document.querySelector(\".tasksMain\");\r\n\r\n//Creates all tasks on page load\r\nfunction showLocalStorage() {\r\n    removeChildNodes(taskMain);\r\n    for(let i = 0; i < localStorage.length; i++) {\r\n        let key = localStorage.key(i);\r\n        if(key === \"projects\") {continue};\r\n        let toCreate = (JSON.parse(localStorage[key]));\r\n        (0,_taskCreation__WEBPACK_IMPORTED_MODULE_0__.createTask)(toCreate.nameValue, toCreate.descValue, toCreate.dateValue);\r\n    };\r\n};\r\n\r\nlet sidebarArrow = document.getElementById(\"projectsExpand\");\r\nsidebarArrow.addEventListener(\"click\", changeArrow);\r\n\r\nlet allTasks = document.querySelector(\".today\");\r\nallTasks.addEventListener(\"click\", () => {\r\n    showLocalStorage();\r\n    allTasks.classList.add(\"inSidebarClicked\");\r\n    let project = document.querySelectorAll(\".paraInSidebar\");\r\n    project.forEach(para => para.classList.remove(\"inSidebarClicked\"));\r\n});\r\n\r\n//Shows all projects onsidebar\r\nlet divSidebar = document.querySelector(\".inSidebarProjects\");\r\nfunction showProjectsFromStorage() {\r\n    removeChildNodes(divSidebar);\r\n    let prArray = JSON.parse(localStorage.getItem(\"projects\"));\r\n    if(prArray === null) {return};\r\n    for(let i = 0; i < prArray.length; i++) {\r\n        let para = document.createElement(\"p\");\r\n        para.classList.add(\"paraInSidebar\");\r\n        para.textContent = prArray[i];\r\n        divSidebar.appendChild(para);\r\n    };\r\n};\r\n\r\nwindow.onload = showLocalStorage();\r\nwindow.onload = showProjectsFromStorage();\r\nwindow.onload = clickProjects();\r\n\r\n//wtf am i doing literally how does this work LMFAO\r\nfunction clickProjects() {\r\n    \r\n    let project = document.querySelectorAll(\".paraInSidebar\");\r\n    project.forEach(para => para.addEventListener(\"click\", () => {\r\n        project.forEach(para => para.classList.remove(\"inSidebarClicked\"));\r\n        para.classList.add(\"inSidebarClicked\");\r\n        allTasks.classList.remove(\"inSidebarClicked\");\r\n        removeChildNodes(taskMain);\r\n        for(let i = 0; i < localStorage.length; i++) {\r\n            let key = localStorage.key(i);\r\n            if(key === \"projects\") {continue};\r\n            let toCreate = (JSON.parse(localStorage[key]));\r\n            if(toCreate.projectValue === para.textContent) {\r\n                (0,_taskCreation__WEBPACK_IMPORTED_MODULE_0__.createTask)(toCreate.nameValue, toCreate.descValue, toCreate.dateValue);\r\n            };\r\n        };\r\n    }));\r\n};\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/taskCreation.js":
/*!*****************************!*\
  !*** ./src/taskCreation.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createTask\": () => (/* binding */ createTask)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.js\");\n\r\n\r\nfunction createTask(name, desc, dueDate) {\r\n\r\n    let div = document.createElement(\"div\");\r\n    div.classList.add(\"divTask\");\r\n\r\n    let para = document.createElement(\"p\");\r\n    para.classList.add(\"task\");\r\n    para.textContent = name;\r\n    div.appendChild(para);\r\n    \r\n    let paraDesc = document.createElement(\"p\");\r\n    paraDesc.textContent = desc;\r\n    paraDesc.classList.add(\"removeTask\", \"taskParagraph\");\r\n    para.append(paraDesc);\r\n\r\n    let paraDate = document.createElement(\"p\");\r\n    paraDate.textContent = `Due date: ${dueDate}`;\r\n    paraDate.classList.add(\"removeTask\", \"taskDate\");\r\n    para.append(paraDate);\r\n\r\n    let paraDel = document.createElement(\"img\");\r\n    paraDel.classList.add(\"removeTask\", \"toDelete\");\r\n    paraDel.src = \"../images/trash.svg\";\r\n    div.appendChild(paraDel);\r\n\r\n    document.querySelector(\".tasksMain\").appendChild(div);\r\n\r\n    div.addEventListener(\"click\", () => {\r\n        paraDesc.classList.toggle(\"removeTask\");\r\n        paraDate.classList.toggle(\"removeTask\");\r\n        para.classList.toggle(\"taskShowDateAndDesc\");\r\n\r\n    });\r\n\r\n    div.addEventListener(\"mouseover\", () => {\r\n        paraDel.classList.add(\"removeTaskShow\");\r\n    });\r\n\r\n    div.addEventListener(\"mouseleave\", () => {\r\n        paraDel.classList.remove(\"removeTaskShow\");\r\n    });\r\n\r\n    paraDel.addEventListener(\"click\", () => {\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.removeChildNodes)(div);\r\n        for(let i = 0; i < localStorage.length; i++) {\r\n            let key = localStorage.key(i);\r\n            if(key === \"projects\") {continue};\r\n            let toCreate = (JSON.parse(localStorage[key]));\r\n            if(toCreate.nameValue === name) {\r\n                localStorage.removeItem(localStorage.key(i));\r\n            };\r\n        };\r\n    });\r\n};\n\n//# sourceURL=webpack://to-do-list/./src/taskCreation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;