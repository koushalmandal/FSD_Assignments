export function filterJobs(jobs, filters = {}) {
  const query = filters.title?.trim().toLowerCase() || ''
  const location = filters.location?.trim().toLowerCase() || ''
  const salaryFloor = Number.parseInt(filters.salary?.match(/\d+/)?.[0] || '0', 10)

  return jobs.filter((job) => {
    const skills = job.skills ?? job.tags ?? []
    const searchableText = [job.title, job.company, job.location, ...skills].join(' ').toLowerCase()
    const minimumSalary = Number.parseInt(job.salary.match(/\$(\d+)k?/i)?.[1] || '0', 10)

    return (!query || searchableText.includes(query))
      && (!location || job.location.toLowerCase().includes(location))
      && (!filters.experience || job.experience === filters.experience)
      && (!(filters.jobType ?? filters.type) || (job.jobType ?? job.type) === (filters.jobType ?? filters.type))
      && (!salaryFloor || minimumSalary >= salaryFloor)
  })
}