import { useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import JobCard from '../components/JobCard.jsx'
import { jobs } from '../data/jobData.js'
import { filterJobs } from '../utils/jobFilters.js'

const filters = [
  { name: 'title', label: 'Job Title', placeholder: 'Title, company, location, skill' },
  { name: 'location', label: 'Location', type: 'select', placeholder: 'All Locations', options: [...new Set(jobs.map((job) => job.location))] },
  { name: 'experience', label: 'Experience', type: 'select', options: ['2-4 years', '3-5 years', '4-6 years', '5-7 years', '3-6 years'] },
  { name: 'jobType', label: 'Job Type', type: 'select', options: [...new Set(jobs.map((job) => job.jobType))] },
  { name: 'salary', label: 'Salary', type: 'select', placeholder: 'Any salary', options: ['$100k+', '$125k+', '$150k+'] },
]

function FindJobs() {
  const [searchFilters, setSearchFilters] = useState({})
  const visibleJobs = filterJobs(jobs, searchFilters)

  return (
    <main className="min-h-[70vh] bg-[#292929] text-white">
      <section className="bg-[#252525] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Find your next opportunity</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Find Jobs</h1>
          <p className="mt-3 max-w-2xl text-gray-400">Explore roles from teams building what comes next.</p>
          <SearchBar fields={filters} onSearch={setSearchFilters} onValuesChange={setSearchFilters} buttonLabel="Find jobs" className="mt-8" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Recommended Jobs</h2>
            <p className="mt-1 text-sm text-gray-400">{visibleJobs.length} roles selected for you</p>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-400">
            Sort by
            <select className="rounded-lg border border-white/10 bg-[#30302f] px-3 py-2 text-white outline-none focus:border-[#FFB800]">
              <option>Most relevant</option>
              <option>Newest</option>
              <option>Salary: high to low</option>
            </select>
          </label>
        </div>
        {visibleJobs.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/8 bg-[#30302f] px-6 py-14 text-center">
            <h3 className="text-lg font-semibold">No jobs found. Try changing your search or filters.</h3>
          </div>
        )}
      </section>
    </main>
  )
}

export default FindJobs