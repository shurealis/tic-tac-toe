// Select all required elements
const selectBox = document.querySelector(".select-box"),
    selectXBtn = selectBox.querySelector(".playerX"),
    selectOBtn = selectBox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll(".playboard-square"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => { //Once Window loaded
    for (let i = 0; i < allBox.length; i++) { // Add onclick atttribute in all available section's span
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
    }


    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); // Hide select box when player X button clicked
        playBoard.classList.add("show"); // Show playboard
    }

    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); // Hide select box when player O button clicked
        playBoard.classList.add("show"); // Show playboard
        players.setAttribute("class", "players isActive player");
    }
}

let playerXIcon = "fa-solid fa-xmark"; // Class name for fontawesome Cross icon
let playerOIcon = "fa-regular fa-circle"; // Class name for fontawesome Circle icon
let playerSign = "X"; // Default player is X
let runBot = true;

// User click function
function clickedBox(element) {
    // console.log(element);

    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // Add Circle icon tag inside user clicked
        players.classList.add("isActive");
        // Change player sign to 'O'
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // Add Cross icon tag inside user clicked
        players.classList.add("isActive");
        element.setAttribute("id", playerSign);
    }

    selectWinner(); // Call winning function
    playBoard.style.pointerEvents = "none"; // Prevent user to select box after selecting
    element.style.pointerEvents = "none"; // Selected box can't be selected again

    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); // Add random delay time for bot to select box
    // console.log(randomDelayTime);
    setTimeout(() => {
        bot(runBot); // Call bot function
    }, randomDelayTime) // Passing delay
}

// Bot click function
function bot(runBot) {
    if (runBot) { // If the bot is running
        playerSign = "O";
        let array = []; // Create empty array to store unselected box index in this array
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { // If span has no any child element
                array.push(i); // Insert unclick or unselected box inside array
                // console.log(i + " " + "has no children");
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; // Get random index from array so bot will select random box
        // console.log(randomBox);
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // Add Cross icon tag inside user clicked
                players.classList.remove("isActive");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // Add Circle icon tag inside user clicked
                players.classList.remove("isActive");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none"; // Prevent player to override selection
        playBoard.style.pointerEvents = "auto";
        playerSign = "X"; // Pass X value
    }
}

// Selecting the winner
function getClass(idname) {
    return document.querySelector(".box" + idname).id; // return id name
}

function checkClass(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner() { // Check combination for the winner
    if (checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(6, 7, 8, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + "is the winner!");
        // Once match is won, we stop the bot from running
        runBot = false;
        bot(runBot);
        setTimeout(() => { // Delay on showing result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); // 700ms delay

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        // If match is draw
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => { // Delay on showing result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700); // 700ms delay

            wonText.textContent = `Match is Draw!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload(); // reload current page
}