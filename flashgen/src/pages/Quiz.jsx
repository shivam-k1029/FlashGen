import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Quiz component: Interactive quiz mode to test flashcard knowledge
function Quiz() {
  // ===== STATE VARIABLES =====
  const [cards, setCards] = useState([]) // All the flashcards
  const [currentIndex, setCurrentIndex] = useState(0) // Which question we're on (0, 1, 2, etc.)
  const [selectedAnswer, setSelectedAnswer] = useState(null) // The answer the user clicked
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null) // true if answer is correct
  const [score, setScore] = useState(0) // Number of correct answers so far
  const [wrongCards, setWrongCards] = useState([]) // Cards the user got wrong
  const [isFinished, setIsFinished] = useState(false) // true when quiz is complete

  const navigate = useNavigate()

  // ===== LOAD DATA WHEN PAGE OPENS =====
  useEffect(() => {
    // Get the flashcards from browser storage
    const savedCards = localStorage.getItem('currentCards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, []) // Empty [] means this only runs once

  // ===== HELPER FUNCTIONS =====

  // Create 4 multiple choice options:
  // 1 correct answer + 3 wrong answers from other cards
  function buildMultipleChoiceOptions(correctCard, allCards, currentCardIndex) {
    // Get the correct answer
    const correctAnswer = correctCard.answer

    // Get 3 wrong answers from other cards
    const wrongAnswers = allCards
      .filter((card, index) => index !== currentCardIndex) // Don't include current card
      .sort(() => Math.random() - 0.5) // Shuffle randomly
      .slice(0, 3) // Take first 3
      .map((card) => card.answer) // Get just the answers

    // Combine correct + wrong answers
    const allOptions = [correctAnswer, ...wrongAnswers]

    // Shuffle all options so correct answer isn't always in same spot
    return allOptions.sort(() => Math.random() - 0.5)
  }

  // User clicked on one of the answer options
  function handleAnswerClick(selectedOption) {
    // Don't allow changing answer after it's been selected
    if (selectedAnswer !== null) return

    // Check if this answer is correct
    const correct = selectedOption === cards[currentIndex].answer
    setSelectedAnswer(selectedOption)
    setIsAnswerCorrect(correct)

    // Update score if correct, or add to wrong cards list if incorrect
    if (correct) {
      setScore(score + 1)
    } else {
      setWrongCards([...wrongCards, cards[currentIndex]])
    }
  }

  // Move to the next question or finish the quiz
  function handleNextQuestion() {
    // Are we at the last question?
    if (currentIndex + 1 >= cards.length) {
      // Yes - we're done!
      setIsFinished(true)
    } else {
      // No - move to next question and reset answer state
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
    }
  }

  // Start the quiz over from the beginning
  function restartQuiz() {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswerCorrect(null)
    setScore(0)
    setWrongCards([])
    setIsFinished(false)
  }

  // ===== PAGE: LOADING STATE =====
  // Show while flashcards are loading
  if (cards.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-400 text-lg'>📚 Loading quiz...</p>
      </div>
    )
  }

  // ===== PAGE: RESULTS SCREEN =====
  // Show this when the quiz is complete
  if (isFinished) {
    // Calculate percentage score
    const percentage = Math.round((score / cards.length) * 100)

    // Pick emoji and message based on how well they did
    let resultEmoji = '🎉' // Default for excellent
    let resultMessage = 'Excellent!'
    
    if (percentage < 80) {
      resultEmoji = '🌟'
      resultMessage = 'Good job!'
    }
    if (percentage < 50) {
      resultEmoji = '💪'
      resultMessage = 'Keep practicing!'
    }

    return (
      <div className='min-h-screen bg-gray-50 px-6 py-10'>
        <div className='max-w-lg mx-auto text-center'>
          {/* Big emoji */}
          <p className='text-6xl mb-4'>{resultEmoji}</p>

          {/* Title */}
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Quiz Complete!
          </h2>

          {/* Score summary */}
          <p className='text-gray-600 mb-8'>
            You scored <strong>{score}</strong> out of <strong>{cards.length}</strong>
          </p>

          {/* Big percentage box */}
          <div className='bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm'>
            <p className='text-6xl font-bold text-orange-500 mb-2'>
              {percentage}%
            </p>
            <p className='text-gray-500 text-lg'>{resultMessage}</p>
          </div>

          {/* Show cards you got wrong (for review) */}
          {wrongCards.length > 0 && (
            <div className='bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 text-left'>
              <h3 className='font-bold text-red-700 mb-4'>
                📖 Review these {wrongCards.length} cards you got wrong:
              </h3>
              {wrongCards.map((card, index) => (
                <div
                  key={index}
                  className='mb-4 pb-4 border-b border-red-200 last:border-0'
                >
                  <p className='text-sm font-semibold text-red-600'>
                    ❓ {card.question}
                  </p>
                  <p className='text-sm text-red-500 mt-2'>
                    ✅ {card.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className='flex gap-3 mb-4'>
            <button
              onClick={restartQuiz}
              className='flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition'
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => navigate('/study')}
              className='flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition'
            >
              📚 Study Cards
            </button>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className='w-full text-center text-gray-500 hover:text-gray-700 text-sm font-medium'
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ===== PAGE: MAIN QUIZ SCREEN =====
  // Show this while the user is taking the quiz
  const currentCard = cards[currentIndex]
  const options = buildMultipleChoiceOptions(currentCard, cards, currentIndex)
  const answerLabels = ['A', 'B', 'C', 'D']
  const progressPercentage = ((currentIndex + 1) / cards.length) * 100

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-lg mx-auto'>
        {/* Progress info at top */}
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm text-gray-600'>
            Question <strong>{currentIndex + 1}</strong> of <strong>{cards.length}</strong>
          </p>
          <p className='text-sm font-bold text-orange-500'>
            Score: {score}
          </p>
        </div>

        {/* Progress bar */}
        <div className='w-full bg-gray-200 rounded-full h-3 mb-8'>
          <div
            className='bg-orange-500 h-3 rounded-full transition-all duration-300'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Question card */}
        <div className='bg-white border border-gray-200 rounded-2xl p-8 mb-8 text-center shadow-sm'>
          <p className='text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4'>
            Question
          </p>
          <p className='text-2xl font-bold text-gray-800 leading-relaxed'>
            {currentCard.question}
          </p>
        </div>

        {/* Answer option buttons */}
        <div className='flex flex-col gap-3 mb-8'>
          {options.map((option, index) => {
            // Determine button style based on state
            let buttonStyle = 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'

            // After user selects an answer, change colors
            if (selectedAnswer !== null) {
              if (option === currentCard.answer) {
                // This is the correct answer - show green
                buttonStyle = 'bg-green-100 border-green-400 text-green-700'
              } else if (option === selectedAnswer) {
                // User picked this wrong answer - show red
                buttonStyle = 'bg-red-100 border-red-400 text-red-700'
              } else {
                // Other options - fade them out
                buttonStyle = 'bg-gray-100 border-gray-300 text-gray-400 opacity-50 cursor-not-allowed'
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left px-6 py-4 rounded-xl font-medium border transition ${buttonStyle}`}
              >
                <span className='text-gray-500 mr-4 font-bold'>
                  {answerLabels[index]}.
                </span>
                {option}
              </button>
            )
          })}
        </div>

        {/* Next/Submit button - only shows after user picks an answer */}
        {selectedAnswer !== null && (
          <button
            onClick={handleNextQuestion}
            className='w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition'
          >
            {currentIndex + 1 >= cards.length ? '✅ See Results' : '→ Next Question'}
          </button>
        )}
      </div>
    </div>
  )
}
export default Quiz