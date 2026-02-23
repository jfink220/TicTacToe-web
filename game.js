const board = document.getElementById('board')
const squares = document.getElementsByClassName('square')
const players = ['X','O']
let currentPlayer = players[0]

const endMessage = document.createElement('h2')

const myImage = new Image(100, 200);
myImage.src = "puppypicture.jpeg";

endMessage.textContent = `X's Turn!`
endMessage.style.marginTop = '30px'
endMessage.style.textAlign = 'center'
board.after(endMessage)

let isWon = false;

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0,2,6,8]
]

function checkWin(currentPlayer){
  for(let i=0; i < winning_combinations.length;i++){
    if(winning_combinations[i].length == 4){
      const [a,b,c,d] = winning_combinations[i]
      if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer && squares[d].textContent == currentPlayer){
        isWon = true
        return true
      }
    }
    else if(winning_combinations[i].length == 3){
      const [a,b,c] = winning_combinations[i]
      if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer){
        isWon = true
        return true
      }
    }
    
  }
  return false
}

function checkTie(){
  for(let i=0; i<squares.length; i++){
    if(squares[i].textContent===''){
      return false;
    }
  }
  return true
}

function restartButton(){
  for(let i = 0; i < squares.length; i++){
    squares[i].textContent = ""
  }
  myImage.remove();
  endMessage.textContent = `X's turn!`
  isWon = false
  currentPlayer = players[0]
}

for(let i=0;i < squares.length; i++){
  squares[i].addEventListener('click', () => {
    if(!isWon){
      if(squares[i].textContent !== ''){
        return
      }
      squares[i].textContent = currentPlayer
      if(checkWin(currentPlayer)){
        endMessage.textContent = `Game over! ${currentPlayer} wins!`
        document.body.appendChild(myImage);
        return
      }
      if(checkTie()){
        endMessage.textContent = `Game is tied!`
        return
      }
      currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0]
      if(currentPlayer == players[0]){
        endMessage.textContent = `X's turn!`
      }else{
        endMessage.textContent = `O's turn!`
      }
    }
    
  })
}