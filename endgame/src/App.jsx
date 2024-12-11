import Header from '../Components/Header'
import ResultButton from '../Components/ResultButton'
import { languages } from './languages'
import clsx from 'clsx'
import React from 'react'
import './App.css'

function App() {
  // State Values
  const [currentWord, setCurrentWord] = React.useState("react")
  const [guessedLetters, setGuessedLetters] = React.useState([])

  // Derived Values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  console.log(wrongGuessCount)


  // Static values
  const letterElements = currentWord.split("").map((letter,index) => {
    const isGuessedCorrect = guessedLetters.includes(letter) && currentWord.includes(letter)
    return(
    <span key={index}>{isGuessedCorrect && letter.toUpperCase()}</span>
  )})

  const alphabet ="abcdefghijklmnopqrstuvwxyz"

  // Displays the keyboard and handles input
  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong =  isGuessed && !currentWord.includes(letter)
    return (
    <button
     onClick={() => addGuessedLetter(letter)}
     className={clsx('btn', isCorrect && 'correct-guess',isWrong && 'wrong-guess')}
     key={letter}>
     {letter.toUpperCase()}
    </button>
  )})

  function addGuessedLetter(letter){
    setGuessedLetters(prevGuess => 
      prevGuess.includes(letter)? 
        prevGuess :
        [...prevGuess, letter]
    )
  }

  const languageChips = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
    <span className="chip" key={lang.name} style={styles}>{lang.name}</span>
    )
  })

  return (
    <div className='container'>
      <Header/>
      <ResultButton/>

      
      <div className="language-chips">
        {languageChips}
      </div>

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
