import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Generate.jsx
// This is the most important page in FlashGen
// The user pastes their notes here and Groq AI creates flashcards

function Generate() {

  // ── STATE VARIABLES ──────────────────────────────────────
  // These are like boxes that store information on this page

  // Stores whatever the user types in the notes box
  var [notes, setNotes] = useState('')

  // Stores the name the user gives to this card set
  // Example: "Poisson Distribution" or "React Hooks"
  var [title, setTitle] = useState('')

  // Stores which subject the user picks from the dropdown
  var [subject, setSubject] = useState('General')

  // Stores how many cards the user wants to generate
  var [numberOfCards, setNumberOfCards] = useState(10)

  // true = show the loading spinner, false = hide it
  // We set this to true while waiting for AI to respond
  var [isLoading, setIsLoading] = useState(false)

  // Stores any error message to show the user
  // If this is empty '' then no error is shown
  var [errorMessage, setErrorMessage] = useState('')

  // useNavigate lets us go to another page in the code
  // Example: navigate('/preview') takes user to Preview page
  var navigate = useNavigate()


  // ── MAIN FUNCTION ────────────────────────────────────────
  // This runs when the user clicks the Generate button
  // It checks the form, calls the AI, and saves the cards

  async function handleGenerate() {

    // Check 1: Did the user paste any notes?
    if (!notes.trim()) {
      setErrorMessage('Please paste your notes first!')
      return // Stop here — do not continue
    }

    // Check 2: Did the user give this set a name?
    if (!title.trim()) {
      setErrorMessage('Please enter a name for this card set!')
      return // Stop here — do not continue
    }

    // All checks passed — clear any old error message
    setErrorMessage('')

    // Show the loading spinner on the button
    setIsLoading(true)

    try {

      // Get the Groq API key from the .env file
      // The key is stored as VITE_GROQ_KEY in .env
      var apiKey = import.meta.env.VITE_GROQ_KEY

      // ── CALL GROQ AI ──────────────────────────────────────
      // Groq uses the same format as OpenAI
      // We send the notes and ask for flashcards in JSON format

      var response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Groq uses Bearer token for authentication
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            // llama3-8b-8192 is a fast and free model on Groq
            model: 'llama-3.3-70b-versatile',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                // This is the instruction we give to the AI
                // We tell it exactly what format to return
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

      // Convert the response to a JavaScript object
      var data = await response.json()

      // Check if Groq returned an error message
      if (data.error) {
        console.error('Groq error:', data.error)
        setErrorMessage('API error: ' + data.error.message)
        setIsLoading(false)
        return
      }

      // Groq response text is inside this path
      // Groq uses OpenAI format — different from Gemini
      var responseText = data.choices[0].message.content

      // Clean up any code fences just in case AI adds them
      var cleanText = responseText
        .replace(/```json/g, '')   // remove ```json at the start
        .replace(/```/g, '')        // remove ``` at the end
        .trim()                     // remove extra spaces

      // Convert the text string into a real JavaScript array
      // Now generatedCards looks like:
      // [ {question: '...', answer: '...'}, ... ]
      var generatedCards = JSON.parse(cleanText)

      // ── SAVE TO LOCALSTORAGE ────────────────────────────
      // We save the cards so the Preview page can read them
      // localStorage is like a small database in the browser

      localStorage.setItem('currentCards', JSON.stringify(generatedCards))

      // Save the set title and subject for Preview page
      localStorage.setItem('currentSetInfo', JSON.stringify({
        title: title,
        subject: subject
      }))

      // Everything worked — go to the Preview page
      navigate('/preview')

    } catch (error) {

      // Something went wrong — show error to the user
      // The real error is printed in browser console (F12)
      console.error('Error calling Groq API:', error)
      setErrorMessage('Something went wrong. Please check your API key and try again.')

    }

    // Hide the loading spinner — we are done
    setIsLoading(false)

  }


  // ── WHAT THE PAGE LOOKS LIKE ─────────────────────────────
  // Everything inside return() is the HTML/JSX for this page

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-10'>
      <div className='max-w-2xl mx-auto'>

        {/* Page heading */}
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Generate Flashcards ✦
        </h1>
        <p className='text-gray-500 mb-8'>
          Paste your lecture notes below and AI will create flashcards for you.
        </p>

        {/* ── SET NAME INPUT ── */}
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

        {/* ── SUBJECT AND NUMBER OF CARDS — side by side ── */}
        <div className='flex gap-4 mb-5'>

          {/* Subject dropdown */}
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

          {/* Number of cards dropdown */}
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

        {/* ── NOTES TEXTAREA ── */}
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
Props pass data from parent to child components.'
            value={notes}
            onChange={function(e) { setNotes(e.target.value) }}
            rows={10}
            className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none'
          />
          {/* Shows how many characters the user has typed */}
          <p className='text-xs text-gray-400 mt-1 text-right'>
            {notes.length} characters
          </p>
        </div>

        {/* ── ERROR MESSAGE ── */}
        {/* This box only appears when errorMessage is not empty */}
        {errorMessage && (
          <div className='bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5'>
            ⚠️ {errorMessage}
          </div>
        )}

        {/* ── GENERATE BUTTON ── */}
        {/* disabled={isLoading} means button cannot be clicked while loading */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className='w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl text-lg font-semibold transition'
        >
          {/* Show different text depending on loading state */}
          {isLoading ? '✦ Generating your cards...' : '✦ Generate Flashcards'}
        </button>

        {/* ── LOADING MESSAGE ── */}
        {/* This little message shows below the button while loading */}
        {isLoading && (
          <p className='text-center text-gray-400 text-sm mt-3 animate-pulse'>
            AI is reading your notes... this takes a few seconds ☕
          </p>
        )}

      </div>
    </div>
  )
}

export default Generate