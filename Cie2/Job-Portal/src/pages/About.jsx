import { ArrowRight, Compass, HeartHandshake, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'

const principles = [
  { title: 'People first', text: 'Good work starts with a place where people can do their best.', icon: HeartHandshake },
  { title: 'Make it clear', text: 'We make it easier to find the right role and the right people.', icon: Compass },
  { title: 'Keep growing', text: 'Every career move is a chance to learn, contribute, and grow.', icon: Lightbulb },
]

function About() {
  return (
    <main className="min-h-[70vh] bg-[#292929] text-white">
      <section className="border-b border-white/8 bg-[#252525] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">About JobHook</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Good work can change everything.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">We bring people and companies together around work that matters, making the next career step feel a little more possible.</p>
          <Link to="/find-jobs" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-bold text-[#242424] hover:bg-[#ffd05c]">Explore jobs <ArrowRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Our purpose</p>
            <h2 className="mt-3 text-3xl font-bold">Work should open doors.</h2>
          </div>
          <p className="text-base leading-8 text-gray-300">JobHook is a place to make meaningful connections between ambitious people and teams with room to grow. Candidates can share their skills and find their next opportunity. Employers can meet the people who will help shape what comes next.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {principles.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-2xl border border-white/8 bg-[#30302f] p-6"><span className="flex size-11 items-center justify-center rounded-xl bg-[#FFB800] text-[#292929]"><Icon aria-hidden="true" className="size-5" /></span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-400">{text}</p></article>)}
        </div>
      </section>
    </main>
  )
}

export default About