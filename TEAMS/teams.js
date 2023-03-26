const viewInfoBtns = document.querySelectorAll(".view-info-btn");

// Code to run on page load
const initializePage = function() {
    // Adds click listeners to each team's info button
    for (const button of viewInfoBtns) {
        button.addEventListener("click", function() {
            // Saves team id number to local storage for team-info.js to access
            localStorage.setItem("teamID", button.getAttribute("value"));
            // Changes file location to boilerplate team-info page
            // Using team-info.js, it is populated with the team's stats and player roster
            location.assign("./team-info.html");
        });
    }
}

initializePage();