# 📚 FlashGen - Complete Code Guide & Learning Resource

## Table of Contents
1. [Project Overview](#project-overview)
2. [React Fundamentals](#react-fundamentals)
3. [Project Structure](#project-structure)
4. [Key Concepts Explained](#key-concepts-explained)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [All Files Explained](#all-files-explained)
8. [Learning Topics](#learning-topics)

---

## 🎯 Project Overview

**FlashGen** is a web application that helps students create flashcards from their notes using AI. 

### What it does:
1. User pastes notes
2. AI (Google Gemini) reads the notes
3. AI generates flashcards automatically
4. User studies, quizzes, or reviews flashcards
5. All data saved in browser storage

### Tech Stack:
- **Frontend:** React 18
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **AI API:** Google Gemini 2.0
- **Storage:** Browser LocalStorage

---

## 🔥 React Fundamentals

### What is React?
React is a JavaScript library for building user interfaces. It makes it easy to create interactive websites.

### Core Concepts:

#### 1. **Components**
Components are reusable pieces of UI. Think of them as LEGO blocks.

```javascript
// This is a component
function Navbar() {
  return (
    <nav>
      <h1>FlashGen</h1>
    </nav>
  )
}
```

#### 2. **State (useState)**
State is data that can change. When state changes, React automatically updates the UI.

```javascript
import { useState } from 'react'

function Counter() {
  // Create state: [currentValue, functionToChange]
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add 1
      </button>
    </div>
  )
}
```

**How it works:**
- `useState(0)` - Initial value is 0
- `count` - Read the current value
- `setCount()` - Update the value
- When you call `setCount()`, React re-renders the component

#### 3. **Effects (useEffect)**
Effects run code when a component loads or when certain values change.

```javascript
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // This code runs when component loads
    console.log('Component loaded!')
    
    // Load data from API or storage
    const data = localStorage.getItem('myData')
    
  }, []) // Empty [] = run only once
}
```

**When to use:**
- Load data when page opens
- Set up event listeners
- Clean up resources
- Fetch from APIs

#### 4. **Props (Component Communication)**
Props are like function parameters - they pass data from parent to child.

```javascript
// Parent component
function Home() {
  const title = "Welcome"
  return <Card title={title} />
}

// Child component
function Card(props) {
  return <h1>{props.title}</h1>
}
```

#### 5. **Conditional Rendering**
Show different content based on conditions.

```javascript
function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  )
}
```

#### 6. **Lists & Mapping**
Render multiple items from an array.

```javascript
function CardList() {
  const cards = [
    { id: 1, question: "What is React?" },
    { id: 2, question: "What is state?" }
  ]
  
  return (
    <div>
      {cards.map((card) => (
        <div key={card.id}>
          {card.question}
        </div>
      ))}
    </div>
  )
}
```

---

## 📁 Project Structure

```
FlashGen/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          (Main page with saved sets)
│   │   ├── Generate.jsx      (Create flashcards from notes)
│   │   ├── Preview.jsx       (Review cards before saving)
│   │   ├── Study.jsx         (Study/review mode)
│   │   └── Quiz.jsx          (Multiple choice quiz)
│   ├── components/
│   │   ├── Navbar.jsx        (Navigation bar)
│   │   └── FlashCard.jsx     (Flipping card component)
│   ├── App.jsx               (Main app + routing)
│   ├── main.jsx              (Entry point)
│   └── index.css             (Global styles)
├── .env                      (API key configuration)
├── vite.config.js            (Build configuration)
└── package.json              (Dependencies)
```

---

## 💡 Key Concepts Explained

### 1. **Client-Side Routing**
Routing lets you navigate between pages without reloading.

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/study" element={<Study />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**How it works:**
- `/` shows Home page
- `/generate` shows Generate page
- No server requests needed!

### 2. **LocalStorage**
LocalStorage saves data in the browser. It persists even after closing.

```javascript
// Save data
localStorage.setItem('myKey', JSON.stringify(myData))

// Get data
const data = JSON.parse(localStorage.getItem('myKey'))

// Delete data
localStorage.removeItem('myKey')

// Clear all
localStorage.clear()
```

**Use cases:**
- Save flashcards created
- Save user preferences
- Cache API responses

### 3. **API Calls with Fetch**
Fetch is how you communicate with servers/APIs.

```javascript
async function callAPI() {
  try {
    // Send request
    const response = await fetch('https://api.example.com/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John' })
    })
    
    // Get response
    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Error:', error)
  }
}
```

**Key parts:**
- `await` - Wait for the request to complete
- `response.ok` - Check if request succeeded
- `response.json()` - Convert response to readable format

### 4. **Environment Variables**
Store sensitive data like API keys safely.

**.env file:**
```
VITE_GEMINI_KEY=AIzaSy...
```

**Use in code:**
```javascript
const apiKey = import.meta.env.VITE_GEMINI_KEY
```

---

## 🔌 API Integration

### Google Gemini API

The Gemini API generates text using AI. We use it to create flashcards.

**How our app uses it:**

1. **User enters notes** → State stored in React
2. **User clicks Generate** → handleGenerate() function runs
3. **We send to Gemini API** → Fetch request with notes
4. **Gemini returns flashcards** → As JSON text
5. **We parse and save** → Convert to JavaScript objects
6. **Display to user** → Show on Preview page

**Example API call:**
```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: 'Create 10 flashcards from these notes: ' + notes
        }]
      }]
    })
  }
)
```

---

## 🧠 State Management

### Global State Flow:

```
┌─────────────────────────────────────────┐
│           User Action                   │
│    (Paste notes, Click button)          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│        State Updates                    │
│  (setNotes, setTitle, etc.)             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       React Re-renders                  │
│   (Shows new UI automatically)          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      User Sees Update                   │
│   (Updated form, new buttons)           │
└─────────────────────────────────────────┘
```

### Example State in Generate.jsx:

```javascript
// Notes that user types
const [notes, setNotes] = useState('')

// Title of the flashcard set
const [title, setTitle] = useState('')

// Loading state - show spinner
const [isLoading, setIsLoading] = useState(false)

// Error messages
const [errorMessage, setErrorMessage] = useState('')
```

---

## 📄 All Files Explained

### **1. src/main.jsx** (Entry Point)
```javascript
// This is the first file that runs
// It finds the HTML element with id="root"
// And renders the React app inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### **2. src/App.jsx** (Main App)
```javascript
// Sets up routing - defines which page shows for which URL
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/study" element={<Study />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### **3. src/components/Navbar.jsx** (Navigation)
```javascript
// Shows on every page
// Helps user navigate between pages
function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/generate">+ Generate</Link>
    </nav>
  )
}
```

### **4. src/pages/Home.jsx** (Main Page)
**What it does:**
- Shows all saved flashcard sets
- Lets user study or quiz
- Shows statistics (total cards, sets)
- Delete old sets

**Key features:**
- Loads saved sets from localStorage on mount
- Maps over sets to display each one
- Click "Study" → saves set to temp storage → navigates to Study page
- Click "Delete" → removes from localStorage

**State:**
```javascript
const [savedSets, setSavedSets] = useState([])
```

### **5. src/pages/Generate.jsx** (Create Flashcards)
**What it does:**
- User enters: notes, title, subject, card count
- Calls Gemini API to generate flashcards
- Shows loading spinner while waiting
- Shows error messages if something fails
- Saves to localStorage and navigates to Preview

**Key functions:**
```javascript
// Validate user input
if (!notes.trim()) throw error

// Call Gemini API
fetch(geminiUrl, {...})

// Parse response
JSON.parse(cleanText)

// Save to storage
localStorage.setItem('currentCards', JSON.stringify(cards))
```

**State:**
```javascript
const [notes, setNotes] = useState('')
const [title, setTitle] = useState('')
const [numberOfCards, setNumberOfCards] = useState(10)
const [isLoading, setIsLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState('')
```

### **6. src/pages/Preview.jsx** (Review Flashcards)
**What it does:**
- Shows all generated flashcards
- Lets user save the set
- Lets user study or go back
- Shows flashcard count

**Key features:**
- Loads cards from localStorage on mount
- Displays each card with question and answer
- "Save" button stores to permanent storage
- "Study Now" takes to Study page
- "Back" goes to Generate page

**State:**
```javascript
const [cards, setCards] = useState([])
const [setInfo, setSetInfo] = useState({
  title: 'My Set',
  subject: 'General'
})
```

### **7. src/pages/Study.jsx** (Learning Mode)
**What it does:**
- User reviews flashcards one by one
- Rate each card: "Got it", "Almost", "Nope"
- Shows progress bar
- Tracks which cards are hard

**Key features:**
- Flip between question and answer on click
- Rate card → moves to next
- Shows statistics at end
- Can restart or take quiz
- "Previous" and "Skip" buttons

**State:**
```javascript
const [cards, setCards] = useState([])
const [currentIndex, setCurrentIndex] = useState(0)
const [scores, setScores] = useState({})
const [isFinished, setIsFinished] = useState(false)
```

### **8. src/pages/Quiz.jsx** (Test Mode)
**What it does:**
- Multiple choice quiz
- 4 options per question
- Shows correct/wrong after answering
- Calculates score percentage
- Shows cards you got wrong at end

**Key features:**
- Generates 3 wrong answers from other cards
- Shuffles all 4 options
- Colors: green (correct), red (wrong)
- Disables button after answering
- Final score with percentage

**State:**
```javascript
const [cards, setCards] = useState([])
const [currentIndex, setCurrentIndex] = useState(0)
const [selectedAnswer, setSelectedAnswer] = useState(null)
const [score, setScore] = useState(0)
const [wrongCards, setWrongCards] = useState([])
const [isFinished, setIsFinished] = useState(false)
```

### **9. src/components/FlashCard.jsx** (Flipping Card)
**What it does:**
- Shows question on front
- Flips to show answer on back
- 3D animation when clicking

**How it works:**
- Uses CSS `transform: rotateY(180deg)` for 3D flip effect
- `backfaceVisibility: 'hidden'` hides back while showing front

**State:**
```javascript
const [isFlipped, setIsFlipped] = useState(false)
```

---

## 📚 Learning Topics

### Topic 1: **React Hooks**
Hooks let you use state and effects in functional components.

**useState** - Manage state
```javascript
const [name, setName] = useState('John')
```

**useEffect** - Run effects
```javascript
useEffect(() => {
  // Do something
}, [dependencies])
```

**useNavigate** - Navigate between pages
```javascript
const navigate = useNavigate()
navigate('/home')
```

### Topic 2: **Conditional Rendering**
Show content based on conditions.

**Ternary operator:**
```javascript
{isLoading ? <div>Loading...</div> : <div>Done!</div>}
```

**&&Operator:**
```javascript
{errorMessage && <div>{errorMessage}</div>}
```

**if statements:**
```javascript
if (condition) {
  return <Component />
}
```

### Topic 3: **Array Methods**
Working with arrays of data.

**map() - Transform each item:**
```javascript
const doubled = numbers.map(n => n * 2)
```

**filter() - Keep only some items:**
```javascript
const adults = people.filter(p => p.age >= 18)
```

**find() - Find first matching item:**
```javascript
const admin = users.find(u => u.role === 'admin')
```

**reduce() - Combine items into one value:**
```javascript
const total = numbers.reduce((sum, n) => sum + n, 0)
```

### Topic 4: **Event Handling**
Respond to user actions.

**Click:**
```javascript
<button onClick={() => setCount(count + 1)}>
  Add 1
</button>
```

**Change (input):**
```javascript
<input onChange={(e) => setName(e.target.value)} />
```

**Submit (form):**
```javascript
<form onSubmit={(e) => {
  e.preventDefault()
  // Handle form
}}>
```

### Topic 5: **Forms in React**
Controlled components - React controls form values.

```javascript
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <form>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button>Login</button>
    </form>
  )
}
```

### Topic 6: **Local Storage**
Store data in browser.

```javascript
// Save
localStorage.setItem('user', JSON.stringify({name: 'John'}))

// Load
const user = JSON.parse(localStorage.getItem('user'))

// Check if exists
if (localStorage.getItem('user')) {
  // User data exists
}
```

### Topic 7: **Fetch API**
Make requests to APIs.

```javascript
// Simple GET
const data = await fetch('/api/data')
  .then(r => r.json())

// POST with data
const response = await fetch('/api/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})
```

### Topic 8: **Async/Await**
Handle asynchronous operations.

```javascript
async function loadData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

## 🎓 Practice Exercises

### Exercise 1: Add a new page
Create a page for "My Progress" that shows stats about study sessions.

### Exercise 2: Modify the Quiz
Change the quiz to show the correct answer immediately, and let users skip instead of forcing them to choose.

### Exercise 3: Add Tags
Let users tag flashcards with topics (Math, Science, etc.) and filter by tag.

### Exercise 4: Export/Import
Add ability to export flashcards as JSON and import from a file.

### Exercise 5: Statistics
Track how many times user studied each card and show most-studied cards.

---

## 🚀 Deployment

### Steps to deploy:

1. **Build for production:**
```bash
npm run build
```

2. **Deploy to Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

3. **Or use GitHub Pages:**
```bash
npm i gh-pages
# Add to package.json scripts
# "deploy": "gh-pages -d dist"
```

---

## 📖 Additional Resources

**Learn React:**
- https://react.dev (Official React docs)
- https://scrimba.com/learn/react (Interactive tutorial)

**Learn JavaScript:**
- https://javascript.info (Comprehensive guide)
- https://developer.mozilla.org (MDN docs)

**Learn Tailwind:**
- https://tailwindcss.com/docs (Official docs)
- https://tailwindui.com (Component examples)

**Learn APIs:**
- https://jsonplaceholder.typicode.com (Test API)
- https://rapidapi.com (Find APIs)

---

## ✨ Summary

You've learned:
✅ React fundamentals (components, state, effects)
✅ How to build a real web app
✅ How to use APIs
✅ How to manage data with localStorage
✅ How to create interactive UIs
✅ How to deploy applications

**Congratulations!** You can now build your own React apps! 🎉

---

**Made with ❤️ by FlashGen**
