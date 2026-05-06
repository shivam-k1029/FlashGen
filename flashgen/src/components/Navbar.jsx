import { Link } from 'react-router-dom'

// Navbar component: Navigation bar shown on every page
function Navbar() {
  return (
    <nav className='bg-gray-900 text-white px-6 py-4 flex items-center justify-between'>
      {/* Logo - links to home */}
      <Link to='/' className='text-2xl font-bold hover:opacity-80 transition'>
        Flash<span className='text-orange-400'>Gen</span>
      </Link>

      {/* Navigation links */}
      <div className='flex gap-6 items-center'>
        {/* Home link */}
        <Link
          to='/'
          className='text-gray-300 hover:text-white font-medium transition'
        >
          Home
        </Link>

        {/* Generate button - highlighted */}
        <Link
          to='/generate'
          className='bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transition'
        >
          ✨ + Generate
        </Link>
      </div>
    </nav>
  )
}

export default Navbar