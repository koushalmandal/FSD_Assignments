import { useState } from 'react'
import { Check, FilePlus2 } from 'lucide-react'

const inputClass = 'mt-2 w-full rounded-xl border border-white/10 bg-[#292929] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#FFB800]/70'

function UploadJob() {
  const [posted, setPosted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setPosted(true)
  }

  return (
    <main className="min-h-[70vh] bg-[#292929] px-5 py-10 text-white sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Grow your team</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Post a Job</h1>
        <p className="mt-3 text-gray-400">Share the role, meet great people, and build what is next.</p>
        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-white/8 bg-[#30302f] p-5 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-300">Job Title<input required className={inputClass} placeholder="e.g. Product Designer" /></label>
            <label className="text-sm font-medium text-gray-300">Company<input required className={inputClass} placeholder="Company name" /></label>
            <label className="text-sm font-medium text-gray-300">Experience<select required defaultValue="" className={inputClass}><option value="" disabled>Select experience</option><option>Entry level</option><option>2-4 years</option><option>5-7 years</option><option>8+ years</option></select></label>
            <label className="text-sm font-medium text-gray-300">Job Type<select required defaultValue="" className={inputClass}><option value="" disabled>Select job type</option><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label>
            <label className="text-sm font-medium text-gray-300">Location<input required className={inputClass} placeholder="City, state or remote" /></label>
            <label className="text-sm font-medium text-gray-300">Salary<input required className={inputClass} placeholder="$90,000 - $120,000" /></label>
            <label className="text-sm font-medium text-gray-300 sm:col-span-2">Skills<input className={inputClass} placeholder="Add skills separated by commas" /></label>
            <label className="text-sm font-medium text-gray-300 sm:col-span-2">Job Description<textarea required rows="4" className={inputClass} placeholder="Describe the role and what success looks like." /></label>
            <label className="text-sm font-medium text-gray-300 sm:col-span-2">About the Job<textarea rows="3" className={inputClass} placeholder="What makes this opportunity special?" /></label>
            <label className="text-sm font-medium text-gray-300 sm:col-span-2">Requirements<textarea rows="3" className={inputClass} placeholder="List the experience and qualifications needed." /></label>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#FFB800] px-6 text-sm font-bold text-[#242424] transition-colors hover:bg-[#ffd05c]"><FilePlus2 aria-hidden="true" className="size-4" />Post Job</button>
            {posted && <p role="status" className="inline-flex items-center gap-2 text-sm text-[#FFB800]"><Check aria-hidden="true" className="size-4" />Your job draft is ready.</p>}
          </div>
        </form>
      </div>
    </main>
  )
}

export default UploadJob