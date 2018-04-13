/*
 * Create a list that holds all of your cards
 */
let stars = document.querySelectorAll('.stars');

let moves = document.querySelector('.moves');
let movesCount = 0;

const restart = document.querySelector('.restart');
const cardsDeck = document.querySelectorAll('.deck li');

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
/*function cardClick(){
    if (showedCardsList.length < 2){
        cardShow();
      } else if (showedCardsList.length === 2) {
        score();
        cardMatch();
      }
}
*/
// reveals the card
function cardShow() {
    evt.target.classList.add('open', 'show');
    openedCardsList.push(this);
    showedCardsList.push(this);
}

// checks if the showed cards match and acts acording to the situation
function cardMatch() {
    if (showedCardsList[0].type === showedCardsList[1].type){
      showedCardsList[0].classList.add('match');
      showedCardsList[1].classList.add('match');
      matchedCardsList.push(showedCardsList[0], showedCardsList[1]);
    }else{
      showedCardsList[0].classList.remove('open', 'show');
      showedCardsList[0].classList.add('close');
      showedCardsList[1].classList.remove('open', 'show');
      showedCardsList[1].classList.add('close');
    };
    showedCardsList.splice(0,2);
    gameEnd();
}

// verifies if all cards are matched, if true shows a message and restarts the game
function gameEnd(){
    if (matchedCardsList.length === cardsList.length) {
    alert("Congratulations you did it!/n You've matched all 16 cards and your score is " + stars + " and " + movesCount + " moves.");
    gameRestart();
  }
}

// counts the moves
function score(){
    movesCount ++;
    moves.innerHTML = movesCount;
}

// restarts the game
function gameRestart(){
    cards.classList.remove('open', 'show', 'match', 'close');
    showedCardsList.splice(0,2);
    matchedCardsList.splice(0,17);
    openedCardsList.splice(0,17);
    shuffle(cardsList);
    movesCount = 0;
}

// adds an eventEventListener for all the cards
cardsDeck.addEventListener('click', function (evt) {
  if (showedCardsList.length < 2){
    cardShow();
  } else if (showedCardsList.length === 2) {
    score();
    cardMatch();
  }
});

//adds EventListener to the restart arrow
restart.addEventListener('click', gameRestart);
