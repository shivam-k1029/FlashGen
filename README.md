# ⚡ FlashGen — AI-Powered Flashcard Generator

> Paste your lecture notes. Get flashcards instantly. Study smarter.

---

## 🧠 About the Project

**FlashGen** is an AI-powered flashcard generator built for students. Instead of spending hours manually creating flashcards, students simply paste their lecture notes and FlashGen uses AI to instantly generate Question & Answer study cards.

The app includes three study modes:
- **Flip Card Mode** — classic flashcard experience
- **Quiz Mode** — multiple choice questions with live scoring
- **Review Mode** — focused revision on weak cards

---

## 🚀 Live Demo

> 🔗 Coming soon

---

## 📸 Screenshots

> Screenshots will be added after development

---

## ✨ Features

- 📋 **Paste & Generate** — paste any lecture notes and generate up to 20 flashcards instantly
- 🤖 **AI-Powered** — uses Claude AI API to read notes and create meaningful Q&A pairs
- 🃏 **Flip Card Study** — tap to flip cards, mark as Got it / Almost / Didn't know
- 🎯 **Quiz Mode** — multiple choice questions generated from your cards
- 📊 **Score Tracking** — see your score and which cards need more revision
- 💾 **Save Sets** — card sets saved locally so you can study anytime
- 🏷️ **Subject Tags** — organise sets by subject (Statistics, Web Dev, Policy, etc.)
- 📱 **Responsive Design** — works on mobile and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Frontend UI framework |
| **React Router** | Page navigation |
| **Tailwind CSS** | Styling and responsive design |
| **Claude AI API** | Generate flashcards from notes |
| **localStorage** | Save card sets between sessions |
| **Vite** | Project build tool |

---

## 📁 Project Structure

```
flashgen/
├── public/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Landing page, saved sets
│   │   ├── Generate.jsx      # Paste notes, call AI
│   │   ├── Preview.jsx       # View generated cards
│   │   ├── Study.jsx         # Flip card study mode
│   │   └── Quiz.jsx          # Multiple choice quiz
│   ├── components/
│   │   ├── Navbar.jsx        # Top navigation bar
│   │   ├── FlashCard.jsx     # Single flip card component
│   │   └── QuizCard.jsx      # Single MCQ component
│   ├── App.jsx               # Routes setup
│   └── main.jsx              # Entry point
├── .env                      # API key (not committed)
├── .env.example              # Example env file
├── .gitignore
├── index.html
├── tailwind.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or above)
- npm or yarn
- Claude API key from [console.anthropic.com](https://console.anthropic.com)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/flashgen.git
cd flashgen
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env
```

Open `.env` and add your Claude API key:
```
REACT_APP_ANTHROPIC_KEY=your_api_key_here
```

**4. Start the development server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_ANTHROPIC_KEY=your_claude_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

---

## 📖 How to Use

**Step 1** — Open FlashGen and click **Generate New Set**

**Step 2** — Paste your lecture notes into the text box

**Step 3** — Enter a set name, choose subject tag and number of cards

**Step 4** — Click **Generate with AI** and wait a few seconds

**Step 5** — Preview your generated flashcards and save the set

**Step 6** — Study using **Flip Card mode** or test yourself in **Quiz mode**

**Step 7** — Check your score and review weak cards

---

## 🗺️ Pages Overview

| Page | Route | Description |
|---|---|---|
| Home | `/` | View all saved card sets and stats |
| Generate | `/generate` | Paste notes and generate cards |
| Preview | `/preview` | View generated cards before saving |
| Study | `/study` | Flip card study mode |
| Quiz | `/quiz` | Multiple choice quiz with scoring |

---

## 👥 Team

| Member | Enrollment No | Section |
|---|---|---|
| Shivam Kumar | 2501010428 | E |
| Avaneja Rikhta | 2501010105 | E |
| Deveshi Sahu | 2501010722 | E |

---

## 🗓️ Project Timeline

| Week | Tasks |
|---|---|
| Week 1 | Setup, Navbar, Home page, Generate page, Claude API |
| Week 2 | Preview page, FlashCard component, Study mode, Quiz mode |
| Week 3 | localStorage, Tailwind styling, testing, bug fixes, deployment |

---

## 🔮 Future Improvements

- [ ] User authentication (login/register)
- [ ] Cloud sync — save sets across devices
- [ ] Spaced repetition algorithm
- [ ] Import PDF notes directly
- [ ] Share card sets with friends
- [ ] Dark mode

---

## 📄 License

This project is built as a React Capstone Project for the NST-RU BTech 2025-2029 program.

---

## 🙏 Acknowledgements

- [Anthropic Claude API](https://www.anthropic.com) — for AI flashcard generation
- [React](https://react.dev) — frontend framework
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Newton School](https://www.newtonschool.co) — course and mentorship

---

<div align="center">
  Built with ❤️ by Team FlashGen — NST-RU BTech 2025-2029
</div>