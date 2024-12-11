import Header from '../Components/Header'
import ResultButton from '../Components/ResultButton'
import Languages from '../Components/Languages'
import React from 'react'
import './App.css'

function App() {
  const [currentWord, setCurrentWord] = React.useState("React")

  const letterElements = currentWord.split("").map((letter,index) => (
    <span key={index}>{letter.toUpperCase()}</span>
  ))

  const alphabet ="abcdefghijklmnopqrstuvwxyz"

  const keyboardElements = alphabet.split("").map(letter => (
    <button key={letter}>{letter.toUpperCase()}</button>
  ))

  return (
    <div className='container'>
      <Header/>
      <ResultButton/>
      <Languages/>

      <section className='word'>
        {letterElements}
      </section>

      <section className='keyboard'>
        {keyboardElements}
      </section>

      <button className='new-game'>New Game</button>
    </div>
  )
}

export default App
