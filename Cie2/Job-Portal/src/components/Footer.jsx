import { Anchor } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerGroups = [
  {
    title: 'Product',
    links: [['Find Job', '/find-jobs'], ['Find Company', '/company'], ['Find Employee', '/find-talent']],
  },
  {
    title: 'Company',
    links: [['About Us', '/about'], ['Contact Us', '/about'], ['Privacy Policy', '/about'], ['Terms & Conditions', '/about']],
  },
  {
    title: 'Support',
    links: [['Help & Support', '/about'], ['Feedback', '/about'], ['FAQs', '/about']],
  },
]

function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#242424]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold text-[#FFB800]">
            <Anchor aria-hidden="true" className="size-5" /> JobHook
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Job portal with user profiles, skill updates, certifications, work experience and admin job postings.
          </p>
        </div>
        {footerGroups.map(({ title, links }) => (
          <div key={title}>
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <ul className="mt-4 space-y-3">
              {links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 transition-colors hover:text-[#FFB800]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-gray-500 sm:px-8">
          &copy; {new Date().getFullYear()} JobHook. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer