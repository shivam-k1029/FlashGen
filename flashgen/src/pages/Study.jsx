import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FlashCard from '../components/FlashCard'

// Study component: Interactive study mode to review flashcards
function Study() {
  // ===== STATE VARIABLES =====
  const [cards, setCards] = useState([]) // All the flashcards loaded
  const [currentIndex, setCurrentIndex] = useState(0) // Which card we're viewing (0, 1, 2, etc.)
  const [scores, setScores] = useState({}) // Tracks how well the user knows each card
  // Example: { 0: 'got', 1: 'nope', 2: 'almost' }
  const [isFinished, setIsFinished] = useState(false) // true when all cards are done

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

  // Move to the next flashcard
  function goToNextCard() {
    if (currentIndex < cards.length - 1) {
      // More cards left - go to the next one
      setCurrentIndex(currentIndex + 1)
    } else {
      // No more cards - we're done studying!
      setIsFinished(true)
    }
  }

  // Go back to the previous flashcard
  function goToPreviousCard() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // User clicked a rating button (Got it, Almost, or Nope)
  function handleCardRating(ratingType) {
    // ratingType is either 'got', 'almost', or 'nope'
    const updatedScores = { ...scores, [currentIndex]: ratingType }
    setScores(updatedScores)
    goToNextCard()
  }

  // ===== CALCULATE STATISTICS =====
  // Count how many cards the user rated as "Got it"
  const cardsMastered = Object.values(scores)
    .filter((rating) => rating === 'got').length
  
  // Count how many cards were "Almost"
  const cardsAlmost = Object.values(scores)
    .filter((rating) => rating === 'almost').length
  
  // Count how many cards were "Nope"
  const cardsFailed = Object.values(scores)
    .filter((rating) => rating === 'nope').length

  // ===== PAGE: LOADING STATE =====
  // Show while cards are loading from storage
  if (cards.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-400 text-lg'>📚 Loading your cards...</p>
      </div>
    )
  }

  // ===== PAGE: FINISHED SCREEN =====
  // Show this when the user has studied all cards
  if (isFinished) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
        <div className='text-center max-w-md w-full'>
          {/* Completion emoji */}
          <p className='text-6xl mb-5'>✨</p>

          {/* Title */}
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Session Complete!
          </h2>

          {/* Summary */}
          <p className='text-gray-600 mb-8'>
            You studied all <strong>{cards.length}</strong> cards
          </p>

          {/* Score breakdown - 3 boxes */}
          <div className='grid grid-cols-3 gap-4 mb-8'>
            {/* Got it - green */}
            <div className='bg-green-50 border border-green-200 rounded-xl py-4'>
              <p className='text-3xl font-bold text-green-600'>
                {cardsMastered}
              </p>
              <p className='text-xs text-green-600 mt-2'>✅ Got it</p>
            </div>

            {/* Almost - yellow */}
            <div className='bg-yellow-50 border border-yellow-200 rounded-xl py-4'>
              <p className='text-3xl font-bold text-yellow-600'>
                {cardsAlmost}
              </p>
              <p className='text-xs text-yellow-600 mt-2'>🤔 Almost</p>
            </div>

            {/* Nope - red */}
            <div className='bg-red-50 border border-red-200 rounded-xl py-4'>
              <p className='text-3xl font-bold text-red-500'>
                {cardsFailed}
              </p>
              <p className='text-xs text-red-600 mt-2'>❌ Nope</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className='flex gap-3 mb-4'>
            <button
              onClick={() => {
                setCurrentIndex(0)
                setScores({})
                setIsFinished(false)
              }}
              className='flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition'
            >
              🔄 Study Again
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className='flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition'
            >
              📝 Take Quiz
            </button>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className='w-full text-center text-gray-500 hover:text-gray-700 text-sm font-medium transition'
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  // ===== PAGE: MAIN STUDY SCREEN =====
  // Show this while the user is studying
  const currentCard = cards[currentIndex]
  const progressPercentage = ((currentIndex + 1) / cards.length) * 100

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-lg mx-auto'>
        {/* Progress info */}
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm text-gray-600'>
            Card <strong>{currentIndex + 1}</strong> of <strong>{cards.length}</strong>
          </p>
          <p className='text-sm font-bold text-green-600'>
            {cardsMastered} ✅
          </p>
        </div>

        {/* Progress bar */}
        <div className='w-full bg-gray-200 rounded-full h-3 mb-8'>
          <div
            className='bg-orange-500 h-3 rounded-full transition-all duration-300'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Flashcard Display */}
        <FlashCard
          question={currentCard.question}
          answer={currentCard.answer}
        />

        {/* Rating Buttons - How well do you know this card? */}
        <div className='flex gap-3 mt-8'>
          <button
            onClick={() => handleCardRating('nope')}
            className='flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-xl font-semibold transition'
          >
            ❌ Nope
          </button>
          <button
            onClick={() => handleCardRating('almost')}
            className='flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-3 rounded-xl font-semibold transition'
          >
            🤔 Almost
          </button>
          <button
            onClick={() => handleCardRating('got')}
            className='flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-3 rounded-xl font-semibold transition'
          >
            ✅ Got it!
          </button>
        </div>

        {/* Navigation buttons - Previous and Skip */}
        <div className='flex justify-between mt-6'>
          <button
            onClick={goToPreviousCard}
            disabled={currentIndex === 0}
            className='text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 font-medium transition'
          >
            ← Previous
          </button>
          <button
            onClick={goToNextCard}
            className='text-sm text-gray-500 hover:text-gray-700 font-medium transition'
          >
            Skip →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Study