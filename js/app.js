/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"]

function buildCard(card){
  return `<li class="card" data-card='${card}'><i class="fa ${card}"></i></li>`
}


//Other variables

let score = document.querySelector('.score-panel');

let stars = document.getElementsByClassName('fa-star');
let starParent = document.querySelector('.stars');
let restart = document.querySelector('.restart');
let unmatchedCards = [];
let matchedCards = [];
let moves = 0;
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');
let button = document.querySelector('.button-start');
let timerRunning = false;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
let moveCounter = document.querySelector('.moves');



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
            matchedCards.push(openCards[0]);
            matchedCards.push(openCards[1]);


            openCards = [];
        } else {
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            openCards = [];
          }, 800);
        }
        moveCount();
      }
      starRating()
    }
    winGame();
  });
});

//Restart event listener
restart.addEventListener('click', function(event) {
  window.location.reload(true);
});

//Reset Game
button.addEventListener('click', function(event) {
  if (event.target == button) {
      modal.style.display = "none";
      window.location.reload(true);
  }
});


//Use setInterval for timer in init game, clearInterval to stop
let sec = 0;
let min = 0;

function timer() {
  interval = setInterval(function() {
    sec++;
    second.innerHTML = sec;

    if (sec <= 9) {
      second.innerHTML = '0' + sec;
    }
    if (sec >= 60) {
      min++;
      sec = 0;
      minute.innerHTML = min;

      if (min <= 9) {
        minute.innerHTML = '0' + min;
      } else if (min > 9) {
        minute.innerHTML = min;
      }
    }
  }, 1000);
}

//resetTimer
function resetTime() {
  sec = 0;
  min = 0;
  clearInterval(interval);
  second.innerHTML = '00';
  minute.innerHTML = '00';
}

//Star rating changes
let starOne = document.querySelector('.star-one');
let starTwo = document.querySelector('.star-two');
let starThree = document.querySelector('.star-three');

function starRating(){
  if (moves == 9) {
    starOne.remove();
  } else if (moves == 15) {
    starTwo.remove();
  } else if (moves == 25) {
    starThree.remove();
  }
  }

  //Moves moveCounter
  function moveCount() {
    moves +=1;
    moveCounter.innerHTML = moves;

    if (moves === 1) {
      timer();
    };
  }

  //Define function to win game
function winGame() {
  if (matchedCards.length === 16) {
    winTime = minute.innerHTML + ':' + second.innerHTML;

  //Display Modal
  modal.style.display = 'block';

  //Display star rating
  let rating = document.querySelector('.stars').innerHTML;
  document.getElementById('rating').innerHTML = rating;

  //Display moves
  document.getElementById('moveTotal').innerHTML = moves;

  //Display time
  document.getElementById('totalTime').innerHTML = winTime;
};
}

//Modal script based on code from https://www.w3schools.com/howto/howto_css_modals.asp

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
