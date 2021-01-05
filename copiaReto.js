
var score, roundScore, activePlayer, gamePlaying; //Variables globales.

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function () {

    if (gamePlaying) {
    // 1. Establecer el núm random.
    var dice1 = Math.floor(Math.random() * 6) + 1; //dardo en inglés xd
    var dice2 = Math.floor(Math.random() * 6) + 1; //Doble dado, dos resultados de math.random.
    console.log(dice1);
    console.log(dice2);

    // 2. Visualizar el resultado.
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "img/dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "img/dice-" + dice2 + ".png";

    // 3. Actualizar el puntaje del round, si es 1 se reinicia el puntaje.

    /*if (dice === 6 && lastDice === 6) {
        score[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent = "0";
        nextPlayer();
    }*/ 
    if (dice1 !== 1 && dice2 !== 1) {
        //Agregar suma y resultado.
        roundScore += dice1 + dice2;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
        }       
    //lastDice = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    
    if (gamePlaying) {
    score[activePlayer] += roundScore;

    document.getElementById("score-" + activePlayer).textContent = score[activePlayer];

    var input = document.querySelector(".final-score").value;
    var puntajeLimite;

    if (input) { //Input será falso si no tiene un valor en la variable, será verdadero cuando se le ingrese un valor.
        puntajeLimite = input;
    } else {
        puntajeLimite = 50;
    }

    console.log(puntajeLimite);

    if (score[activePlayer] >= puntajeLimite) {
        document.getElementById("name-" + activePlayer).textContent = "Winner";
        document.getElementById("dice-1").style.display = "none";
        document.getElementById("dice-2").style.display = "none";
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

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    //document.querySelector(".dice").style.display = "none"; La misma línea de arriba.
}

document.querySelector(".btn-new").addEventListener("click", init);

function init () {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none"; //Para modificar el Css.

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
