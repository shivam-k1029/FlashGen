import { useState } from 'react'

// FlashCard component: Interactive flip card to display questions and answers
// Props:
//   - question: The text to show on the front
//   - answer: The text to show on the back
function FlashCard({ question, answer }) {
  // ===== STATE VARIABLES =====
  // Tracks whether the card is flipped (showing answer or question)
  const [isFlipped, setIsFlipped] = useState(false)

  // ===== HELPER FUNCTIONS =====

  // Toggle between showing question and answer
  function toggleFlip() {
    setIsFlipped(!isFlipped)
  }

  // ===== UI / CARD DISPLAY =====
  return (
    <div
      onClick={toggleFlip}
      className='cursor-pointer w-full h-52'
      style={{ perspective: '1000px' }}
    >
      {/* Container that rotates when flipped */}
      <div
        className='w-full h-full relative transition-transform duration-500'
        style={{
          transformStyle: 'preserve-3d', // Enable 3D flip effect
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' // Rotate on Y axis
        }}
      >
        {/* FRONT SIDE - Shows Question */}
        <div
          className='absolute inset-0 bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center'
          style={{ backfaceVisibility: 'hidden' }} // Hide when flipped
        >
          <p className='text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4'>
            ❓ Question
          </p>
          <p className='text-xl font-bold text-gray-800 leading-relaxed'>
            {question}
          </p>
          <p className='text-xs text-gray-400 mt-8'>
            👆 Click to reveal answer
          </p>
        </div>

        {/* BACK SIDE - Shows Answer */}
        <div
          className='absolute inset-0 bg-orange-50 border-2 border-orange-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center'
          style={{
            backfaceVisibility: 'hidden', // Hide when not flipped
            transform: 'rotateY(180deg)' // Pre-flip so it shows when parent rotates
          }}
        >
          <p className='text-xs text-orange-600 uppercase tracking-widest font-semibold mb-4'>
            ✅ Answer
          </p>
          <p className='text-xl font-bold text-orange-900 leading-relaxed'>
            {answer}
          </p>
          <p className='text-xs text-orange-500 mt-8'>
            👆 Click to see question
          </p>
        </div>
      </div>
    </div>
  )
}

export default FlashCard