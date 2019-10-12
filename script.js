var calculatorStr = '' //string will be displayed on calculator display screen
var calculatorArr = [] //array will store all the data that has been input and calculated

let display = document.getElementById("calcdisplay") //making the calculatorStr show in calcdisplay
let isPreviousResult = false

listen()

function listen () {
    document.addEventListener('click', getButtonValue)
}

function getButtonValue() {
    let button = event.target.value
    if (!isNaN(button) || button === '.') {
        number(button)
    } else if (button === 'AC') {
        clear()
    } else if (button === 'CE') {
        clear()
    } else if (button === '=') {
        calculate()
    } else {
        storeNumber(button)
    }
}
function number (button) {
    if (button === '.' && calculatorStr.includes('.')) {
      return
    } else if (calculatorStr.charAt(0) === '0' && calculatorStr.length === 1 && button === '0') {
      return
    } else {
      if (isPreviousResult === true){
        calculatorStr = ''
        isPreviousResult = false
      }
      calculatorStr += button
      display.value = calculatorStr
    }
  }
  
  function allClear () {
    calculatorStr = ''
    calculatorArr = []
    display.value = '0'
  }
  
  function clear () {
    calculatorStr = ''
    display.value = '0'
  }
  
  function storeNumber (button) {
    if (calculatorStr === '' && calculatorArr.length === 0) {
      return
    } else if (calculatorStr === '') {
        calculatorArr.length = calculatorArr.length - 1
        calculatorArr.push(button)
    } else {
        calculatorArr.push(calculatorStr)
        calculatorArr.push(button)
      calculatorStr = ''
    }
  }
  
  function calculate () {
    calculatorArr.push(calculatorStr)
    let currentNumber = Number(calculatorArr[0])
    for (var i = 0; i < calculatorArr.length; i++) {
      let nextNumber = Number(calculatorArr[i + 1])
      let symbol = calculatorArr[i]
      if (symbol === '+') {
        currentNumber += nextNumber
      } else if (symbol === '-') {
        currentNumber -= nextNumber
      } else if (symbol === '*') {
        currentNumber *= nextNumber
      } else if (symbol === '/') {
        currentNumber /= nextNumber
      }
    }
    if (currentNumber < 0) {
      currentNumber = Math.abs(currentNumber) + '-'
    }
  
    display.value = currentNumber
    calculatorStr = JSON.stringify(currentNumber)
    isPreviousResult = true
    calculatorArr = []
  }

