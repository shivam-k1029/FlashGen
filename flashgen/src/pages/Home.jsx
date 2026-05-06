import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Home component: Main page showing saved flashcard sets
function Home() {
  // ===== STATE VARIABLES =====
  const [savedSets, setSavedSets] = useState([]) // All saved flashcard sets
  const navigate = useNavigate()

  // ===== LOAD DATA WHEN PAGE OPENS =====
  // Load saved flashcard sets from browser storage
  useEffect(() => {
    const savedData = localStorage.getItem('flashSets')
    if (savedData) {
      setSavedSets(JSON.parse(savedData))
    }
  }, []) // Empty [] means this only runs once

  // ===== HELPER FUNCTIONS =====

  // Start studying a specific flashcard set
  function startStudying(set) {
    // Save this set to temporary storage so Study page can access it
    localStorage.setItem('currentCards', JSON.stringify(set.cards))
    // Go to the Study page
    navigate('/study')
  }

  // Start quiz mode for a specific flashcard set
  function startQuiz(set) {
    // Save this set to temporary storage so Quiz page can access it
    localStorage.setItem('currentCards', JSON.stringify(set.cards))
    // Go to the Quiz page
    navigate('/quiz')
  }

  // Delete a flashcard set
  function deleteSet(indexToRemove) {
    // Create a new list without the deleted set
    const updatedSets = savedSets.filter((_, index) => index !== indexToRemove)
    setSavedSets(updatedSets)
    // Save the updated list to storage
    localStorage.setItem('flashSets', JSON.stringify(updatedSets))
  }

  // ===== CALCULATE STATISTICS =====
  // Count total number of cards across all sets
  const totalCardCount = savedSets.reduce(
    (sum, set) => sum + set.cards.length,
    0
  )

  // ===== PAGE CONTENT =====
  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      {/* Hero Section */}
      <div className='text-center mb-12'>
        <h1 className='text-5xl font-bold text-gray-900 mb-4'>
          Welcome to FlashGen
        </h1>
        <p className='text-gray-600 text-xl mb-8'>
          📝 Paste your notes. 🤖 Get flashcards instantly. 🎓 Study smart.
        </p>
        <button
          onClick={() => navigate('/generate')}
          className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition'
        >
          ✨ + Create New Set
        </button>
      </div>

      {/* Statistics Section - Shows overview */}
      <div className='flex justify-center gap-8 mb-12'>
        {/* Number of saved sets */}
        <div className='bg-white border border-gray-200 rounded-xl px-12 py-6 text-center'>
          <p className='text-4xl font-bold text-orange-500'>
            {savedSets.length}
          </p>
          <p className='text-gray-600 mt-2 font-medium'>Sets Created</p>
        </div>

        {/* Total number of cards */}
        <div className='bg-white border border-gray-200 rounded-xl px-12 py-6 text-center'>
          <p className='text-4xl font-bold text-orange-500'>
            {totalCardCount}
          </p>
          <p className='text-gray-600 mt-2 font-medium'>Total Cards</p>
        </div>
      </div>

      {/* Saved Flashcard Sets Section */}
      <div className='max-w-3xl mx-auto'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          📚 Your Saved Sets
        </h2>

        {/* Show message if no sets exist */}
        {savedSets.length === 0 && (
          <div className='text-center py-20 bg-white border border-gray-200 rounded-2xl'>
            <p className='text-5xl mb-4'>🎯</p>
            <p className='text-gray-500 text-lg font-medium'>
              No sets yet! Create your first one to get started.
            </p>
          </div>
        )}

        {/* List all saved sets */}
        {savedSets.map((set, index) => (
          <div
            key={index}
            className='bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition'
          >
            {/* Set info on the left */}
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                {/* Set name */}
                <h3 className='text-xl font-bold text-gray-800 mb-2'>
                  {set.title}
                </h3>

                {/* Set details */}
                <div className='flex gap-3 items-center'>
                  {/* Card count */}
                  <span className='text-sm text-gray-600'>
                    🎴 {set.cards.length} cards
                  </span>

                  {/* Subject badge */}
                  <span className='bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium'>
                    📚 {set.subject}
                  </span>
                </div>
              </div>

              {/* Action buttons on the right */}
              <div className='flex gap-3 ml-4'>
                {/* Study button */}
                <button
                  onClick={() => startStudying(set)}
                  className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition'
                >
                  Study
                </button>

                {/* Quiz button */}
                <button
                  onClick={() => startQuiz(set)}
                  className='bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg font-medium transition'
                >
                  Quiz
                </button>

                {/* Delete button */}
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this set?')) {
                      deleteSet(index)
                    }
                  }}
                  className='text-red-500 hover:text-red-700 px-4 py-2 font-bold transition'
                  title='Delete this set'
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home