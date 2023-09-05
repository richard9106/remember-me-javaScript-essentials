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

//turn teh cards when the game is initialized

function animationCards() {
  let cardfront = document.querySelectorAll("div.card-zone");
  for (let i = 0; i < cardfront.length; i++) {
    cardfront[i].classList.add("animation");
    console.log("hecho");
  }
}
