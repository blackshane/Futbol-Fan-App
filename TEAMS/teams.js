const viewInfoBtns = document.querySelectorAll(".view-info-btn");
const favoriteBtns = document.querySelectorAll(".favorite-btn");

const resetFavorite = function() {
    for (const button of favoriteBtns) {
        if (button.classList.contains("favorited")) {
            button.textContent = "Favorite";
            button.classList.remove("favorited");
        }
    }
}

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

    // Adds click listeners to each team's favorite button
    for (const button of favoriteBtns) {
        // Checks local storage for a fave team and makes it visible for the user
        if (localStorage.getItem("faveID") === button.nextElementSibling.getAttribute("value")) {
            button.textContent = "Favorited";
            button.classList.add("favorited");
        }

        button.addEventListener("click", function() {
            // If team is already favorited, remove the favorite.
            // If team is not favorited, set it to favorited and remove all other favorites
            if (button.classList.contains("favorited")) {
                button.textContent = "Favorite";
                button.classList.remove("favorited");
                localStorage.removeItem("faveID");
            } else {
                resetFavorite();
                button.textContent = "Favorited";
                button.classList.add("favorited");
                localStorage.setItem("faveID", button.nextElementSibling.getAttribute("value")); 
            }
        });
    }
}

initializePage();