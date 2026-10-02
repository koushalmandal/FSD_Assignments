import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, MessageCircle, UserRound } from 'lucide-react'
import { talents } from '../data/jobData.js'

function FindTalent() {
  const [query, setQuery] = useState('')
  const [messageSent, setMessageSent] = useState('')
  const filteredTalents = talents.filter((talent) =>
    `${talent.name} ${talent.title} ${talent.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className="min-h-[70vh] bg-[#292929] text-white">
      <section className="border-b border-white/8 bg-[#252525] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Meet your next teammate</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Find Talent</h1>
          <p className="mt-3 text-gray-400">Connect with experienced people ready to make an impact.</p>
          <label className="mt-7 flex max-w-2xl items-center gap-3 rounded-xl border border-white/10 bg-[#30302f] px-4 py-3 focus-within:border-[#FFB800]/70">
            <UserRound aria-hidden="true" className="size-5 text-[#FFB800]" />
            <span className="sr-only">Search people or skills</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, role, or skill" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500" />
          </label>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended Talent</h2>
          <span className="text-sm text-gray-400">{filteredTalents.length} profiles</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredTalents.map((talent) => (
            <article key={talent.id} className="rounded-2xl border border-white/8 bg-[#30302f] p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row">
                <img src={`https://images.unsplash.com/${talent.avatar}?auto=format&fit=crop&w=160&h=160&q=80`} alt={`${talent.name} profile`} className="size-16 rounded-full bg-[#444] object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{talent.name}</h3>
                      <p className="mt-1 text-sm text-[#FFB800]">{talent.title}</p>
                      <p className="mt-1 text-sm text-gray-400">{talent.company}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{talent.salary}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-3.5" />{talent.location}</span>
                    <span>{talent.experience}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {talent.skills.map((skill) => <span key={skill} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-gray-300">{skill}</span>)}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link to="/talent-profile" className="inline-flex items-center gap-2 rounded-lg bg-[#FFB800] px-4 py-2 text-sm font-semibold text-[#242424] hover:bg-[#ffd05c]">Profile <ArrowRight aria-hidden="true" className="size-4" /></Link>
                    <button type="button" onClick={() => setMessageSent(talent.id)} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 hover:border-[#FFB800]/60 hover:text-[#FFB800]"><MessageCircle aria-hidden="true" className="size-4" />Message</button>
                    {messageSent === talent.id && <span className="self-center text-xs text-gray-400">Message request ready</span>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default FindTalent