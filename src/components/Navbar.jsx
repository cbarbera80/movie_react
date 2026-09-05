import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-gray-900 text-white shadow-md">
      <div className="px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-lg tracking-tight shrink-0">
          <span className="sm:hidden">🎬 ME</span>
          <span className="hidden sm:inline">Movie Explorer</span>
        </NavLink>
        <nav className="flex gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}