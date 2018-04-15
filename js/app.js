/*
 * Create a list that holds all of your cards
 */
let stars = document.querySelectorAll('.stars');
let starsnumber = document.querySelector('.starsnumber');

let moves = document.querySelector('.moves');
let movesCount = 0;

let time = document.querySelector('.time');

const reset = document.querySelector('.reset');


//creates an array that holds all the cards
let cards = document.querySelectorAll('.card');
let cardsList = Array.from(cards);

//creates an array that holds all the opened cards
let openedCards = document.querySelectorAll('.open');
let openedCardsList = Array.from(openedCards);

//creates an array that holds all the showed cards. Should be max 2 cards
let showedCards = document.querySelectorAll('.show');
let showedCardsList = Array.from(showedCards);

//cretes an array that holds all the matched cards
let matchedCards = document.querySelectorAll('.match');
let matchedCardsList = Array.from(matchedCards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardsList) {
    let currentIndex = cardsList.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardsList[currentIndex];
        cardsList[currentIndex] = cardsList[randomIndex];
        cardsList[randomIndex] = temporaryValue;
    }
    return cardsList;
}

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


// on click checks the numbers of showed cards and runs the proper function
function cardClick(){
    timer();
    if (showedCardsList.length < 2){
      cardShow();
      } else if (showedCardsList.length === 2) {
        score();
        cardMatch();
      }
}

// reveals the card
function cardShow() {
    this.classList.add('open', 'show');
    openedCardsList.push(this);
    showedCardsList.push(this);
}

// checks if the showed cards match and acts acording to the situation
function cardMatch() {
    if (showedCardsList[0].type === showedCardsList[1].type){
      /* initial code ...
      showedCardsList[0].classList.add('match');
      showedCardsList[1].classList.add('match');*/
      for (let showedCards of showedCardsList) {
          showedCards.classList.add('match');
      };
      matchedCardsList.push(showedCardsList[0], showedCardsList[1]);
    }else{
      /* initial code ...
      showedCardsList[0].classList.remove('open', 'show');
      showedCardsList[0].classList.add('close');
      showedCardsList[1].classList.remove('open', 'show');
      showedCardsList[1].classList.add('close');*/
      for (let showedCards of showedCardsList) {
          showedCards.classList.remove('open', 'show');
          showedCards.classList.add('close');
      };
    };
    showedCardsList.splice(0,2);
    gameEnd();
}

// verifies if all cards are matched, if true shows a message and restarts the game
function gameEnd(){
    if (matchedCardsList.length === cardsList.length) {
    modal();
    gameRestart();
  }
}

// counts the moves and stars
function score(){
    movesCount ++;
    moves.innerHTML = movesCount;
    if (movesCount <= 10){
       starsnumber.innerHTML = 3;
    } else if (movesCount > 10 && movesCount <= 15) {
      stars[0].classList.add('hide');
      starsnumber.innerHTML = 2;
    } else if (movesCount > 15 && movesCount <= 20) {
      stars[0].classList.add('hide');
      stars[1].classList.add('hide');
      starsnumber.innerHTML = 1;
    } else if (movesCount > 20) {
      stars[0].classList.add('hide');
      stars[1].classList.add('hide');
      stars[2].classList.add('hide');
      starsnumber.innerHTML = 0;
    }
}

// restarts the game
function gameRestart(){
    cards.classList.remove('open', 'show', 'match', 'close');
    stars.classList.remove('hide');
    showedCardsList.splice(0,2);
    matchedCardsList.splice(0,17);
    openedCardsList.splice(0,17);
    shuffle(cardsList);
    movesCount = 0;
    time.innerHTML = '00:00';
}

//runs the timer
function timer(){
  let sec = 00;
  let min = 00;
  setInterval(function(){
    sec++;
  }, 1000);
  setInterval(function(){
    min++;
  }, 60000);
  time.innerHTML = min +':'+ sec;
}

//implements the modal - adapted source:https://www.w3schools.com/howto/howto_css_modals.asp
function modal() {
    const modal = document.querySelector('.modal');
    const closeX = document.querySelector('.closeX');
    modal.style.display = "block";
    //when the user clicks on (x), closes the modal
    closeX.onclick = function() {
        modal.style.display = "none";
      }
}


// adds an eventEventListener for click on the cards
for (i=0; i< cardsList.length; i++){
    cardsList[i].addEventListener('click', cardClick);
}

//adds EventListener to the restart arrow
reset.addEventListener('click', gameRestart);
