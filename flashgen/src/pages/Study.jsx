import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FlashCard from '../components/FlashCard'

function Study() {
  const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedCards = localStorage.getItem('currentCards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])

  function goToNextCard() {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setIsFinished(true)
    }
  }

  function goToPreviousCard() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  function handleCardRating(ratingType) {
    const updatedScores = { ...scores, [currentIndex]: ratingType }
    setScores(updatedScores)
    goToNextCard()
  }

  const cardsMastered = Object.values(scores)
    .filter((rating) => rating === 'got').length

  const cardsAlmost = Object.values(scores)
    .filter((rating) => rating === 'almost').length

  const cardsFailed = Object.values(scores)
    .filter((rating) => rating === 'nope').length

  if (cards.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-400 text-lg'>📚 Loading your cards...</p>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
        <div className='text-center max-w-md w-full'>
          <p className='text-6xl mb-5'>✨</p>

          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Session Complete!
          </h2>

          <p className='text-gray-600 mb-8'>
            You studied all <strong>{cards.length}</strong> cards
          </p>

          <div className='grid grid-cols-3 gap-4 mb-8'>
            <div className='bg-green-50 border border-green-200 rounded-xl py-4'>
              <p className='text-3xl font-bold text-green-600'>
                {cardsMastered}
              </p>
              <p className='text-xs text-green-600 mt-2'>✅ Got it</p>
            </div>

            <div className='bg-yellow-50 border border-yellow-200 rounded-xl py-4'>
              <p className='text-3xl font-bold text-yellow-600'>
                {cardsAlmost}
              </p>
              <p className='text-xs text-yellow-600 mt-2'>🤔 Almost</p>
            </div>

            <div className='bg-red-50 border border-red-200 rounded-xl py-4'>
              <p className='text-3xl font-bold text-red-500'>
                {cardsFailed}
              </p>
              <p className='text-xs text-red-600 mt-2'>❌ Nope</p>
            </div>
          </div>

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

  const currentCard = cards[currentIndex]
  const progressPercentage = ((currentIndex + 1) / cards.length) * 100

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-lg mx-auto'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm text-gray-600'>
            Card <strong>{currentIndex + 1}</strong> of <strong>{cards.length}</strong>
          </p>
          <p className='text-sm font-bold text-green-600'>
            {cardsMastered} ✅
          </p>
        </div>

        <div className='w-full bg-gray-200 rounded-full h-3 mb-8'>
          <div
            className='bg-orange-500 h-3 rounded-full transition-all duration-300'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <FlashCard
          question={currentCard.question}
          answer={currentCard.answer}
        />

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