import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Preview() {
  const [cards, setCards] = useState([])
  const [setInfo, setSetInfo] = useState({
    title: 'My Set',
    subject: 'General'
  })
  const [isSaved, setIsSaved] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const cardsData = localStorage.getItem('currentCards')
    const setInfoData = localStorage.getItem('currentSetInfo')

    if (cardsData) {
      setCards(JSON.parse(cardsData))
    }

    if (setInfoData) {
      setSetInfo(JSON.parse(setInfoData))
    }
  }, [])

  function saveFlashcardSet() {
    const newSet = {
      title: setInfo.title,
      subject: setInfo.subject,
      cards: cards
    }

    const existingSets = JSON.parse(
      localStorage.getItem('flashSets') || '[]'
    )

    const updatedSets = [...existingSets, newSet]

    localStorage.setItem('flashSets', JSON.stringify(updatedSets))
    setIsSaved(true)
  }

  function renderFlashcard(card, cardNumber) {
    return (
      <div
        key={cardNumber}
        className='bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow'
      >
        <p className='text-xs text-gray-400 uppercase tracking-widest mb-3'>
          Card {cardNumber + 1}
        </p>

        <p className='text-xs font-semibold text-orange-500 mb-1'>
          ❓ QUESTION
        </p>
        <p className='text-gray-800 font-medium mb-4'>
          {card.question}
        </p>

        <hr className='border-gray-200 mb-4' />

        <p className='text-xs font-semibold text-green-500 mb-1'>
          ✅ ANSWER
        </p>
        <p className='text-gray-700'>
          {card.answer}
        </p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-start justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              ✨ Your Flashcards
            </h1>
            <p className='text-gray-600 mt-2'>
              You created <strong>{cards.length} cards</strong> for <strong>"{setInfo.title}"</strong>
            </p>
          </div>
          <span className='bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold'>
            📚 {setInfo.subject}
          </span>
        </div>

        <div className='mb-8'>
          {cards.length > 0 ? (
            cards.map((card, index) => renderFlashcard(card, index))
          ) : (
            <p className='text-center text-gray-500'>No flashcards found</p>
          )}
        </div>

        <div className='flex gap-3 mt-8'>
          <button
            onClick={saveFlashcardSet}
            disabled={isSaved}
            className='flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-green-500 text-white py-4 rounded-xl font-semibold transition-colors'
          >
            {isSaved ? '✅ Saved Successfully!' : '💾 Save This Set'}
          </button>

          <button
            onClick={() => navigate('/study')}
            className='flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors'
          >
            🎓 Study Now
          </button>

          <button
            onClick={() => navigate('/generate')}
            className='px-5 py-4 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors'
          >
            ← Back
          </button>
        </div>

        <div className='mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl'>
          <p className='text-sm text-blue-900'>
            💡 <strong>Tip:</strong> Save your flashcard set so you can access it anytime. Then start studying!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Preview