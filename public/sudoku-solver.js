// import { puzzlesAndSolutions } from './puzzle-strings.js';
const textArea = document.getElementById("text-input");
let cells = document.querySelectorAll(".sudoku-input");
let errormsg = document.getElementById("error-msg");
let solveBtn = document.getElementById("solve-button");
let clearBtn = document.getElementById("clear-button");
let regex = /^[0-9.]*$/
let puzzles = []
let solutions = []

document.addEventListener("DOMContentLoaded", () => {
  // Load a simple puzzle into the text area
  textArea.value =
    "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
  textChange();
});


let textChange = () => {
  errormsg.innerText =  ""
  if(regex.test(textArea.value) === false){
   return errormsg.innerText = "Error: Invalid characters"
  }
  if(textArea.value.length != 81){
    errormsg.innerText = "Error: Expected puzzle to be 81characters long."
  }
  let textValue = textArea.value.split("");

  textValue.forEach((value, index) => {
    cells[index].value = value;
  });
  
};
let gridInput = () => {
  let gridText = "";
  cells.forEach((cell) => {
    gridText += cell.value.toString();
  });
  errormsg.innerText = ""
  if(regex.test(gridText) === false){
    return errormsg.innerText = "Error: Invalid characters"
   }
  textArea.value = gridText
};
textArea.oninput = textChange;
cells.forEach((cell) => {
  cell.oninput = gridInput;

  
});
let canPlace = (board, row, col, value) => {
  //check column
  let i
  for(i=0; i<9; i++){
    if(board[i][col] == value){
      return false
    }
  }
  //check Row
  let j 
  for(j = 0; j < 9; j++){
    if(board[row][j] == value){
      return false
    }
  }
  
  //check box placement
  let boxTopRow = parseInt(row / 3) * 3
  let boxLeftColumn =parseInt(col / 3) * 3
  let k
  let l
  for(k = boxTopRow; k < boxTopRow + 3; k++){
    for (l = boxLeftColumn; l < boxLeftColumn + 3; l++){
      if(board[k][l] == value){
        return false
      }
    }
  }
  return true
}
let solveFromCell = (board, row, col) => {
  // console.log("Attempting to solve row" + (row + 1) + ", column " + (col + 1))
  
  if(col == 9){
    col = 0
    row++
  }
  if(row == 9){
    return board
  }
  if(board[row][col] != "."){
    return solveFromCell(board, row, col + 1)
  }
  let i
   for(i = 1; i < 10; i++) {
    let valueToPlace = i.toString()
    // console.log("Trying with " + valueToPlace)
    if(canPlace(board, row, col, valueToPlace)){
      board[row][col] = valueToPlace
      if(solveFromCell(board, row, col + 1) != false){
        return solveFromCell(board, row, col + 1)
      } else {
        board[row][col] = '.'
      }
    }
  }
  //no solution
  return false
}
let generator = (values) => {
  let board = [[], [], [], [], [], [], [], [], []]
  let boardRow = -1
  let i
  for(i = 0; i < values.length; i++){
    if(i % 9 === 0){
      boardRow += 1
    } 
    board[boardRow].push(values[i])
  }
  return board
}

solveBtn.addEventListener("click", () => {
  let textValue = textArea.value.split("");
  let originalBoard = generator(textValue)
  let solution = solveFromCell(originalBoard, 0, 0)
  errormsg.innerText =""
  if(solution === false){
    return errormsg.innerText = "No Solution :("
  }
  let i
  let j
  let solutionString = ''
  for(i = 0; i < solution.length; i++){
    for(j = 0; j < solution[i].length; j++){
      solutionString += solution[i][j].toString()
    }
  }
  textArea.value = solutionString
  textChange()
})
clearBtn.addEventListener("click", () => {
  textArea.value = ""
  cells.forEach((cell) => {
    cell.value = ""
  })
  cells.value = ""
})

try {
  module.exports = {};
} catch (e) {}
