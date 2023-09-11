//load the game when the page it's compvarely load

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
    noClick();
    setTimeout(() => {
      timerCountdown();
    }, 3500);
  }
}
/**
 * This function does not allow the user to click until the cards are hidden.
 */
function noClick() {
  let body = document.querySelector("body");
  body.style = "pointer-events:none";
  setTimeout(() => {
    body.style = "pointer-events:all";
  }, 3500);
}

//turn teh cards when the game is initialized

function animationCards() {
  let cardfront = document.querySelectorAll("div.card-zone");
  for (let i = 0; i < cardfront.length; i++) {
    cardfront[i].classList.add("animation");
  }
}

//close the modal window to start the game
function closePopUp() {
  document.getElementById("name-player").innerText = userName.value;
  let popUpContainer = document.getElementById("pop-up-container");
  popUpContainer.style.display = "none";
}

/**
 * This function read the value of the cards
 * and call the  compare function
 */

let peers = []; //array whit card back face
let peersParents = []; // array whit card container
 
function turn(element) {
  let back = element.firstElementChild.innerHTML;
  element.style.pointerEvents = "none";
  peersParents.push(element);
  peers.push(back);
  seeCard(element)

  if (peers.length === 2) {
    let body = document.querySelector("body");
    body.style = "pointer-events:none";
    setTimeout(() => {
      body.style = "pointer-events:all";
    }, 800);
    compareCards(peers, peersParents);
    peers = [];
    peersParents = [];
  }
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
      let cardParent1 = peersParents[0].firstElementChild;
      let cardParent2 = peersParents[1].firstElementChild;
      cardParent1.style.backgroundColor = "green";
      cardParent2.style.backgroundColor = "green";
      peersParents[0].style.pointerEvents = "none";
      peersParents[1].style.pointerEvents = "none";
      winCounter++;

      if (winCounter == 9) {
        winCounter = 0;
        winScore();
      }
    } else {
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
    document.querySelector("#timer-container > span").textContent = number;
    number--;
    if (number < 0) {
      defeatScore();
      youLose();
      document.querySelector("#timer-container > span").textContent = "30";
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
  youLose();
});
/**
 * This funtion restart the game after winning
 */
document.getElementById("new-game").addEventListener("click", function () {
  document.getElementById("win-pop-up").style.display = "none";
  document.getElementById("win-pop-up").style.transform = "scale(0.5)";
  peers = [];//put the glovals arrays to 0;
  peersParents = [];//put the glovals arrays to 0;
  createTable();
  animationCards();
  noClick();
  setTimeout(() => {
    timerCountdown();
  }, 3500);
});

// this function increase the defeats score

function defeatScore() {
  let loseScore = parseInt(document.getElementById("lose").innerText);
  document.getElementById("lose").innerText = ++loseScore;
}

// this funtion increase the wins score
function winScore() {
  //incrementa el score
  let winScore = parseInt(document.getElementById("win").innerText);
  document.getElementById("win").innerText = ++winScore;
  // show win pop up
  document.getElementById("win-pop-up").style.display = "block";
  document.getElementById("win-pop-up").style.transform = "scale(1)";
  // stop the timer and reset the time
  clearInterval(timer);
  document.querySelector("#timer-container > span").textContent = "30";
  //restar de counter to rotate two cards
}

//This function will open a pop up window when the timer ended
function youLose() {
  document.getElementById("lose-pop-up").style.display = "block";
}
/**
 * This funtion restart the ame after you lose the game
 * because the timer ended
 */
document.getElementById("try-again").addEventListener("click", function () {
  winCounter = 0;//put the gloval counter to 0;
  peers = [];//put the glovals arrays to 0;
  peersParents = [];//put the glovals arrays to 0;
  document.getElementById("lose-pop-up").style.display = "none";
  document.querySelector("#timer-container > span").textContent = "30";
  createTable();
  animationCards();
  noClick();
  setTimeout(() => {
    timerCountdown();
  }, 3500);
});
