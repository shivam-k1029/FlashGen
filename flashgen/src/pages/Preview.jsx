import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Preview component: Shows the generated flashcards before saving
function Preview() {
  // ===== STATE VARIABLES =====
  const [cards, setCards] = useState([]) // List of flashcards
  const [setInfo, setSetInfo] = useState({
    title: 'My Set',
    subject: 'General'
  }) // Name and category of the flashcard set
  const [isSaved, setIsSaved] = useState(false) // True if user saved the set
  
  // Use this to navigate to other pages
  const navigate = useNavigate()

  // ===== LOAD DATA WHEN PAGE OPENS =====
  // useEffect runs once when the component loads
  useEffect(() => {
    // Get the flashcards from browser storage
    const cardsData = localStorage.getItem('currentCards')
    
    // Get the set information from browser storage
    const setInfoData = localStorage.getItem('currentSetInfo')
    
    // If flashcards exist, convert them from text to JavaScript objects
    if (cardsData) {
      setCards(JSON.parse(cardsData))
    }
    
    // If set info exists, convert it from text to JavaScript objects
    if (setInfoData) {
      setSetInfo(JSON.parse(setInfoData))
    }
  }, []) // Empty [] means this runs only once on page load

  // ===== HELPER FUNCTIONS =====

  // Save the flashcard set to permanent storage
  function saveFlashcardSet() {
    // Create an object with all the set information
    const newSet = {
      title: setInfo.title,
      subject: setInfo.subject,
      cards: cards // Include all the flashcards
    }
    
    // Get any existing flashcard sets from storage
    const existingSets = JSON.parse(
      localStorage.getItem('flashSets') || '[]'
    )
    
    // Add the new set to the list of existing sets
    const updatedSets = [...existingSets, newSet]
    
    // Save the updated list back to storage
    localStorage.setItem('flashSets', JSON.stringify(updatedSets))
    
    // Update the UI to show that it's been saved
    setIsSaved(true)
  }

  // Show a single flashcard (question and answer)
  function renderFlashcard(card, cardNumber) {
    return (
      <div
        key={cardNumber}
        className='bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition-shadow'
      >
        {/* Card Number Badge */}
        <p className='text-xs text-gray-400 uppercase tracking-widest mb-3'>
          Card {cardNumber + 1}
        </p>

        {/* Question Section */}
        <p className='text-xs font-semibold text-orange-500 mb-1'>
          ❓ QUESTION
        </p>
        <p className='text-gray-800 font-medium mb-4'>
          {card.question}
        </p>

        {/* Divider Line */}
        <hr className='border-gray-200 mb-4' />

        {/* Answer Section */}
        <p className='text-xs font-semibold text-green-500 mb-1'>
          ✅ ANSWER
        </p>
        <p className='text-gray-700'>
          {card.answer}
        </p>
      </div>
    )
  }

  // ===== UI / PAGE CONTENT =====
  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-2xl mx-auto'>
        {/* Header Section */}
        <div className='flex items-start justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>
              ✨ Your Flashcards
            </h1>
            <p className='text-gray-600 mt-2'>
              You created <strong>{cards.length} cards</strong> for <strong>"{setInfo.title}"</strong>
            </p>
          </div>
          {/* Subject Badge */}
          <span className='bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold'>
            📚 {setInfo.subject}
          </span>
        </div>

        {/* Display all flashcards */}
        <div className='mb-8'>
          {cards.length > 0 ? (
            cards.map((card, index) => renderFlashcard(card, index))
          ) : (
            <p className='text-center text-gray-500'>No flashcards found</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 mt-8'>
          {/* Save Button */}
          <button
            onClick={saveFlashcardSet}
            disabled={isSaved}
            className='flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-green-500 text-white py-4 rounded-xl font-semibold transition-colors'
          >
            {isSaved ? '✅ Saved Successfully!' : '💾 Save This Set'}
          </button>

          {/* Study Button */}
          <button
            onClick={() => navigate('/study')}
            className='flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors'
          >
            🎓 Study Now
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate('/generate')}
            className='px-5 py-4 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors'
          >
            ← Back
          </button>
        </div>

        {/* Helpful Tips */}
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