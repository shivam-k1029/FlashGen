import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Generate from './pages/Generate'
import Preview from './pages/Preview'
import Study from './pages/Study'
import Quiz from './pages/Quiz'
import Navbar from './components/Navbar'
function App() {
 return (
 <BrowserRouter>
 <Navbar />
 <Routes>
 <Route path='/' element={<Home />} />
 <Route path='/generate' element={<Generate />} />
 <Route path='/preview' element={<Preview />} />
 <Route path='/study' element={<Study />} />
 <Route path='/quiz' element={<Quiz />} />
 </Routes>
 </BrowserRouter>
 )
}
export default App