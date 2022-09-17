import React, { useState } from 'react';
import './App.css'

// console.log(2.12 * -1)

function App() {
  const [output, setOutput] = useState(0)
  const [prevNum, setPrevNum] = useState(0)
  const [optType, setOptType] = useState(null)

  Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
  }

  const handelOutput = (num) => {
    if (num === 0 && output === 0) {
      console.log('1')
      setOutput(num)
    } else if (output.toString().charAt(output.length - 1) === '0' && output.length < 1 && num !== 0 && num !== '.') {
      console.log('2')
      setOutput(num)
    } else if (num === '.') {
      console.log('3')
      if ((output.toString()).includes('.')){
        return
      } else {
        setOutput(prev => prev.toString().concat(num))
      }
    } else if (output.toString().charAt(output.length - 1) === '.') {
      console.log('4')
      setOutput(prev => prev.concat(num))
    } else {
      console.log('5')
      setOutput(prev => Number(prev.toString().concat(num)))
      console.log(typeof(output))
    }
  }

  const handelDecimal = (first, second) => {
    const valueAfterDeci = (first.countDecimals() > second.countDecimals() ? first.countDecimals() : second.countDecimals())
    console.log(valueAfterDeci, 'opt', optType)
    if (optType === '+') {
      if (parseFloat(((first * 100) + (second * 100)) / 100).toString().length > 10) {
        return (Number((first + second).toFixed(valueAfterDeci)))
      } else {
        return parseFloat(((first * 100) + (second * 100)) / 100)
      }
    } else if (optType === '-') {
      if (parseFloat(((first * 100) - (second * 100)) / 100).toString().length > 10) {
        return Number((first - second).toFixed(valueAfterDeci))
      } else {
        return parseFloat(((first * 100) - (second * 100)) / 100)
      }
    } else if (optType === '*') {
      if ((first * second).toString().length > 10) {
        return Number((first * second).toFixed(valueAfterDeci + 1))
      } else {
        return (first * second)
      }
    } else if (optType === 'divide') {
      return (first / second)
    }
  }

  const handelMath = (type) => {

    if (type === '%') {
      setOutput(prev => Number(prev / 100))
    } else if (type === '+/-') {
      setOutput(prev => prev * -1)
    } else if (optType !== type) {
      if (prevNum !== 0) {
        setPrevNum(handelDecimal(Number(prevNum), Number(output)))
        setOptType(type)
        setOutput(0)
      } else {
        setPrevNum(output)
        setOptType(type)
        setOutput(0)
      }
    }
  }

  const handelEqual = () => {
    if (prevNum !== 0) {
      console.log('where',prevNum, output)
      setOutput(prev => handelDecimal(Number(prevNum), Number(prev)))
      setOptType(null)
      setPrevNum(0)
    } else {
      setOutput(output)
    }
  }

  const handelClear = () => {
    setOutput(0)
    setPrevNum(0)
  }
  return (
    <div className="App">
      <div className='input-filed'><span className='result'>{(output === 0 ? prevNum : output)}</span></div>
      <div className='btn'>
        <button onClick={handelClear} >{(output === 0 && prevNum === 0 ? 'AC' : 'C')}</button>
        <button onClick={() => handelMath('+/-')}>+/-</button>
        <button onClick={() => handelMath('%')}>%</button>
        <button onClick={() => handelMath('divide')}>/</button>
        <button onClick={() => handelOutput(7)}>7</button>
        <button onClick={() => handelOutput(8)}>8</button>
        <button onClick={() => handelOutput(9)}>9</button>
        <button onClick={() => handelMath('*')}>X</button>
        <button onClick={() => handelOutput(4)}>4</button>
        <button onClick={() => handelOutput(5)}>5</button>
        <button onClick={() => handelOutput(6)}>6</button>
        <button onClick={() => handelMath('-')}>-</button>
        <button onClick={() => handelOutput(1)}>1</button>
        <button onClick={() => handelOutput(2)}>2</button>
        <button onClick={() => handelOutput(3)}>3</button>
        <button onClick={() => handelMath('+')}>+</button>
        <button onClick={() => handelOutput(0)} className='two-spot'>0</button>
        <button onClick={() => handelOutput('.')}>.</button>
        <button onClick={handelEqual}>=</button>
      </div>
    </div>
  );
}

export default App;
