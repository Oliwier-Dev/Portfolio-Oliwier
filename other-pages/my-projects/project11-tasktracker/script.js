const ui = {
    form:       document.querySelector("#form"),
    userInput:  document.querySelector("#userInput"),
    tasks:      document.querySelector("#tasks")
};

ui.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userInput = ui.userInput.value;
    if (userInput != "") {
        createTask();
        ui.userInput.value = "";
    } else {
        alert("Please input something in order to add a task.")
    }
});

function createTask () {
    const userInput = ui.userInput.value;

    const div = document.createElement("div");
    div.classList.add("flex", "items-center", "gap-4", "px-6", "py-2",
        "rounded", "justify-center", "border-b", "border-gray-300",
    "hover:bg-gray-100", "transition-all", "duration-300",
    "min-20-[20rem]", "max-w-md", "max-auto")


    const text = document.createElement("p");
    text.textContent = userInput;

    const checkmark = document.createElement("input");
    checkmark.type = "checkbox"
    
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
`;
    delBtn.classList.add("bg-black", "text-white", "text-600", "px-3", "py-2", "rounded-lg", "transition-transform", "duration-300", "hover:scale-105")


    checkmark.addEventListener("change", doneTask);
    delBtn.addEventListener("click", (e) => {
        const taskDiv = e.currentTarget.parentElement;
        taskDiv.remove();
    })


    ui.tasks.appendChild(div);
    div.appendChild(checkmark);
    div.appendChild(text);
    div.appendChild(delBtn);
};

function doneTask (e) {
    const checkbox = e.target;
    const taskDiv = checkbox.parentElement;
    const text = taskDiv.querySelector("p");

    if (checkbox.checked) {
        text.style.textDecoration  = "line-through";

        ui.tasks.appendChild(taskDiv);
    } else {
        text.style.textDecoration  = "none"
        ui.tasks.prepend(taskDiv)
    }
};
