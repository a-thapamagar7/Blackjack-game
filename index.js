let player = {
    name : "Player",
    chips : 1500
}
let removed = false;
let nameadded = false;
let cards = [];
let dcards = [];
let sum = 0;
let dsum = 0;
let hasBlackJack = false;
let isAlive = false;
let hasStay= false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let dsumEl = document.getElementById("dsum");
let cardEl = document.getElementById("cards-el");
let dcardEl = document.getElementById("dcard");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;
let arr = []
looparray()

function looparray(){
    for(let j = 0; j < 4; j++){
        for(let i = 1; i <= 13; i++){
            arr.push(i)
        }
    }
}

function getRandomCard() {
    randomCard = arr[Math.floor( Math.random() * arr.length )];
    if (randomCard == 1) {
        return 11;
    }
    else if (randomCard > 10) {
        return 10;
    }
    else{
        return randomCard;
    }
}

function startGame(){
    let nameEl = document.getElementById("name-el");
    if (nameadded == false && removed == false && nameEl.value.length == 0) { 
         alert("Please enter your name");
         nameadded = true;
    }
    else{
        if ((isAlive == false || hasBlackJack == true || hasStay == true) && player.chips > 0 ){
            hasBlackJack = false
            hasStay = false
            let firstCard = getRandomCard();
            let secondCard = getRandomCard();
            let dfirstCard = getRandomCard();
            let dsecondCard = getRandomCard();
            cards = [firstCard, secondCard];
            dcards = [dfirstCard, dsecondCard];
            if (firstCard == 1 && secondCard + 11 == 21) {
                firstCard = 11
            }
            if(secondCard == 1 && firstCard + 11 == 21){
                secondCard = 11
            }
            sum = firstCard + secondCard;
            if ( (dfirstCard == 1 && dsecondCard + 11 == 21) || 
            (dsecondCard == 1 && dfirstCard + 11 == 21) ){
                firstCard = 11
            }
            dsum = dfirstCard + dsecondCard;
            isAlive = true;
            hasBlackJack = false;
            if(removed == false){
                player.name = nameEl.value;
                nameEl.remove();
                removed = true;
            }
            renderGame();
        } 	
    }
}

function renderGame() {
    cardEl.textContent = "Your Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Your Sum: " + sum;
    dcardEl.textContent = "Dealer Cards: Hidden " + dcards[1];
    dsumEl.textContent = "Dealer Sum: " + "Hidden";
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += 150;
    } else if (sum > 21){
        message = "You're out of the game!";
        player.chips -= 150;
        isAlive = false;
    }
    messageEl.textContent = message;
    playerEl.textContent = player.name + ": $" + player.chips;
}


function newCard(){
    if(isAlive === true && hasBlackJack === false && hasStay == false){
        console.log("Drawing a new card from the deck!")
        let card = getRandomCard();
        cards.push(card)
        if (card == 1 && (sum + 11) == 21){
            card = 11
        }
        sum += card;
        renderGame();
    }
}

function stay() {
    if(isAlive === true && hasBlackJack === false && hasStay == false){
        dcardEl.textContent = "Dealer Cards: " + dcards[0] + " " + dcards[1] + " ";
        dsumEl.textContent = "Dealer Sum: " + dsum;
        while (dsum < 17) {
            let card = getRandomCard();
            dcards.push(card);
            if (card == 1 && sum + 11 == 21){
                card = 11;
            }
            dsum += card;
            dcards.push(card);
            dcardEl.textContent += card + " ";
            dsumEl.textContent = "Dealer Sum: " + dsum;
        }
        if(dsum > sum && dsum < 21) {
            message = "You lose";
            player.chips -= 150;
        }
        else if (dsum > 21) {
            message = "You win the game"
            player.chips += 150;
        }
        else if (dsum === 21) {
            message = "Dealer has got a blackjack. You lose"
            player.chips -= 150;
        }
        else if (sum > dsum) {
            message = "You win the game"
            player.chips += 150;
        }
        else if (sum == dsum) {
            message = "You win the game"
            player.chips += 150;
        }
        messageEl.textContent = message;
        playerEl.textContent = player.name + ": $" + player.chips;
        hasStay = true;
    }
}