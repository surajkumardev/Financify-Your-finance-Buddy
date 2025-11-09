import { Link } from 'react-router-dom'
import logo from '../assets/logoo.png'

export default function Navbar() {
  const authed = !!localStorage.getItem('token')
  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-500/20 bg-[#0b1220]/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center" aria-label="Financify home">
            <img src={logo} alt="Financify logo" className="h-8 w-auto" />
          </Link>
          <Link to="/about" className="text-slate-300 hover:text-white text-sm">About</Link>
          <a href="/discover" className="text-slate-300 hover:text-white text-sm">Discover</a>
          {/* <a href="/services" className="text-slate-300 hover:text-white text-sm">Services</a> */}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {authed && (
            <Link to="/dashboard" className="text-slate-300 hover:text-white text-sm">Dashboard</Link>
          )}
          {authed ? null : (
            <>
              <Link to="/login" className="px-3 py-1.5 rounded-full border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-black transition">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


// import { Link } from 'react-router-dom'
// import logo from '../assets/logoo.png'

// export default function Navbar() {
//   const authed = !!localStorage.getItem('token')

//   return (
//     <nav className="sticky top-0 z-50 border-b border-emerald-500/30 bg-[#0b1220]/90 backdrop-blur-md shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Left Section */}
//         <div className="flex items-center gap-8">
//           <Link to="/" className="flex items-center group" aria-label="Financify Home">
//             <img src={logo} alt="Financify Logo" className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" />
//             <span className="ml-2 text-lg font-semibold text-emerald-400 tracking-wide">Financify</span>
//           </Link>

//           <div className="hidden sm:flex items-center gap-6">
//             <Link to="/about" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm">About</Link>
//             <a href="#discover" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm">Discover</a>
//             <a href="#services" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm">Services</a>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3 text-sm">
//           {authed ? (
//             <Link
//               to="/dashboard"
//               className="px-3 py-1.5 rounded-full border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black font-medium transition-all duration-300"
//             >
//               Dashboard
//             </Link>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="px-3 py-1.5 rounded-full border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-black font-medium transition-all duration-300"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-3 py-1.5 rounded-full bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300"
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }


// import { Link } from 'react-router-dom'
// import logo from '../assets/logoo.png'

// export default function Navbar() {
//   const authed = !!localStorage.getItem('token')

//   return (
//     <nav className="sticky top-0 z-50 border-b border-emerald-500/30 bg-[#0b1220]/90 backdrop-blur-md shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Left Section */}
//         <div className="flex items-center gap-8">
//           <Link to="/" className="flex items-center group" aria-label="Financify Home">
//             <img
//               src={logo}
//               alt="Financify Logo"
//               className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
//             />
//           </Link>

//           <div className="hidden sm:flex items-center gap-6">
//             <Link
//               to="/about"
//               className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
//             >
//               About
//             </Link>
//             <a
//               href="#discover"
//               className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
//             >
//               Discover
//             </a>
//             <a
//               href="#services"
//               className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
//             >
//               Services
//             </a>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3 text-sm">
//           {authed ? (
//             <Link
//               to="/dashboard"
//               className="px-3 py-1.5 rounded-full border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black font-medium transition-all duration-300"
//             >
//               Dashboard
//             </Link>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="px-3 py-1.5 rounded-full border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-black font-medium transition-all duration-300"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-3 py-1.5 rounded-full bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all duration-300"
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }
