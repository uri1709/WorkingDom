const createTaskBlock = document.querySelector(".create-task-block");
const tasksList = document.querySelector(".tasks-list");
const modalOverlay = document.querySelector(".modal-overlay");

let deleteHtmlTaskItem = null;

let initial = "";

const tasks = [
    {
        id: "1138465078061",
        completed: false,
        text: "Посмотреть новый урок по JavaScript",
    },
    {
        id: "1138465078062",
        completed: false,
        text: "Выполнить тест после урока",
    },
    {
        id: "1138465078063",
        completed: false,
        text: "Выполнить ДЗ после урока",
    },
];

tasks.map((task) =>
    tasksList.insertAdjacentHTML("beforeend", getInnerHTMLTask(task))
);

function getInnerHTMLTask(task) {
    return `<div class="task-item" data-task-id="${task.id}">
                <div class="task-item__main-container">
                    <div class="task-item__main-content">
                        <form class="checkbox-form">
                            <input class="checkbox-form__checkbox" type="checkbox" id="${task.id}">
                            <label for="${task.id}"></label>
                        </form>
                        <span class="task-item__text">
                        ${task.text}
                        </span>
                    </div>
                    <button class="task-item__delete-button default-button delete-button">
                        Удалить
                    </button>
                </div>
            </div>`;
}

createTaskBlock.addEventListener("submit", (event) => {
    event.preventDefault();

    // const textToAdd = event.target.elements.taskName.value; //через target
    const textToAdd = document.querySelector(".create-task-block__input").value; //через querySelector

    let textErr = "";
    if (textToAdd === "") {
        textErr = "Название задачи не должно быть пустым";
    } else if (tasks.find((task) => task.text === textToAdd)) {
        textErr = "Задача с таким названием уже существует.";
    }

    let span = document.querySelector(".error-message-block");
    if (textErr !== "") {
        if (!span) {
            span = document.createElement("span");
            span.classList.add("error-message-block");
            createTaskBlock.appendChild(span);
        }
        span.innerHTML = textErr;
        return;
    } else {
        if (span) {
            span.remove();
        }
    }

    const id = Date.now();

    const task = { id: id, text: textToAdd };
    tasks.push(task);
    tasksList.insertAdjacentHTML("beforeend", getInnerHTMLTask(task));
});

tasksList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        deleteHtmlTaskItem = event.target.closest(".task-item");

        modalOverlay.classList.remove("modal-overlay_hidden");
    }
});

document.querySelector(".delete-modal__cancel-button")
    .addEventListener("click", closeModal);
function closeModal() {
    deleteHtmlTaskItem = null;
    if (!modalOverlay.classList.contains("modal-overlay_hidden")) {
        modalOverlay.classList.add("modal-overlay_hidden");
    }
}

document.querySelector(".delete-modal__confirm-button")
    .addEventListener("click", () => {
        console.log(deleteHtmlTaskItem.getAttribute("data-task-id"));
        const id = deleteHtmlTaskItem.getAttribute("data-task-id");

        const index = tasks.findIndex((task) => task.id === id);
        tasks.splice(index, 1);
        deleteHtmlTaskItem.remove();

        closeModal();
    });

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (key.charCodeAt() === 84) {
        changeTheme();
    }
});

function changeTheme() {

    let body = document.querySelector("body");
    let bodyBackground = body.style.background;
    let taskItems = document.querySelectorAll(".task-item");
    let buttons = document.querySelectorAll("button");

    if (bodyBackground === initial) {
        body.style.background = "#24292E";
        taskItems.forEach((item) => item.style.color = "#ffffff"); 
        buttons.forEach((item) => item.style.border = "1px solid #ffffff"); 
    } else {
        body.style.background = initial;
        taskItems.forEach((item) => item.style.color = initial); 
        buttons.forEach((item) => item.style.border = "none"); 
    }

}
