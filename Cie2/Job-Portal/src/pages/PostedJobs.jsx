import { useMemo, useState } from 'react'
import { BarChart3, Check, Edit3, Eye, Trash2, Users } from 'lucide-react'
import { jobs } from '../data/jobData.js'

const applicantNames = ['Jordan Lee', 'Sam Rivera', 'Casey Morgan']

function PostedJobs() {
  const [jobGroup, setJobGroup] = useState('Active')
  const [selectedId, setSelectedId] = useState(jobs[0].id)
  const [detailTab, setDetailTab] = useState('Overview')
  const [deletedIds, setDeletedIds] = useState([])
  const [notice, setNotice] = useState('')
  const availableJobs = useMemo(() => jobs.filter((job, index) => !deletedIds.includes(job.id) && (jobGroup === 'Active' ? index < 6 : index >= 6)), [deletedIds, jobGroup])
  const selectedJob = availableJobs.find((job) => job.id === selectedId) || availableJobs[0]

  function removeJob() {
    if (!selectedJob) return
    setDeletedIds((current) => [...current, selectedJob.id])
    setNotice('Job removed from this demo dashboard.')
  }

  return (
    <main className="min-h-[70vh] bg-[#292929] px-4 py-7 text-white sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Employer workspace</p>
        <h1 className="mt-2 text-3xl font-bold">Posted Jobs</h1>
        <div className="mt-7 grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-2xl border border-white/8 bg-[#30302f]">
            <div className="flex border-b border-white/8 p-2">
              {['Active', 'Draft'].map((group) => <button key={group} type="button" onClick={() => { setJobGroup(group); setNotice('') }} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium ${jobGroup === group ? 'bg-[#FFB800] text-[#242424]' : 'text-gray-400 hover:text-white'}`}>{group}</button>)}
            </div>
            <div className="max-h-[640px] overflow-y-auto p-2">
              {availableJobs.length ? availableJobs.map((job) => <button key={job.id} type="button" onClick={() => { setSelectedId(job.id); setNotice('') }} className={`mb-1 w-full rounded-xl p-4 text-left transition-colors ${selectedJob?.id === job.id ? 'bg-[#FFB800]/10 ring-1 ring-[#FFB800]/40' : 'hover:bg-white/5'}`}><span className="block text-sm font-semibold text-white">{job.title}</span><span className="mt-1 block text-xs text-gray-400">{job.company} · {job.location}</span><span className="mt-3 block text-xs text-gray-500">{job.applicants} applicants</span></button>) : <p className="p-4 text-sm text-gray-400">No {jobGroup.toLowerCase()} jobs.</p>}
            </div>
          </aside>

          {selectedJob ? <section className="min-w-0 overflow-hidden rounded-2xl border border-white/8 bg-[#30302f]">
            <div className="flex flex-col gap-5 border-b border-white/8 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
              <div className="flex items-start gap-4"><span className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${selectedJob.logoClass}`}>{selectedJob.logo}</span><div><h2 className="text-xl font-bold">{selectedJob.title}</h2><p className="mt-1 text-sm text-gray-400">{selectedJob.company} · {selectedJob.location}</p><span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-300" />{jobGroup}</span></div></div>
              <div className="flex gap-2"><button type="button" onClick={() => setNotice('Edit form opened for this sample job.')} className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-3 py-2 text-sm text-gray-300 hover:text-[#FFB800]"><Edit3 className="size-4" />Edit</button><button type="button" onClick={removeJob} className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-3 py-2 text-sm text-gray-300 hover:border-red-400/50 hover:text-red-300"><Trash2 className="size-4" />Delete</button></div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 sm:p-7">{[{ label: 'Applicants', value: selectedJob.applicants, icon: Users }, { label: 'Job views', value: 842, icon: Eye }, { label: 'Conversion', value: '8.4%', icon: BarChart3 }].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-xl border border-white/8 bg-[#292929] p-4"><Icon aria-hidden="true" className="size-4 text-[#FFB800]" /><p className="mt-3 text-xl font-bold">{value}</p><p className="mt-1 text-xs text-gray-400">{label}</p></div>)}</div>
            <div className="flex gap-6 border-y border-white/8 px-5 sm:px-7">{['Overview', 'Applicants', 'Invited'].map((tab) => <button type="button" key={tab} onClick={() => setDetailTab(tab)} className={`border-b-2 py-4 text-sm font-medium ${detailTab === tab ? 'border-[#FFB800] text-[#FFB800]' : 'border-transparent text-gray-400 hover:text-white'}`}>{tab}</button>)}</div>
            <div className="min-h-52 p-5 sm:p-7">{detailTab === 'Overview' && <><h3 className="font-semibold">Job overview</h3><p className="mt-3 text-sm leading-7 text-gray-400">{selectedJob.description}</p><p className="mt-4 text-sm text-gray-400">{selectedJob.salary} · {selectedJob.type} · {selectedJob.experience}</p></>}{detailTab === 'Applicants' && <div className="space-y-3">{applicantNames.map((name, index) => <div key={name} className="flex items-center gap-3 rounded-xl border border-white/8 p-3"><span className="flex size-9 items-center justify-center rounded-full bg-[#FFB800]/15 text-sm font-semibold text-[#FFB800]">{name.split(' ').map((part) => part[0]).join('')}</span><span className="flex-1"><span className="block text-sm font-medium">{name}</span><span className="text-xs text-gray-400">Applied {index + 1} days ago</span></span><span className="text-xs text-gray-400">{index === 0 ? 'New' : 'In review'}</span></div>)}</div>}{detailTab === 'Invited' && <div className="rounded-xl border border-dashed border-white/15 p-8 text-center"><Check className="mx-auto size-6 text-[#FFB800]" /><h3 className="mt-3 font-semibold">Invitations</h3><p className="mt-2 text-sm text-gray-400">Candidates you invite will appear here.</p></div>}</div>
            {notice && <p role="status" className="border-t border-white/8 px-5 py-4 text-sm text-[#FFB800] sm:px-7">{notice}</p>}
          </section> : <div className="rounded-2xl border border-white/8 bg-[#30302f] p-8 text-center text-sm text-gray-400">No jobs in this list.</div>}
        </div>
      </div>
    </main>
  )
}

export default PostedJobs