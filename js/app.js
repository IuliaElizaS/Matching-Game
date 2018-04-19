/*
 * Create a list that holds all of your cards
 */

  //creates an array that holds all the cards
let stars = document.querySelectorAll('.stars');
let starsList = Array.from(stars);
let starsnumber = document.querySelector('.starsnumber');

let moves = document.querySelector('.moves');
let movesCount = 0;

let time = document.querySelector('.time');
let sec = 0;
let min = 0;
let timer = min +'minutes '+ sec + 'seconds';

const reset = document.querySelector('.reset');


//creates an array that holds all the cards
let cards = document.querySelectorAll('.card');
let cardsList = Array.from(cards);

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
    timecount();
    if (showedCardsList.length < 2){
        cardShow.call(this);
    } else if (showedCardsList.length === 2) {
        cardMatch();
    }
}

// reveals the card
function cardShow() {
    this.classList.add('show');
    showedCardsList.push(this);
    if (this.classList.contains('close') === true){
      this.classList.remove('close');
    }
}

// checks if the showed cards match and acts acording to the situation
function cardMatch() {
    score();
    if (showedCardsList[0].type === showedCardsList[1].type){
      for (let showedCard of showedCardsList) {
          showedCard.classList.replace('show','match');
          matchedCardsList.push(showedCard);
      }
    }else{
      for (let showedCards of showedCardsList) {
          showedCards.classList.replace('show', 'close');
      }
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

/*
* counts the moves and stars
  - increases the moves by 1 each time 2 cards are turned
  - star rating criteria: 3 stars for max 10 moves, 2 stars for 11-15 moves, 1 star for 16-20 moves, no star for more than 20 moves
*/
function score(){
    movesCount ++;
    moves.innerHTML = movesCount;
    if (movesCount <= 10){
       starsnumber.innerText = '3';
    } else if (movesCount > 10 && movesCount <= 15) {
        starsList[2].classList.add('hide');
        starsnumber.innerText = '2';
    } else if (movesCount > 15 && movesCount <= 20) {
        starsList[1].classList.add('hide');
        starsnumber.innerText = '1';
    } else if (movesCount > 20) {
        starsList[0].classList.add('hide');
        starsnumber.innerText ='0';
    }
}

// restarts the game
function gameRestart(){
    for (let card of cardsList) {
        card.classList.remove('show', 'match', 'close');
    }
    for (let star of starsList){
        star.classList.remove('hide');
    }
    showedCardsList.splice(0,2);
    matchedCardsList.splice(0,17);
    shuffle(cardsList);
    moves.innerHTML = '0';
    min = 0;
    sec = 0;
    time.innerHTML = timer;
}

//runs the timer
function timecount(){
  setInterval(function(){
    sec++;
    if (sec === 59){
      min++;
      sec = 0;
    };
    time.innerHTML = timer;
  }, 1000);
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

/*
*adds an eventEventListener for click on the cards
- because cardsList is an array, a for loop is needed to iterate through the cards
- the anonymous function inside the EventListener creates a clousure and keeps the 'this' value
- .call() function passes 'this' value to the cardClick function
*/
for (i=0; i< cardsList.length; i++){
    cardsList[i].addEventListener('click', function (){
        cardClick.call(this);
      });
}

//adds EventListener to the restart arrow
reset.addEventListener('click', function (){
    reset.style.transform = "rotate(360deg)";
    reset.style.transition = "transform 0.5s linear";
    gameRestart();
})
