const FORM = document.querySelector('#task-form');
const TASKLIST = document.querySelector('.collection');
const CLEARBTN = document.querySelector('.clear-tasks');
const FILTER = document.querySelector('.filter');
const INPUTLIST = document.querySelector('.task');

loadEvenetListerners();

function loadEvenetListerners() {
    document.addEventListener('DOMContentLoaded', handleGetTasksFromLS);
    FORM.addEventListener('submit', handleFormSubmit);
    TASKLIST.addEventListener('click', handleItemDelete);
    CLEARBTN.addEventListener('click', handleClearTask);
    FILTER.addEventListener('keyup', handlerFilterTask);
}

function handleFormSubmit(e) {
    if (INPUTLIST.value === '') {
        alert('Add a Task');
    } else {
        const LI = document.createElement('li');
        LI.className = "collection-item";
        const TEXTNODE = document.createTextNode(INPUTLIST.value)
        LI.appendChild(TEXTNODE);

        const A = document.createElement('a');
        A.className = "delete-item secondary-content";
        A.setAttribute("href", "#")
        A.innerHTML = '<i class="fa fa-remove"></i>'
        LI.appendChild(A)
        TASKLIST.appendChild(LI)

        storeInLocalStorage(INPUTLIST.value);

        INPUTLIST.value = '';
    }
    e.preventDefault()
}

function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function handleGetTasksFromLS() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach(task => {
        const LI = document.createElement('li');
        LI.className = "collection-item";
        const TEXTNODE = document.createTextNode(task)
        LI.appendChild(TEXTNODE);

        const A = document.createElement('a');
        A.className = "delete-item secondary-content";
        A.setAttribute("href", "#")
        A.innerHTML = '<i class="fa fa-remove"></i>'
        LI.appendChild(A)
        TASKLIST.appendChild(LI)
    })

}


function handleItemDelete(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove()
            const tasks = e.target.parentElement.parentElement.textContent;
            removeItemFromLocaleStoarge(e.target.parentElement.parentElement.textContent)
        }
    }
}

function removeItemFromLocaleStoarge(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.forEach((task, index) => {
        if (taskItem === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function handleClearTask(e) {
    //TASKLIST.innerHTML = "";

    while (TASKLIST.firstChild) {
        TASKLIST.removeChild(TASKLIST.firstChild)
    }
    clearFromLS(TASKLIST)
}

function clearFromLS() {
    localStorage.clear()

}

function handlerFilterTask(e) {
    const TEXT = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        const content = task.textContent.toLowerCase();
        if (!content.includes(TEXT)) {
            task.style.display = "none"
        } else {
            task.style.display = "block"
        }
    })

}