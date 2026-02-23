const ui = {
    openPopUpBtn:      document.querySelector("#openPopUpBtn"),
    popUp:             document.querySelector("#popUp"),
    form:              document.querySelector("#form"),
    userInput:         document.querySelector("#userInput"),
    addSubredditBtn:   document.querySelector("#addSubredditBtn"),

    subRedditName:     document.querySelector("#subRedditName"),
    redditLanes:       document.querySelector("#redditLanes")
};

let popUpOpen = false;
let kb = [];


ui.form.addEventListener("submit", main)

ui.openPopUpBtn.addEventListener("click", () => {
    popUpOpen = !popUpOpen;

    if (popUpOpen) {
        ui.openPopUpBtn.style.transform = "rotate(-45deg)";
        ui.popUp.classList.remove("pointer-events-none");

        requestAnimationFrame(() => {
            ui.popUp.classList.remove("opacity-0");
            ui.popUp.classList.remove("scale-95");
            ui.popUp.classList.add("opacity-100", "scale-100");
        });
    } else {
        closePopUp();
    }
});

// Close popUp

function closePopUp() {
    ui.openPopUpBtn.style.transform = "rotate(0deg)";
    ui.popUp.classList.remove("opacity-100", "scale-100");
    ui.popUp.classList.add("opacity-0", "scale-95", "pointer-events-none");
}

// Main

function main (e) {
    e.preventDefault();
    popUpOpen = !popUpOpen;
    closePopUp();

    fetchReddit();

    setTimeout(() => {
        ui.userInput.value = "";
    }, 300);
};

// Fetch content

async function fetchReddit () {
    const subreddit = ui.userInput.value;
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    kb = await response.json();

    console.log(kb);
    displayInfo(subreddit);
}

// Subreddit UI

function displayInfo (subredditName) {
    const mainDiv = document.createElement("div");
    mainDiv.className = "w-full sm:w-[26rem] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.85)] sm:p-5";

    const upperDiv = document.createElement("div");
    upperDiv.className = "mb-3 flex w-full items-start justify-between gap-x-2 border-b border-slate-200 pb-3";

    const subRedditName = document.createElement("p");
    subRedditName.className = "text-lg font-semibold tracking-tight text-slate-900";
    subRedditName.textContent = `/r/${subredditName}`;

    const subRedditDelBtn = document.createElement("button");
    subRedditDelBtn.textContent = "Delete Subreddit";
    subRedditDelBtn.className = "shrink-0 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white shadow transition duration-200 hover:bg-slate-800 active:scale-[0.98]";
    subRedditDelBtn.addEventListener("click", () => {
        mainDiv.remove();
    })

    ui.redditLanes.appendChild(mainDiv);
    mainDiv.appendChild(upperDiv);
    upperDiv.appendChild(subRedditName);
    upperDiv.appendChild(subRedditDelBtn);

    kb.data.children.forEach(post => {
        const data = post.data;
        
        const div = document.createElement("div");
        div.className = "mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm sm:p-4";
        
        const title = document.createElement("p");
        title.textContent = data.title;
        title.className = "font-semibold leading-snug text-slate-900";

        const author = document.createElement("p");
        author.textContent = `Author: ${data.author}`;
        author.className = "mt-2 text-sm text-slate-700";

        const ups = document.createElement("p");
        ups.textContent = `Up Votes: ${data.ups}`;
        ups.className = "text-sm text-slate-700";

        const comments = document.createElement("p");
        comments.textContent = `Number of comments: ${data.num_comments}`;
        comments.className = "text-sm text-slate-700";

        const url = document.createElement("a");
        url.href = `https://reddit.com${data.permalink}`;
        url.textContent = "View Post";
        url.target = "_blank";
        url.rel = "noopener noreferrer";
        url.className = "mt-2 inline-flex text-sm font-semibold text-slate-900 hover:text-slate-700 hover:underline";

        mainDiv.appendChild(div);
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(ups);
        div.appendChild(comments);
        div.appendChild(url);
    });
}
