import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Anchor, Bell, Menu, Settings, UserCircle, X } from 'lucide-react'

const navigationLinks = [
  { label: 'Find Jobs', to: '/find-jobs' },
  { label: 'Find Talent', to: '/find-talent' },
  { label: 'Upload Job', to: '/post-job' },
  { label: 'About us', to: '/about' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClassName = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-[#FFB800] ${
      isActive ? 'text-[#FFB800]' : 'text-gray-300'
    }`

  return (
    <header className="relative z-10 border-b border-white/10 bg-[#292929] text-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[70px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Link
          to="/"
          aria-label="JobHook home"
          className="flex shrink-0 items-center gap-2 text-[#FFB800]"
          onClick={() => setMenuOpen(false)}
        >
          <Anchor aria-hidden="true" className="size-6" strokeWidth={2.5} />
          <span className="text-xl font-bold">JobHook</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navigationLinks.map(({ label, to }) => (
            <NavLink key={to} to={to} className={linkClassName}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-4 sm:gap-5">
          <span className="hidden text-sm font-medium text-gray-200 sm:inline">
            Marshall
          </span>
          <button
            type="button"
            aria-label="Your profile"
            className="text-gray-300 transition-colors hover:text-[#FFB800]"
          >
            <UserCircle aria-hidden="true" className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Settings"
            className="hidden text-gray-300 transition-colors hover:text-[#FFB800] sm:inline-flex"
          >
            <Settings aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="text-gray-300 transition-colors hover:text-[#FFB800]"
          >
            <Bell aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="text-gray-200 transition-colors hover:text-[#FFB800] lg:hidden"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-white/10 bg-[#292929] px-5 py-4 shadow-lg lg:hidden sm:px-8"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigationLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClassName}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar