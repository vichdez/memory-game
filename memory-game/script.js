//*VARIABLES*
//Declarar "board"
const board = document.querySelector('.game-board');
//Declarar "nº movimientos"
const movesCounter = document.getElementById('moves');
//Sonido de carta
const flipSound = new Audio('audio/card-unfold.mp3');
const gameoverSound = new Audio('audio/victory.mp3');

// Ejemplo de 8 cartas duplicadas (4 parejas)
const cards = ['🐱', '🐶', '🐰', '🦊'];
//El operador ... duplica el array para hacer 8 cartas (4 parejas). Luego las mezclamos aleatoriamente con sort
const gameCards = [...cards, ...cards].sort(() => 0.5 - Math.random());


gameCards.forEach((emoji) => {
    //Carta
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
  
    //Cara de la carta
    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = emoji;
  
    //Dorso de la carta
    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = '?';
  
    //Carta con su cara y dorso
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', handleClick);
    board.appendChild(card);
  });
  

//Estas guardan qué dos cartas ha volteado el jugador. 
//Solo se permite tener 2 cartas visibles a la vez.
let first = null;
let second = null;
let matches = 0;
let lockBoard = false;
let moves = 0;

function handleClick(e) {

    const card = e.currentTarget;

  if (lockBoard || card.classList.contains('flipped')) 
    return;

  // reinicia el sonido si se hace clic rápido
  flipSound.currentTime = 0; 
  flipSound.play();        
  card.classList.add('flipped');

  if (!first) {

    first = card;

  } else {
    second = card;

    moves++; 
    movesCounter.textContent = moves;
    //mientras se está evaluando una pareja, bloquea más clics.
    lockBoard = true;

    if (first.dataset.emoji === second.dataset.emoji) {
      first = null;
      second = null;

      matches++;
      lockBoard = false;

        if (matches === cards.length) {
            gameoverSound.currentTime = 0;
            gameoverSound.play(); 
          setTimeout(() => {
            if(moves==4){
                alert('¡Has ganado!\n Nº de intentos: '+ moves +'(¡Sin fallo!)\n ¿Jugar de nuevo?');

            }
            else{
            alert('¡Has ganado!\nNº de intentos: '+ moves +' (min. 4)\n¿Jugar de nuevo?');
            }
            restartGame();
          }, 300);
        }
      
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first = null;
        second = null;
        lockBoard = false;
      }, 1000);
    }
  }
}


/* Si first está vacío, significa que es la primera carta del turno, así que se guarda.

Pero si ya había una (first), esta es la segunda. Entonces:

Si los emojis coinciden → ¡pareja hecha! Se quedan visibles.

Si no coinciden → se esconden otra vez después de 1 segundo con setTimeout.

Y al final, reiniciamos first y second para que empiece un nuevo turno.
*/

//Botón de reinicio
document.getElementById('restart-btn').addEventListener('click', restartGame);

//Restart game
function restartGame() {
    board.innerHTML = '';
    first = null;
    second = null;
    matches = 0;
    lockBoard = false;
    moves = 0;
    movesCounter.textContent = moves;
  
    const shuffledCards = [...cards, ...cards].sort(() => 0.5 - Math.random());
  
    shuffledCards.forEach((emoji) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.emoji = emoji;
  
      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = emoji;
  
      const back = document.createElement('div');
      back.classList.add('back');
      back.textContent = '?';
  
      card.appendChild(front);
      card.appendChild(back);
      card.addEventListener('click', handleClick);
      board.appendChild(card);
    });
  }


