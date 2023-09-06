//load the game when the page it's completely load

window.addEventListener("load", createTable);

/**
 * load icons to use in the game
 * create a icons variable to help us.
 */
let icons;
function loadIcons() {
  icons = [
    '<i class="fa-solid fa-gift fa-xl"></i>',
    '<i class="fa-solid fa-hippo fa-xl"></i>',
    '<i class="fa-solid fa-camera-retro fa-xl"></i> ',
    '<i class="fa-brands fa-discord fa-xl"></i>',
    '<i class="fa-solid fa-bicycle fa-xl"></i>',
    '<i class="fa-solid fa-hands-asl-interpreting fa-xl"></i>',
    '<i class="fa-solid fa-republican fa-xl"></i>',
    '<i class="fa-solid fa-truck-ramp-box fa-xl"></i>',
    '<i class="fa-solid fa-wheelchair-move fa-xl"></i>',
  ];
}
/**
 * Generate a  table for the cards in the body
 */
function createTable() {
  loadIcons();
  let gameArea = document.getElementById("game-area");
  let cards = [];

  for (let i = 0; i < 18; i++) {
    cards.push(` 
      <div class="card-area"  >
        <div class="card-zone" onclick="turn(this)" >
          <div class="card back">${icons[0]}</div>
          <div class="card front"><i class="fa-solid fa-bug"></i></div>
        </div>
      </div>`);
    if (i % 2 == 1) {
      icons.splice(0, 1);
    }
    cards.sort(() => Math.random() * (1 - 9) + 1);
  }
  gameArea.innerHTML = cards.join(" ");
}

/**
 * Add event listener for the botton to
 * start the game and user name
 */
let userName = document.getElementById("nameuser");

document.getElementById("start-game").addEventListener("click", function () {
  startGame();
});
userName.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    startGame();
  }
});

/**
 * this fuction have the condition for the game
 * can start correctly,explain the rules, ask for name player
 * and the game can start
 */
function startGame() {
  if (userName.value == "") {
    userName.focus();
  } else {
    createTable();
    closePopUp();
    animationCards();
    timerCountdown();
  }
}

//turn teh cards when the game is initialized

function animationCards() {
  let cardfront = document.querySelectorAll("div.card-zone");
  for (let i = 0; i < cardfront.length; i++) {
    cardfront[i].classList.add("animation");
    console.log("hecho");
  }
}

//close the modal window to start the game
function closePopUp() {
  document.getElementById("name-player").innerText = userName.value;
  let popUp = document.getElementById("pop-up");
  let popUpContainer = document.getElementById("pop-up-container");
  popUp.style.display = "none";
  popUpContainer.style.display = "none";
}

/**
 * This function rotate the
 * card so you can see the image behind
 */

function seeCard(event) {
  if (event.style.transform != "rotateY(180deg)") {
    event.style.transform = "rotateY(180deg)";
  }
}

/**
 * This function Hide the image behind if
 * there are not iqual
 */
function hideCard(peersParents) {
  let cardParent1 = peersParents[0];
  let cardParent2 = peersParents[1];
  cardParent1.style.transform = "rotateY(0deg)";
  cardParent2.style.transform = "rotateY(0deg)";
}
/**
 * This function read the value of the cards
 * and call the  compare function
 */

let peers = [];
let peersParents = [];

function turn(element) {
  let back = element.firstElementChild.innerHTML;
  element.style.pointerEvents = "none";

  peersParents.push(element);
  peers.push(back);
  seeCard(element);

  if (peers.length === 2) {
    compareCards(peers, peersParents);
    peers = [];
    peersParents = [];
    console.log(peers);
  } else {
  }
}

/**
 * comapre betweb tow images
 * and block the right ones
 * so they can't be rotated
 */
let winCounter = 0; //Count the right match

function compareCards(peers, peersParents) {
  setTimeout(() => {
    let card1 = peers[0];
    let card2 = peers[1];

    if (card1 == card2) {
      console.log("yes son iguales");
      let cardParent1 = peersParents[0].firstElementChild;
      let cardParent2 = peersParents[1].firstElementChild;
      cardParent1.style.backgroundColor = "green";
      cardParent2.style.backgroundColor = "green";
      peersParents[0].style.pointerEvents = "none";
      peersParents[1].style.pointerEvents = "none";
      winCounter++;
      if (winCounter == 9) {
        winScore();
        winCounter = 0;
      }
      console.log(winCounter);
    } else {
      console.log("noooooo");
      peersParents[0].style.pointerEvents = "all";
      peersParents[1].style.pointerEvents = "all";
      hideCard(peersParents);
    }
  }, 800);
}

/**
 * this function it a timer
 * when the time  is up
 * you lose the game
 */
let timer;
function timerCountdown() {
  let number = document.querySelector("#timer-container > span").textContent;
   timer = setInterval(() => {
    document.querySelector("#timer-container > span").textContent=number;
    number--;
    if (number < 0) {
      defeatScore();
      youLose();
      document.querySelector("#timer-container > span").textContent="30"
      clearInterval(timer);
    }
  }, 1000);
}


/**
 * this function reestart the game if
 * the player can't finish
 */
document.getElementById("restart-game").addEventListener("click", function () {
  defeatScore();
  clearInterval(timer);
  youLose()
});
/**
 * This funtion restart the ame after winning
 */
document.getElementById("new-game").addEventListener("click", function () {
  document.getElementById("win-pop-up").style.display = "none";
  document.getElementById("win-pop-up").style.transform = "scale(0.5)";
  createTable();
  animationCards();
  timerCountdown()
});

// this function increase the defeats score

function defeatScore() {
  let loseScore = parseInt(document.getElementById("lose").innerText);
  document.getElementById("lose").innerText = ++loseScore;
}

// this funtion increase the wins score
function winScore() {
  let winScore = parseInt(document.getElementById("win").innerText);
  document.getElementById("win").innerText = ++winScore;
  document.getElementById("win-pop-up").style.display = "block";
  clearInterval(timer);
}

//This function will open a pop up window when the timer ended
function youLose() {
  document.getElementById("lose-pop-up").style.display = "block";
  winCounter=0;
}
/**
 * This funtion restart the ame after you lose the game
 * because the timer ended
 */
document.getElementById("try-again").addEventListener("click", function () {
  document.getElementById("lose-pop-up").style.display = "none";
  document.querySelector("#timer-container > span").textContent="30"
  winCounter=0;
  createTable();
  animationCards();
  timerCountdown()
});


