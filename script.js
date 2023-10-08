const inputitems = document.getElementById("input-items");
const listcontainer = document.getElementById("list-container");
const totalTasksSpan = document.getElementById("at");
const completedTasks = document.getElementById("nct");
const uncompletedTasks = document.getElementById("nuct");


// Function to add a new task
function addTask() {
    if (inputitems.value === "") {
        alert("Enter the Task first:");
    } else {
        const li = document.createElement("li");
        li.textContent = inputitems.value;
        listcontainer.appendChild(li);

        const span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

        const currentTotalTasks = parseInt(totalTasksSpan.textContent);
        totalTasksSpan.textContent = currentTotalTasks + 1;

        const currentUncompletedTasks = parseInt(uncompletedTasks.textContent);
        uncompletedTasks.textContent = currentUncompletedTasks + 1;

        saveData();
    }
    inputitems.value = "";
}

// Function to handle task completion and deletion
listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        const currentCompletedTasks = parseInt(completedTasks.textContent);
        completedTasks.textContent = currentCompletedTasks + 1;

        const currentUncompletedTasks = parseInt(uncompletedTasks.textContent);
        uncompletedTasks.textContent = currentUncompletedTasks - 1;

        saveData();
        updatePercentage();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        const currentUncompletedTasks = parseInt(uncompletedTasks.textContent);
        uncompletedTasks.textContent = currentUncompletedTasks - 1;

        saveData();
        updatePercentage();
    }
});

// Function to save task data to localStorage
function saveData() {
    const dataToSave = {
        listContainerHTML: listcontainer.innerHTML,
        scores: {
            at: totalTasksSpan.innerText,
            nct: completedTasks.innerText,
            nuct: uncompletedTasks.innerText,
        },
    };

    localStorage.setItem("data", JSON.stringify(dataToSave));
}

// Function to show tasks and update percentage
function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        listcontainer.innerHTML = parsedData.listContainerHTML;
        completedTasks.innerText = parsedData.scores.nct;
        uncompletedTasks.innerText = parsedData.scores.nuct;
        totalTasksSpan.innerText = parsedData.scores.at;
        updatePercentage();
    }
}

// Function to clear localStorage
function clearStorage() {
    if (confirm("Do you really want to clear?")) {
        localStorage.clear();
        location.reload();
        showTask(); // Show the updated tasks after clearing
    }
}

// Function to update the percentage and circle
function updatePercentage() {
    const completedTasksCount = parseInt(completedTasks.textContent);
    const totalTasks = parseInt(totalTasksSpan.textContent);
    const percentage = totalTasks === 0 ? 0 : (completedTasksCount / totalTasks) * 100;
    document.getElementById("percentage").textContent = percentage.toFixed(2);

    const circle = document.querySelector("circle");
    const dasharr = (percentage / 100) * 440;
    const offset = ((100 - percentage) / 100) * 440;
    circle.style.strokeDasharray = 440;
    circle.style.strokeDashoffset = offset;
}

// Event listener for adding tasks using the Enter key
inputitems.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Event listener for clearing storage
const clearListButton = document.getElementById("clear-list");
clearListButton.addEventListener("click", clearStorage);

// Show tasks and initialize scrolling behavior when the page loads
document.addEventListener("DOMContentLoaded", function () {
    showTask(); // Show saved tasks and percentage when the page loads

    const scrollingDiv = document.querySelector(".about");

    // Function to handle scroll event
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const targetPosition = 10; // Adjust this value to your desired scroll position

        if (scrollPosition >= targetPosition) {
            scrollingDiv.style.left = "0"; // Move the div to 0% left
        } else {
            scrollingDiv.style.left = "-5000px"; // Reset the div to its initial position
        }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
});
function scrollToTarget(className) {
    const targetElement = document.querySelector(className);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listeners for scrolling to sections
const aboutLink = document.querySelector('a[href=".about"]');
if (aboutLink) {
    aboutLink.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToTarget('.about');
    });
}

const itemsLink = document.querySelector('a[href=".items"]');
if (itemsLink) {
    itemsLink.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToTarget('.items');
    });
}

const contactLink = document.querySelector('a[href=".contact-me"]');
if (contactLink) {
    contactLink.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToTarget('.contact-me');
    });
}