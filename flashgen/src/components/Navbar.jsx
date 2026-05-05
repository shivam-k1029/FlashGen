import { Link } from 'react-router-dom'
function Navbar() {
 return (
 <nav className='bg-gray-900 text-white px-6 py-4 flex items-center justify-between'>

 <Link to='/' className='text-xl font-bold'>
 Flash<span className='text-orange-400'>Gen</span>
 </Link>


 <div className='flex gap-4'>
 <Link to='/' className='text-gray-300 hover:text-white'>Home</Link>
 <Link to='/generate' className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg'>+ Generate</Link>
 </div>
 </nav>
 )
}
export default Navbar