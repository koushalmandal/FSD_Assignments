import { useState } from 'react'
import { ArrowLeft, Bookmark, BriefcaseBusiness, Check, Clock3, MapPin, Users } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import JobCard from '../components/JobCard.jsx'
import { jobs } from '../data/jobData.js'
import { getAppliedJobIds, saveAppliedJobId } from '../utils/jobApplications.js'

function JobDetails() {
  const { id } = useParams()
  const job = id ? jobs.find((record) => record.id === id) : jobs[0]
  const [appliedJobIds, setAppliedJobIds] = useState(getAppliedJobIds())
  const [applicationMessage, setApplicationMessage] = useState('')
  const [saved, setSaved] = useState(false)
  const applied = Boolean(job && appliedJobIds.includes(job.id))

  function applyForJob() {
    try {
      setAppliedJobIds(saveAppliedJobId(job.id))
      setApplicationMessage('Application submitted successfully!')
    } catch {
      setApplicationMessage('Application submitted, but this browser could not save it locally.')
    }
  }

  if (!job) {
    return (
      <main className="min-h-[70vh] bg-[#292929] px-5 py-16 text-center text-white">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <Link to="/find-jobs" className="mt-4 inline-block text-sm font-semibold text-[#FFB800] hover:underline">Back to jobs</Link>
      </main>
    )
  }

  return (
    <main className="min-h-[70vh] bg-[#292929] px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <Link to="/find-jobs" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#FFB800]"><ArrowLeft aria-hidden="true" className="size-4" />Back to jobs</Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="rounded-2xl border border-white/8 bg-[#30302f] p-5 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className={`flex size-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold ${job.logoClass}`}>{job.logo}</span>
                <div><p className="text-sm text-gray-400">{job.company}</p><h1 className="mt-1 text-2xl font-bold sm:text-3xl">{job.title}</h1><p className="mt-2 text-sm text-gray-400">Posted {job.posted}</p></div>
              </div>
              <button type="button" aria-label={saved ? 'Remove saved job' : 'Save job'} aria-pressed={saved} onClick={() => setSaved((value) => !value)} className={`rounded-xl border border-white/10 p-3 ${saved ? 'text-[#FFB800]' : 'text-gray-400'}`}><Bookmark aria-hidden="true" className={`size-5 ${saved ? 'fill-current' : ''}`} /></button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-y border-white/8 py-5 text-sm text-gray-300">
              <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-[#FFB800]" />{job.location}</span><span className="inline-flex items-center gap-2"><BriefcaseBusiness className="size-4 text-[#FFB800]" />{job.jobType}</span><span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-[#FFB800]" />{job.experience}</span><span className="inline-flex items-center gap-2"><Users className="size-4 text-[#FFB800]" />{job.applicants} applicants</span>
            </div>
            <p className="mt-5 text-lg font-semibold text-[#FFB800]">{job.salary} <span className="text-sm font-normal text-gray-400">per year</span></p>
            <section className="mt-8"><h2 className="text-lg font-semibold">Job Description</h2><p className="mt-3 text-sm leading-7 text-gray-400">{job.description}</p></section>
            <section className="mt-8"><h2 className="text-lg font-semibold">Requirements</h2><ul className="mt-3 space-y-3">{job.requirements.map((requirement) => <li key={requirement} className="flex gap-3 text-sm leading-6 text-gray-400"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#FFB800]" />{requirement}</li>)}</ul></section>
            <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={applyForJob} disabled={applied} className="rounded-xl bg-[#FFB800] px-6 py-3 text-sm font-bold text-[#242424] hover:bg-[#ffd05c] disabled:cursor-not-allowed disabled:opacity-70">{applied ? 'Application submitted' : 'Apply now'}</button><button type="button" onClick={() => setSaved((value) => !value)} className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-gray-200 hover:border-[#FFB800]/60">{saved ? 'Saved' : 'Save job'}</button></div>
            {applicationMessage && <p role="status" className="mt-4 text-sm text-[#FFB800]">{applicationMessage}</p>}
          </article>
          <aside className="space-y-4">
            <section className="rounded-2xl border border-white/8 bg-[#30302f] p-5"><h2 className="font-semibold">About {job.company}</h2><p className="mt-3 text-sm leading-6 text-gray-400">A team focused on building thoughtful products and experiences for a global community.</p><Link to="/company" className="mt-4 inline-block text-sm font-semibold text-[#FFB800] hover:text-[#ffd05c]">View company</Link></section>
            <section className="rounded-2xl border border-white/8 bg-[#30302f] p-5"><h2 className="font-semibold">Skills for this role</h2><div className="mt-4 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300">{skill}</span>)}</div></section>
          </aside>
        </div>
        <section className="mt-12"><h2 className="mb-5 text-2xl font-bold">Similar jobs</h2><div className="grid gap-4 md:grid-cols-2">{jobs.slice(1, 3).map((similarJob) => <JobCard key={similarJob.id} job={similarJob} />)}</div></section>
      </div>
    </main>
  )
}

export default JobDetails