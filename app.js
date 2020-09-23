document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  const upButton = document.getElementById('move-up')
  const leftButton = document.getElementById('move-left')
  const rightButton = document.getElementById('move-right')
  const downButton = document.getElementById('move-down')
  const width = 4
  let squares = []
  let score = 0

  // create a playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }
  createBoard()

  // generate a number randomly
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      // it will only set the value to 2 if the innerHTML is 0
      squares[randomNumber].innerHTML = 2
      checkForGameOver()
    } else generate() // otherwise it will rerun the function
  }

  // swipe right to
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ] // parse to number

        let filteredRow = row.filter((num) => num) // save the squares with numbers in a new array

        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]
      }
    }
  }
  // swipe left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ] // parse to number

        let filteredRow = row.filter((num) => num) // save the squares with numbers in a new array

        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]
      }
    }
  }

  // swipe down
  function moveDown() {
    // loop over first 4 elements
    // and check the squares below
    for (let i = 0; i < 4; i++) {
      // console.log(i)
      let totalOne = squares[i].innerHTML
      // console.log(totalOne, 'totalOne')
      let totalTwo = squares[i + width].innerHTML
      // console.log(totalTwo, 'totalTwo')
      let totalThree = squares[i + width * 2].innerHTML
      // console.log(totalThree, 'totalThree')
      let totalFour = squares[i + width * 3].innerHTML
      // console.log(totalFour, 'totalFour')
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ]

      let filteredColumn = column.filter((num) => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)
      console.log(column, 'down column')
      console.log(filteredColumn, 'down filteredColumn')
      console.log(zeros, 'down zeros')
      console.log(newColumn, 'down newColumn')

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + width * 2].innerHTML = newColumn[2]
      squares[i + width * 3].innerHTML = newColumn[3]
    }
  }

  // swipe up
  function moveUp() {
    // loop over first 4 elements
    // and check the squares below
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + width].innerHTML
      let totalThree = squares[i + width * 2].innerHTML
      let totalFour = squares[i + width * 3].innerHTML
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ]

      let filteredColumn = column.filter((num) => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)
      // console.log(column, 'down column')
      // console.log(filteredColumn, 'down filteredColumn')
      // console.log(zeros, 'down zeros')
      // console.log(newColumn, 'down newColumn')

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + width * 2].innerHTML = newColumn[2]
      squares[i + width * 3].innerHTML = newColumn[3]
    }
  }

  function combineRow() {
    // we don't need to check for the 15th square right square or it will break
    for (let i = 0; i < 15; i++) {
      // check if square is the same as it's right neighbour
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + 1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumn() {
    // there are no squares below 13, 14, 15 or 16 because there are no sqaures below them
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  // assign keycodes
  function control(e) {
    if (e.key === 'ArrowRight') {
      keyRight()
    } else if (e.key === 'ArrowLeft') {
      keyLeft()
    } else if (e.key === 'ArrowDown') {
      keyDown()
    } else if (e.key === 'ArrowUp') {
      keyUp()
    }
  }
  document.addEventListener('keyup', control)
  upButton.addEventListener('click', keyUp)
  leftButton.addEventListener('click', keyLeft)
  rightButton.addEventListener('click', keyRight)
  downButton.addEventListener('click', keyDown)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }
  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }
  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }
  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  // check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        // resultDisplay.innerHTML = 'You Win!'
        resultDisplay.innerHTML =
          '<svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        document.removeEventListener('keyup', control)
      }
    }
  }

  function checkForGameOver() {
    let zeros = 0
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      // resultDisplay.innerHTML = 'You Lose!'
      resultDisplay.innerHTML =
        '<svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer)
  }

  //add colours
  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0)
        squares[i].style.backgroundColor = '#f2f2f2'
      else if (squares[i].innerHTML == 2)
        squares[i].style.backgroundColor = '#f6e58d'
      else if (squares[i].innerHTML == 4)
        squares[i].style.backgroundColor = '#ffbe76'
      else if (squares[i].innerHTML == 8)
        squares[i].style.backgroundColor = '#686de0'
      else if (squares[i].innerHTML == 16)
        squares[i].style.backgroundColor = '#7ed6df'
      else if (squares[i].innerHTML == 32)
        squares[i].style.backgroundColor = '#e056fd'
      else if (squares[i].innerHTML == 64)
        squares[i].style.backgroundColor = '#ED4C67'
      else if (squares[i].innerHTML == 128)
        squares[i].style.backgroundColor = '#58B19F'
      else if (squares[i].innerHTML == 256)
        squares[i].style.backgroundColor = '#25CCF7'
      else if (squares[i].innerHTML == 512)
        squares[i].style.backgroundColor = '#D6A2E8'
      else if (squares[i].innerHTML == 1024)
        squares[i].style.backgroundColor = '#9AECDB'
      else if (squares[i].innerHTML == 2048)
        squares[i].style.backgroundColor = '#EAB543'
    }
  }
  addColours()

  var myTimer = setInterval(addColours, 50)
})
