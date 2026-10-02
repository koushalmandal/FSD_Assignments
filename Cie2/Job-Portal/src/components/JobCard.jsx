import { useState } from 'react'
import { Bookmark, Clock3, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

function JobCard({ job, compact = false }) {
  const [saved, setSaved] = useState(false)

  return (
    <article className={`rounded-2xl border border-white/8 bg-[#30302f] p-5 transition-colors hover:border-[#FFB800]/30 sm:p-6 ${compact ? '' : 'h-full'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${job.logoClass}`} aria-label={`${job.company} logo`}>
          {job.logo}
        </div>
        <button
          type="button"
          aria-label={saved ? 'Remove saved job' : 'Save job'}
          aria-pressed={saved}
          className={`rounded-lg p-2 transition-colors hover:bg-white/5 ${saved ? 'text-[#FFB800]' : 'text-gray-400'}`}
          onClick={() => setSaved((isSaved) => !isSaved)}
        >
          <Bookmark aria-hidden="true" className={`size-5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link to={`/job/${job.id}`} className="text-lg font-semibold text-white transition-colors hover:text-[#FFB800]">
            {job.title}
          </Link>
          <p className="mt-1 text-sm text-gray-400">{job.company}</p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-[#FFB800]">{job.salary}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
        <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-3.5" />{job.location}</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 aria-hidden="true" className="size-3.5" />{job.jobType}</span>
        <span className="inline-flex items-center gap-1.5"><Users aria-hidden="true" className="size-3.5" />{job.applicants} applicants</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-gray-300">{skill}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-gray-500">
        <span>{job.experience}</span>
        <span>Posted {job.posted}</span>
      </div>
      <Link to={`/job/${job.id}`} className="mt-4 inline-flex items-center justify-center rounded-lg border border-[#FFB800]/50 px-4 py-2 text-sm font-semibold text-[#FFB800] transition-colors hover:bg-[#FFB800] hover:text-[#242424]">
        View Job
      </Link>
    </article>
  )
}

export default JobCard