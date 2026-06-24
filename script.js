let score = JSON.parse(localStorage.getItem('score')) ||{
        wins: 0,
        loses: 0,
        ties: 0,
      }

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){

  const buttonElement = document.querySelector('.autoplay-button-changing');


  if(!isAutoPlaying){
    intervalId = setInterval(function(){
    const playerMove = pickcomputerMove();
    playGame(playerMove);
  }, 1000);

  isAutoPlaying = true;
  buttonElement.innerHTML = 'Stop Play';
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;

    buttonElement.innerHTML = 'Auto Play';
  }
 
}

function playGame(playerMove){

  const computerMove = pickcomputerMove();

  let result = '';
/* calculating the result */
  if( playerMove == 'scissors'){
    if(computerMove == 'rock'){
      result = 'You lose.';
    }
    else if(computerMove == 'paper'){
      result = 'You win.';
    }
    else if(computerMove == 'scissors'){
      result = 'Tie.'
    }
  }

  if( playerMove == 'rock'){
    if(computerMove == 'rock'){
      result = 'Tie.';
    }
    else if(computerMove == 'paper'){
      result = 'You lose.';
    }
    else if(computerMove == 'scissors'){
      result = 'You win.';
    }
  }

  if( playerMove == 'paper'){
    if(computerMove == 'rock'){
      result = 'You win.';
    }
    else if(computerMove == 'paper'){
      result = 'Tie.';
    }
    else if(computerMove == 'scissors'){
      result = 'You lose.';
    }
  }
/* adding result*/
  if(result == 'You win.'){
    score.wins += 1;
  }
  else if(result == 'You lose.'){
    score.loses += 1;
  }
  else if(result == 'Tie.'){
    score.ties += 1;
  }

  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
  .innerHTML = result;

  document.querySelector('.js-moves').innerHTML
  = `You <img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${playerMove}-emoji.png">
  <img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${computerMove}-emoji.png"> Computer`;

}
/*updating the score in html flie*/
function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}. Loses: ${score.loses}.Ties:${score.ties}`;
}
/* random move from computer */
function pickcomputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber >=0 && randomNumber <1/3){
    computerMove = 'rock';
  }
  else if( randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }
  else if( randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }

  return computerMove;
}