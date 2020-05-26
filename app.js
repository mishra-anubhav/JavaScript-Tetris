document.addEventListener('DOMContentLoaded',() =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay=document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')

    const width =10
    let nextRandom = 0;
    let timerId

//The Tetrominoes
const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0
  //raandom
  let random =Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]
  console.log(theTetrominoes[1])

    //draw the shape
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }
draw()

function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('tetromino')
  })
}
undraw()

//make tetrimino move after every second
//timerId= setInterval(moveDown,1000)

//assign keycode
function control(e){
  if(e.keyCode ===37){
    moveleft()
  }
  else if(e.keyCode ===38){
    rotate()
  }
  else if(e.keyCode ===39){
    moveright()
  }
  else if(e.keyCode ===40){
    //movedown()
  }
}
document.addEventListener('keyup',control)

//move down
function moveDown(){
  undraw()
  currentPosition += width
  draw()
  freeze()
}

//freeze
function freeze(){
  if(current.some(index =>squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    //new tetromino
     random = nextRandom
    nextRandom =Math.floor(Math.random()*theTetrominoes.length)
   

    current = theTetrominoes[random][currentRotation]
  currentPosition=4
  draw()
  displayShape()
  }
}
//move left
function moveleft(){
  undraw()
  const isAtLeftEdge = current.some(index =>(currentPosition + index) % width  === 0)

  if(!isAtLeftEdge)currentPosition-=1

  if(current.some(index => squares[currentPosition+ index].classList.contains('taken'))){
     currentPosition=+1
  }
  draw()
}
function moveright(){
  undraw()
  const isAtRightEdge = current.some(index =>(currentPosition + index + 1) % width  === 0)

  if(!isAtRightEdge)currentPosition+=1

  if(current.some(index => squares[currentPosition+ index].classList.contains('taken'))){
     currentPosition-=1
  }
  draw()
}

function rotate(){
  undraw()
  currentRotation ++
  if(currentRotation == current.length){
      currentRotation =0
  }
  current = theTetrominoes[random][currentRotation]
  draw()
}
//show up-next tetromino in mini-grid
const displaySquares =document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex =0

//The tetrimino
const upNextTetriminoes= [
      [1, displayWidth + 1, displayWidth * 2 + 1, 2],
      [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
      [1, displayWidth, displayWidth + 1, displayWidth + 2],
      [0, 1, displayWidth, displayWidth + 1],
      [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
]

function displayShape(){
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
  })
  upNextTetriminoes[nextRandom].forEach ( index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}

//add function of button
startBtn.addEventListener('click', () => {
  if(timerId){
    clearInterval(timerId)
    timerId = null
  } else{
    draw()
    timerId = setInterval(moveDown, 1000)
    nextRandom = Math.floor(Math.random()*theTetrominoes.length)
    displayShape()
  }
})








})