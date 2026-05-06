import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [savedSets, setSavedSets] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const savedData = localStorage.getItem('flashSets')
    if (savedData) {
      setSavedSets(JSON.parse(savedData))
    }
  }, [])

  function startStudying(set) {
    localStorage.setItem('currentCards', JSON.stringify(set.cards))
    navigate('/study')
  }

  function startQuiz(set) {
    localStorage.setItem('currentCards', JSON.stringify(set.cards))
    navigate('/quiz')
  }

  function deleteSet(indexToRemove) {
    const updatedSets = savedSets.filter((_, index) => index !== indexToRemove)
    setSavedSets(updatedSets)
    localStorage.setItem('flashSets', JSON.stringify(updatedSets))
  }
  const totalCardCount = savedSets.reduce(
    (sum, set) => sum + set.cards.length,
    0
  )

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
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

      <div className='flex justify-center gap-8 mb-12'>
        <div className='bg-white border border-gray-200 rounded-xl px-12 py-6 text-center'>
          <p className='text-4xl font-bold text-orange-500'>
            {savedSets.length}
          </p>
          <p className='text-gray-600 mt-2 font-medium'>Sets Created</p>
        </div>

        <div className='bg-white border border-gray-200 rounded-xl px-12 py-6 text-center'>
          <p className='text-4xl font-bold text-orange-500'>
            {totalCardCount}
          </p>
          <p className='text-gray-600 mt-2 font-medium'>Total Cards</p>
        </div>
      </div>

      <div className='max-w-3xl mx-auto'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          📚 Your Saved Sets
        </h2>

        {savedSets.length === 0 && (
          <div className='text-center py-20 bg-white border border-gray-200 rounded-2xl'>
            <p className='text-5xl mb-4'>🎯</p>
            <p className='text-gray-500 text-lg font-medium'>
              No sets yet! Create your first one to get started.
            </p>
          </div>
        )}

        {savedSets.map((set, index) => (
          <div
            key={index}
            className='bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition'
          >
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>
                  {set.title}
                </h3>

                <div className='flex gap-3 items-center'>
                  <span className='text-sm text-gray-600'>
                    🎴 {set.cards.length} cards
                  </span>

                  <span className='bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium'>
                    📚 {set.subject}
                  </span>
                </div>
              </div>

              <div className='flex gap-3 ml-4'>
                <button
                  onClick={() => startStudying(set)}
                  className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition'
                >
                  Study
                </button>

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