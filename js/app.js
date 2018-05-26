/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"]

function buildCard(card){
  return `<li class="card" data-card='${card}'><i class="fa ${card}"></i></li>`
}


//Other variables

let score = document.querySelector('.score-panel');
let rating = document.querySelector('.stars');
let counter = document.querySelector('.moves');
let newGame = document.querySelector('.restart');
let unmatchedCards = [];
let matchedCards = [];
let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Create cards with example from http://htmldog.com/guides/javascript/advanced/creatingelements/
//function createCard(cardClass){
//    document.createElement('ul');
//    ul.setAttribute('class', 'deck');
//    document.ul.appendChild(`<li class="card"><i class='fa ${cardClass}''></i></li>`);
//};

// populate cards in DOM
//function populateCards(){
//    shuffle(cardList.concat(cardList)).forEach(createCard);
//};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//Start game and display shuffled cards
//function startGame() {
//    shuffle(cardList);
//    deck.innerHTML = "";
//    counter.innerHTML = turns;
//    for (let i = 0; i < cardList.length; i++) {
//      cards.setAttribute('class', 'deck');
//      cards.innerHTML += '<i class = "fa '+ cards[i]+'"></i>';
//    }
//    let game = document.getElementsByClassName('card');
//    start = [...game];
//};

//window.onload = startGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function startGame(){
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return buildCard(card);
  });
  deck.innerHTML = cardHTML.join('');
  moves = 0;
}

startGame();

let allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show');

      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            openCards[0].classList.add('open', 'show');
            openCards[1].classList.add('open', 'show');

            openCards = [];
        } else {
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            openCards = [];
          },1000);
        }
      }
      counter +=1;
    }
  });
});
