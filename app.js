/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying; //Variables globales.

init();

document.querySelector(".btn-roll").addEventListener("click", function () {

    if (gamePlaying) {
    // 1. Establecer el núm random.
    var dice = Math.floor(Math.random() * 6) + 1; //dardo en inglés xd
    console.log(dice);

    // 2. Visualizar el resultado.
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "img/dice-" + dice + ".png";

    // 3. Actualizar el puntaje del round, si es 1 se reinicia el puntaje.

    if (dice !== 1) {
        //Agregar suma y resultado.
        roundScore += dice;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
        }
    }

});

document.querySelector(".btn-hold").addEventListener("click", function () {
    
    if (gamePlaying) {
    score[activePlayer] += roundScore;

    document.getElementById("score-" + activePlayer).textContent = score[activePlayer];

    if (score[activePlayer] >= 20) {
        document.getElementById("name-" + activePlayer).textContent = "Winner";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active"); //Con la classList se refiere a las clases de Css.
        gamePlaying = false;
    } else {
    //Siguiente jugador.
    nextPlayer();
        }
    }
});

function nextPlayer () {
    //Siguiente jugador.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //Operador ternario, en esta ocasión más simple que el if.
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active"); //El toggle sirve para alternar.
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    //document.querySelector(".dice").style.display = "none"; La misma línea de arriba.
}

document.querySelector(".btn-new").addEventListener("click", init);

function init () {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector(".dice").style.display = "none"; //Para modificar el Css.

    document.getElementById("score-0").textContent = "0"; //Ya no se usa el #, porque directamente el Js detecta que es un ID.
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

};


//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//var x = document.querySelector("#score-1").textContent; Para hacer lectura del contenido

//Para poder lanzar dados, el juego tiene que estar en verdadero, al momento de ganar, el juego se pone en falso y por las condiciones
// de if, ya no te dejan llamar al evento, porque el llamado a eventos funciona nada más si el juego está en verdadero.


