import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Generate() {
 const [notes, setNotes] = useState('')
 const [title, setTitle] = useState('')
 const [subject, setSubject] = useState('General')
 const [numberOfCards, setNumberOfCards] = useState(10)
 const [isLoading, setIsLoading] = useState(false)
 const [errorMessage, setErrorMessage] = useState('')
 const navigate = useNavigate()
 async function handleGenerate() {
 if (!notes.trim()) {
 setErrorMessage('Please paste your notes first!')
 return
 }
 if (!title.trim()) {
 setErrorMessage('Please enter a set name!')
 return
 }
 setErrorMessage('')
 setIsLoading(true)

 try {
 const apiKey = import.meta.env.VITE_GEMINI_KEY
 const response = await fetch(
 'https://generativelanguage.googleapis.com/v1beta/'
 + 'models/gemini-2.0-flash:generateContent?key='
 + apiKey,
 {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 contents: [{
 parts: [{
 text: 'Create ' + numberOfCards
 + ' flashcards from these notes. '
 + 'Return ONLY a JSON array: '
 + '[{"question":"...","answer":"..."}] '
 + 'Notes: ' + notes
 }]
 }]
 })
 }
 )
 const data = await response.json()
 const responseText =
 data.candidates[0].content.parts[0].text
 // Clean markdown code fences if AI adds them
 const cleanText = responseText
 .replace(/```json/g, '')
 .replace(/```/g, '')
 .trim()
 const generatedCards = JSON.parse(cleanText)
 // Save to localStorage for Preview page
 localStorage.setItem('currentCards',
 JSON.stringify(generatedCards))
 localStorage.setItem('currentSetInfo',
 JSON.stringify({ title, subject }))
 navigate('/preview')
 } catch (error) {
 console.error('Error:', error)
 setErrorMessage('Something went wrong!')
 }
 setIsLoading(false)
 }
 return (
 <div className='min-h-screen bg-gray-50 px-6 py-10'>
 <div className='max-w-2xl mx-auto'>
 <h1 className='text-3xl font-bold text-gray-900 mb-2'>
 Generate Flashcards
 </h1>
 {/* Set Name */}
 <div className='mb-5'>
 <label className='block text-sm font-medium
 text-gray-700 mb-1'>Set Name</label>
 <input type='text'
 placeholder='e.g. Poisson Distribution'
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className='w-full border border-gray-300
 rounded-xl px-4 py-3 text-sm
 focus:ring-2 focus:ring-orange-400
 focus:outline-none' />
 </div>
 {/* Subject + Number */}
 <div className='flex gap-4 mb-5'>
 <div className='flex-1'>
 <label className='block text-sm mb-1'>Subject</label>
 <select value={subject}
 onChange={(e) => setSubject(e.target.value)}
 className='w-full border border-gray-300
 rounded-xl px-4 py-3 text-sm'>
 <option>General</option>
 <option>Statistics</option>
 <option>Web Development</option>
 <option>Mathematics</option>
 <option>Other</option>
 </select>
 </div>
 <div className='flex-1'>
 <label className='block text-sm mb-1'>Cards</label>
 <select value={numberOfCards}
 onChange={(e) => setNumberOfCards(e.target.value)}
 className='w-full border border-gray-300
 rounded-xl px-4 py-3 text-sm'>
 <option value={5}>5 cards</option>
 <option value={10}>10 cards</option>
 <option value={15}>15 cards</option>
 <option value={20}>20 cards</option>
 </select>
 </div>
 </div>
 {/* Notes */}
 <div className='mb-5'>
 <label className='block text-sm mb-1'>Your Notes</label>
 <textarea
 placeholder='Paste your lecture notes here...'
 value={notes}
 onChange={(e) => setNotes(e.target.value)}
 rows={10}
 className='w-full border border-gray-300
 rounded-xl px-4 py-3 text-sm
 focus:ring-2 focus:ring-orange-400
 focus:outline-none resize-none' />
 <p className='text-xs text-gray-400 mt-1 text-right'>
 {notes.length} characters
 </p>
 </div>
 {errorMessage && (
 <div className='bg-red-50 border border-red-200
 text-red-600 rounded-xl px-4
 py-3 text-sm mb-5'>
 {errorMessage}
 </div>
 )}
 <button onClick={handleGenerate} disabled={isLoading}
 className='w-full bg-orange-500 hover:bg-orange-600
 disabled:bg-orange-300 text-white py-4
 rounded-xl text-lg font-semibold'>
 {isLoading ? 'Generating...' : 'Generate Flashcards'}
 </button>
 </div>
 </div>
 )
}
export default Generate