import React, { useState } from 'react';
import './App.css'

const a = 4
const b = 2

const t = a / b

console.log(t)
function App() {
  const [output, setOutput] = useState(0)
  const [prevNum, setPrevNum] = useState(0)
  const [optType, setOptType] = useState(null)

  const handelOutput = (num) => {
    if (num === 0 && output === 0) {
      console.log('1')
      setOutput(num)
    } else if (output.toString().charAt(output.length - 1) === '0' && output.length < 1 && num !== 0 && num !== '.') {
      console.log('2')
      setOutput(num)
    } else if (num === '.') {
      console.log('3')
      setOutput(prev => prev.toString().concat(num))
    } else if (output.toString().charAt(output.length - 1) === '.') {
      console.log('4')
      setOutput(prev => prev.concat(num))
    } else {
      console.log('5')
      setOutput(prev => Number(prev.toString().concat(num)))
      console.log(typeof(output))
    }
  }

  const handelMath = (type) => {

    const opt = (
      type === '+' ? Number(prevNum) + Number(output):
      type === '-' ? Number(prevNum) - Number(output):
      type === '*' ? Number(prevNum) * Number(output):
      type === 'divide' ? Number(prevNum) / Number(output): '')
    
    if (prevNum !== 0) {
      setPrevNum(opt)
      setOutput(0)
      console.log('in after' ,prevNum)
    } else {
      setPrevNum(output)
      setOutput(0)
    }
    
    setOptType(type)
    console.log('after' ,prevNum)
  }

  const handelEqual = () => {
   
    const handelDecimal = (first, second) => {
      return ((first * 100) + (second * 100)) / 100 
    }

    if (optType === '+') {
      setOutput(prev => handelDecimal(Number(prevNum), Number(prev)))
    } else if (optType === '-') {
      console.log('in sub')
      setOutput(prev => Number(prevNum) - Number(prev))
    } else if (optType === '*') {
      setOutput(prev => Number(prevNum) * Number(prev))
    } else if (optType === 'divide') {
      setOutput(prev => Number(prevNum) / Number(prev))
    }

    setOptType(null)
    setPrevNum(0)
  }

  const handelClear = () => {
    setOutput('0')
    setPrevNum(0)
  }
  return (
    <div className="App">
      <div className='input-filed'><span className='result'>{(output === 0 ? prevNum : output)}</span></div>
      <div className='btn'>
        <button onClick={handelClear} >{(output === '0' && prevNum === 0 ? 'AC' : 'C')}</button>
        <button>+/-</button>
        <button>%</button>
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
