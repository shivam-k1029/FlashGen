import { useState } from 'react'

function FlashCard({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false)

  function toggleFlip() {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      onClick={toggleFlip}
      className='cursor-pointer w-full h-52'
      style={{ perspective: '1000px' }}
    >
      <div
        className='w-full h-full relative transition-transform duration-500'
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        <div
          className='absolute inset-0 bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center'
          style={{ backfaceVisibility: 'hidden' }}
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

        <div
          className='absolute inset-0 bg-orange-50 border-2 border-orange-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center'
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
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