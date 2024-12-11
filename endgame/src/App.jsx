import Header from '../Components/Header'
import { languages } from './languages'
import { getFarewellText, generateWord } from './utils'
import Confetti from "react-confetti"
import clsx from 'clsx'
import React from 'react'
import './App.css'

function App() {
  // State Values
  const [currentWord, setCurrentWord] = React.useState(() => generateWord())
  const [guessedLetters, setGuessedLetters] = React.useState([])

  // Derived Values
  
  const numGuessesLeft = languages.length - 1
  let guesses = numGuessesLeft;
  const wrongGuessCount = 
          guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = 
          currentWord.split("").every(letter => guessedLetters.includes(letter))

  const isGameLost = wrongGuessCount >= numGuessesLeft
  const isGameOver = isGameLost || isGameWon

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // Static values
  const letterElements = currentWord.split("").map((letter,index) => {
    const isGuessedCorrect = guessedLetters.includes(letter) && currentWord.includes(letter)
  
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
        isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    )
    return(
    <span className={letterClassName} key={index}>{shouldRevealLetter? letter.toUpperCase() : ""}</span>
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
     disabled={isGameOver}
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


  let farewellMessage = ""
  const languageChips = languages.map((lang,index) => {
    const isLanguageLost = index < wrongGuessCount
    if(isLanguageLost){
      farewellMessage = getFarewellText(lang)
      guesses -= 1
    }
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    const className = clsx("chip", isLanguageLost && "lost")
    return (
    <span className={className} key={lang.name} style={styles}>{lang.name}</span>
    )
  })


  const buttonClassName = clsx('game-status', {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  function renderGameStatus(){
    if(!isGameOver && isLastGuessIncorrect){
      return <p className='farewell-message'>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
    }

    if(isGameWon){
      return(
        <>
                  <h2 className="win">
                    You Win!
                  </h2>
                  <p>Well done! 🎉</p>
                </>
      )
    }  
    if(isGameLost) {
      return(
        <>
                <h2 className="win">
                Game Over!
                </h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
      )
    }
    return null
  }

  function restartGame(){
      setCurrentWord(generateWord())
      setGuessedLetters([])
  }

  return (
    <div className='container'>
      <Header/>
      <button className={buttonClassName}>{renderGameStatus()}</button>
      
      <div className="language-chips">
        {languageChips}
      </div>

      <section className='word'>
        {letterElements}
      </section>

      <div className='counter'>
        Remaining Guesses: {guesses}
      </div>

      <section className='keyboard'>
        {keyboardElements}
      </section>
      {isGameWon && <Confetti 
        recycle={false}
        numberOfPieces={1000}
      />}

      {(isGameWon || isGameLost) && <button onClick={() => restartGame()} className='new-game'>New Game</button>}
    </div>
  )
}

export default App
