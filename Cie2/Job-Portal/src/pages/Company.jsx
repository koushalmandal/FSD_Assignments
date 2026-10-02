import { useState } from 'react'
import { Building2, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import JobCard from '../components/JobCard.jsx'
import { jobs, talents } from '../data/jobData.js'

const tabs = ['About', 'Jobs', 'Employees']

function Company() {
  const [activeTab, setActiveTab] = useState('About')

  return (
    <main className="min-h-[70vh] bg-[#292929] px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#30302f]">
          <div className="h-36 bg-gradient-to-r from-[#514832] via-[#393831] to-[#333A36] sm:h-48" />
          <div className="px-5 pb-6 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="flex items-end gap-4">
                <span className="-mt-10 flex size-20 items-center justify-center rounded-2xl border-4 border-[#30302f] bg-sky-500/15 text-3xl font-bold text-sky-300 sm:size-24">M</span>
                <div className="pb-1"><h1 className="text-2xl font-bold">Microsoft</h1><p className="mt-1 text-sm text-gray-400">Technology · Software</p></div>
              </div>
              <Link to="/find-jobs" className="rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-bold text-[#242424] hover:bg-[#ffd05c]">View open jobs</Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400"><span className="inline-flex items-center gap-2"><MapPin className="size-4 text-[#FFB800]" />Hyderabad, India</span><span className="inline-flex items-center gap-2"><Users className="size-4 text-[#FFB800]" />100,000+ employees</span><span className="inline-flex items-center gap-2"><Building2 className="size-4 text-[#FFB800]" />Public company</span></div>
          </div>
          <div className="flex gap-7 overflow-x-auto border-t border-white/8 px-5 sm:px-8">
            {tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 border-b-2 py-4 text-sm font-medium transition-colors ${activeTab === tab ? 'border-[#FFB800] text-[#FFB800]' : 'border-transparent text-gray-400 hover:text-white'}`}>{tab}{tab === 'Jobs' ? ' (8)' : tab === 'Employees' ? ' (4)' : ''}</button>)}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
          <section className="min-w-0">
            {activeTab === 'About' && <article className="rounded-2xl border border-white/8 bg-[#30302f] p-6"><h2 className="text-lg font-semibold">About Microsoft</h2><p className="mt-4 text-sm leading-7 text-gray-400">Microsoft builds platforms and tools that help people and organizations achieve more. Across cloud, productivity, gaming, and devices, our teams bring together different perspectives to solve meaningful problems.</p><h3 className="mt-7 font-semibold">Life at Microsoft</h3><p className="mt-3 text-sm leading-7 text-gray-400">Teams are encouraged to stay curious, learn from one another, and create technology with people in mind. Explore open roles and find where your experience can make a difference.</p></article>}
            {activeTab === 'Jobs' && <div><h2 className="mb-4 text-xl font-bold">Open positions</h2><div className="grid gap-4">{jobs.filter((job) => job.company === 'Microsoft' || job.company === 'Meta' || job.company === 'Adobe').map((job) => <JobCard key={job.id} job={job} />)}</div></div>}
            {activeTab === 'Employees' && <div><h2 className="mb-4 text-xl font-bold">Meet the team</h2><div className="grid gap-4 sm:grid-cols-2">{talents.map((person) => <article key={person.id} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-[#30302f] p-5"><img src={`https://images.unsplash.com/${person.avatar}?auto=format&fit=crop&w=100&h=100&q=80`} alt="" className="size-12 rounded-full bg-[#444] object-cover" /><div><h3 className="font-semibold">{person.name}</h3><p className="mt-1 text-sm text-gray-400">{person.title}</p></div></article>)}</div></div>}
          </section>
          <aside className="rounded-2xl border border-white/8 bg-[#30302f] p-5"><h2 className="font-semibold">Similar Companies</h2><div className="mt-4 space-y-4">{[{ name: 'Google', mark: 'G', color: 'text-emerald-300 bg-emerald-500/15' }, { name: 'Adobe', mark: 'A', color: 'text-rose-300 bg-rose-500/15' }, { name: 'Meta', mark: 'M', color: 'text-blue-300 bg-blue-500/15' }].map((company) => <Link to="/company" key={company.name} className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5"><span className={`flex size-10 items-center justify-center rounded-lg font-bold ${company.color}`}>{company.mark}</span><span><span className="block text-sm font-medium">{company.name}</span><span className="mt-1 block text-xs text-gray-400">Technology</span></span></Link>)}</div></aside>
        </div>
      </div>
    </main>
  )
}

export default Company