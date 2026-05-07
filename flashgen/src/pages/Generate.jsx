import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Generate() {
  var [notes, setNotes] = useState('')
  var [title, setTitle] = useState('')
  var [subject, setSubject] = useState('General')
  var [numberOfCards, setNumberOfCards] = useState(10)
  var [isLoading, setIsLoading] = useState(false)
  var [errorMessage, setErrorMessage] = useState('')
  var navigate = useNavigate()


  async function handleGenerate() {
    if (!notes.trim()) {
      setErrorMessage('Please paste your notes first!')
      return
    }

    if (!title.trim()) {
      setErrorMessage('Please enter a name for this card set!')
      return
    }

    setErrorMessage('')
    setIsLoading(true)

    try {
      var apiKey = import.meta.env.VITE_GROQ_KEY

      var response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content:
                  'You are a helpful study assistant. ' +
                  'Read the notes below and create exactly ' + numberOfCards + ' flashcards. ' +
                  'Return ONLY a valid JSON array with no extra text and no code fences. ' +
                  'Use this exact format: ' +
                  '[{"question": "your question here", "answer": "your answer here"}] ' +
                  'Here are the notes: ' + notes
              }
            ]
          })
        }
      )

      var data = await response.json()

      if (data.error) {
        console.error('Groq error:', data.error)
        setErrorMessage('API error: ' + data.error.message)
        setIsLoading(false)
        return
      }

      var responseText = data.choices[0].message.content

      var cleanText = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      var generatedCards = JSON.parse(cleanText)

      localStorage.setItem('currentCards', JSON.stringify(generatedCards))

      localStorage.setItem('currentSetInfo', JSON.stringify({
        title: title,
        subject: subject
      }))

      navigate('/preview')

    } catch (error) {
      console.error('Error calling Groq API:', error)
      setErrorMessage('Something went wrong. Please check your API key and try again.')
    }

    setIsLoading(false)

  }


  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Generate Flashcards ✦
        </h1>
        <p className='text-gray-500 mb-8'>
          Paste your lecture notes below and AI will create flashcards for you.
        </p>

        <div className='mb-5'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Set Name
          </label>
          <input
            type='text'
            placeholder='e.g. Poisson Distribution, React Hooks...'
            value={title}
            onChange={function(e) { setTitle(e.target.value) }}
            className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400'
          />
        </div>

        <div className='flex gap-4 mb-5'>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Subject
            </label>
            <select
              value={subject}
              onChange={function(e) { setSubject(e.target.value) }}
              className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none'
            >
              <option>General</option>
              <option>Statistics</option>
              <option>Web Development</option>
              <option>Technology and Policy</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>Other</option>
            </select>
          </div>

          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Number of Cards
            </label>
            <select
              value={numberOfCards}
              onChange={function(e) { setNumberOfCards(e.target.value) }}
              className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none'
            >
              <option value={5}>5 cards</option>
              <option value={10}>10 cards</option>
              <option value={15}>15 cards</option>
              <option value={20}>20 cards</option>
            </select>
          </div>
        </div>

        <div className='mb-5'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Your Notes
          </label>
          <textarea
            placeholder='Paste your lecture notes here...

Example:
React is a JavaScript library for building user interfaces.
Components are the building blocks of React applications.
useState is a hook that adds state to functional components.
useEffect runs code after the component renders.
Props pass data from parent to child components.
Navigate is a function from react-router-dom used to change routes programmatically.'
            value={notes}
            onChange={function(e) { setNotes(e.target.value) }}
            rows={10}
            className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none'
          />
          <p className='text-xs text-gray-400 mt-1 text-right'>
            {notes.length} characters
          </p>
        </div>

        {errorMessage && (
          <div className='bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5'>
             {errorMessage}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className='w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl text-lg font-semibold transition'
        >
          {isLoading ? '✦ Generating your cards...' : '✦ Generate Flashcards'}
        </button>

        {isLoading && (
          <p className='text-center text-gray-400 text-sm mt-3 animate-pulse'>
            AI is reading your notes... this takes a few seconds 
          </p>
        )}

      </div>
    </div>
  )
}

export default Generate