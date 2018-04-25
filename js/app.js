/*
 * Create a list that holds all of your cards
 */

  //creates an array that holds all the stars
let stars = document.querySelectorAll('.stars li');
let starsList = Array.from(stars);
let starsnumber = document.querySelector('.starsnumber');

let moves = document.querySelectorAll('.moves');
let movesList = Array.from(moves);
let movesCount = 0;

let timer = document.querySelector('.time');
let mTime = document.querySelector('.modalTime');
let counter;

const reset = document.querySelector('.reset');

let deck = document.querySelector('.deck');

//creates an array that holds all the cards
let cards = document.querySelectorAll('.card');
let cardsList = Array.from(cards);
//array for the shuffledCards.


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

// adapted Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardsList) {
    let currentIndex = cardsList.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = cardsList[currentIndex];
        cardsList[currentIndex] = cardsList[randomIndex];
        cardsList[randomIndex] = temporaryValue;
      }
      return cardsList;
}

//implements the shuffle function and changes the card layout
function newLayout (){
  shuffle(cardsList); //OBS. the shuffled cards need to be added to the deck
  //empty the deck
  deck.innerHTML = '';
  //loops over each card creates it's HTML and adds it to the deck
  for (let card of cardsList){
      deck.appendChild(card);
    }
};
//by calling the function here, the cards layout is changed every time the app is opened or the gameRestart function relods the page
newLayout();

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


// on click reveals the card checks the numbers of showed cards in order to call cardMatch()
function cardShow() {
    this.classList.add('show');
    showedCardsList.push(this);
    if (this.classList.contains('close') === true){
        this.classList.remove('close');
    }
    //when 2 cards are opened calls cardMatch() function
    if (showedCardsList.length === 2){
       cardMatch();
   }
}

// checks if the showed cards match and acts acording to the situation
function cardMatch() {
    score();
    if (showedCardsList[0].type === showedCardsList[1].type){
        for (let showedCard of showedCardsList) {
            //delays the class change with 1s, so that the cards can be seen
            setTimeout(function(){
                showedCard.classList.replace('show','match');
            },1000);
            matchedCardsList.push(showedCard);
        }
    }else{
        for (let showedCards of showedCardsList) {
            setTimeout(function(){
                showedCards.classList.replace('show', 'close');
            },1000);
        }
    }
    showedCardsList.splice(0,2);
    setTimeout(gameEnd,1500);
}

// verifies if all cards are matched, if true shows a message and restarts the game
function gameEnd(){
    if (matchedCardsList.length === cardsList.length) {
    //stops the timer
    clearInterval(counter,1000);
    modal();
    }
}

/*
* counts the moves and stars
  - increases the moves by 1 each time 2 cards are turned
  - star rating criteria: 3 stars for max 10 moves, 2 stars for 11-15 moves, 1 star for 16-20 moves, no star for more than 20 moves
*/
function score(){
    movesCount ++;
    movesList[0].innerText = movesCount;
    movesList[1].innerText = movesCount;
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
    //the easiest way to reset the game is to reload the page
    location.reload(true);
}

//runs the timer
function timeCount(){
    let sec = 0;
    let min = 0;
    counter = setInterval(function(){
        sec++;
        if (sec === 60){
            min++;
            sec = 0;
        };
        timer.innerText = min +' minutes '+ sec + ' seconds';
        mTime.innerText = min +' minutes '+ sec + ' seconds';
    }, 1000);
    //removes the EventListener so that the function will run only on the first click
    document.querySelector('.deck').removeEventListener('click', timeCount);
};


//implements the modal - adapted source:https://www.w3schools.com/howto/howto_css_modals.asp
function modal() {
    const modal = document.querySelector('.modal');
    const button = document.querySelector('.closeX');
    modal.style.display = "block";
    //when the user clicks on the Restart button, closes the modal and restarts the game
    button.onclick = function() {
        modal.style.display = "none";
        gameRestart();
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
        cardShow.call(this);
    });
}

//starts the timer when the cards deck is clicked
deck.addEventListener('click', timeCount);

//adds EventListener to the restart arrow
reset.addEventListener('click', function (){
    reset.style.transform = "rotate(180deg)";
    reset.style.transition = "transform 0.5s linear";
    gameRestart();
  })
