import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-gray-900 text-white px-6 py-4 flex items-center justify-between'>
      <Link to='/' className='text-2xl font-bold hover:opacity-80 transition'>
        Flash<span className='text-orange-400'>Gen</span>
      </Link>

      <div className='flex gap-6 items-center'>
        <Link
          to='/'
          className='text-gray-300 hover:text-white font-medium transition'
        >
          Home
        </Link>

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