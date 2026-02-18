const ui = {
    history: document.querySelector("#history"),
    form: document.querySelector("#form"),
    userInput: document.querySelector("#userInput"),
    sendMessage: document.querySelector("#sendMessage"),
    useBtn: document.querySelector("#use-btn"),
    helpPopup: document.querySelector("#helpPopup"),
    closeHelpPopup: document.querySelector("#closeHelpPopup")
};

let knowledgeBase = [];
let rankedArrays = [];

fetchJSON();
async function fetchJSON() {
    const response = await fetch("./kb.JSON");
    knowledgeBase = await response.json();
    console.log("KnowledgeBase loaded:", knowledgeBase);
}

ui.form.addEventListener("submit", inputSent);
ui.useBtn.addEventListener("click", openHelpPopup);
ui.closeHelpPopup.addEventListener("click", closeHelpPopup);
ui.helpPopup.addEventListener("click", (event) => {
    if (event.target === ui.helpPopup) {
        closeHelpPopup();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && ui.helpPopup.classList.contains("is-open")) {
        closeHelpPopup();
    }
});

function openHelpPopup() {
    ui.helpPopup.classList.add("is-open");
    ui.helpPopup.setAttribute("aria-hidden", "false");
}

function closeHelpPopup() {
    ui.helpPopup.classList.remove("is-open");
    ui.helpPopup.setAttribute("aria-hidden", "true");
}

function inputSent(e) {
    e.preventDefault();
    document.getElementById("header").style.display = "none";
    const userInputLC = ui.userInput.value.toLowerCase();
    console.log(userInputLC);

    rankedArrays = [];

    for (let i = 0; i < knowledgeBase.length; i++) {
        let count = 0;
        knowledgeBase[i].keywords.forEach((keyword) => {
            const keywordLC = keyword.toLowerCase();
            if (userInputLC.includes(keywordLC)) {
                count++;
            }
        });
        rankedArrays.push({ ...knowledgeBase[i], score: count });
        console.log(rankedArrays);
    }
    rankedArrays.sort((a, b) => b.score - a.score);
    const mostRelevant = rankedArrays.slice(0, 1);
    console.log("The most relevent items were:", mostRelevant);
    renderUserInput();
    renderItems(mostRelevant);

    ui.userInput.value = "";
}

function renderItems(relevantItems) {
    const responseDiv = document.createElement("div");
    responseDiv.className = "aiResponseDiv";
    ui.history.appendChild(responseDiv);
    relevantItems.forEach((item) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "questionDiv";
        const answerDiv = document.createElement("div");
        answerDiv.className = "answerDiv";

        questionDiv.textContent = item.question;
        answerDiv.textContent = item.answer;

        responseDiv.appendChild(questionDiv);
        responseDiv.appendChild(answerDiv);
    });
}

function renderUserInput() {
    const userQuestionDiv = document.createElement("div");
    userQuestionDiv.className = "userQuestionDiv";

    userQuestionDiv.textContent = ui.userInput.value;

    ui.history.appendChild(userQuestionDiv);
}
