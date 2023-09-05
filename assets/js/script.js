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
let winCounter=0;//Count the right match

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
      winCounter++
      if(winCounter == 9){
        winScore();
        winCounter=0;
      }
      console.log(winCounter)

    } else {
      console.log("noooooo");
      peersParents[0].style.pointerEvents = "all";
      peersParents[1].style.pointerEvents = "all";
      hideCard(peersParents);
    }
  }, 800);
}