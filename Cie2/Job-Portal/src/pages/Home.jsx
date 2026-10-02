import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  FileText,
  Search,
  UserRoundCheck,
} from 'lucide-react'
import TestimonialCard from '../components/TestimonialCard.jsx'
import { testimonials } from '../data/jobData.js'

const steps = [
  {
    title: 'Build Your Resume',
    description: 'Create a standout resume with your skills.',
    icon: FileText,
  },
  {
    title: 'Apply for Job',
    description: 'Find and apply for jobs that match your skills.',
    icon: Search,
  },
  {
    title: 'Get Hired',
    description: 'Connect with employers and start your new job.',
    icon: UserRoundCheck,
  },
]

function Home() {
  const [jobTitle, setJobTitle] = useState('')
  const [jobType, setJobType] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSearch(event) {
    event.preventDefault()
    const query = [jobTitle.trim(), jobType].filter(Boolean).join(' · ')
    setSearchMessage(
      query ? `Your job search is ready for ${query}.` : 'Choose a title or job type to get started.',
    )
  }

  function handleSubscribe(event) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <main className="overflow-hidden bg-[#292929] text-white">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:min-h-[500px] lg:grid-cols-[1fr_0.95fr] lg:gap-10">
          <div className="relative z-10 flex flex-col justify-center">
            <h1 className="text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl">
              <span className="block">Find your <span className="text-[#FFB800]">dream</span></span>
              <span className="block"><span className="text-[#FFB800]">job</span> with us</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              Good life begins with a good company. Start explore thousands of jobs in one place.
            </p>

            <form
              className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-[#343434] p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:gap-2"
              onSubmit={handleSearch}
            >
              <label className="flex min-w-0 flex-col gap-2 px-3 py-2">
                <span className="text-xs font-medium text-gray-400">Job Title</span>
                <input
                  className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                  placeholder="What are you looking for?"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
              </label>
              <label className="flex min-w-0 flex-col gap-2 border-t border-white/10 px-3 py-2 sm:border-l sm:border-t-0 sm:pl-5">
                <span className="text-xs font-medium text-gray-400">Job Type</span>
                <select
                  className="w-full appearance-none bg-transparent text-sm text-gray-300 outline-none"
                  value={jobType}
                  onChange={(event) => setJobType(event.target.value)}
                >
                  <option className="bg-[#292929]" value="">Select job type</option>
                  <option className="bg-[#292929]" value="Full-time">Full-time</option>
                  <option className="bg-[#292929]" value="Part-time">Part-time</option>
                  <option className="bg-[#292929]" value="Contract">Contract</option>
                  <option className="bg-[#292929]" value="Remote">Remote</option>
                </select>
              </label>
              <button
                type="submit"
                aria-label="Search jobs"
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-5 text-sm font-bold text-[#242424] transition-colors hover:bg-[#ffd05c]"
              >
                <Search aria-hidden="true" className="size-5" />
                <span>Search</span>
              </button>
            </form>
            <p aria-live="polite" className="mt-3 min-h-5 text-sm text-gray-400">
              {searchMessage}
            </p>
          </div>

          <div className="relative mx-auto flex min-h-[320px] w-full max-w-[590px] items-center justify-center sm:min-h-[410px] lg:min-h-[500px]">
            <div aria-hidden="true" className="absolute right-[8%] top-[10%] aspect-square w-[78%] rounded-full bg-[#FFB800]/8" />
            <svg
              aria-labelledby="hero-illustration-title"
              className="relative z-[1] max-h-[490px] w-full"
              fill="none"
              role="img"
              viewBox="0 0 560 440"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id="hero-illustration-title">A job seeker sitting with a laptop</title>
              <path d="M89 355c76-27 275-26 375 0" stroke="#55534C" strokeLinecap="round" strokeWidth="3" />
              <circle cx="444" cy="112" r="6" fill="#FFB800" />
              <circle cx="109" cy="177" r="4" fill="#FFB800" />
              <path d="M171 159c0-18 14-32 32-32h40c15 0 27 12 27 27v106h-99V159Z" fill="#45443F" />
              <path d="M159 261h126v18H159z" fill="#56544E" />
              <path d="m217 279-10 74m49-74 18 74" stroke="#56544E" strokeLinecap="round" strokeWidth="9" />
              <path d="M205 354h-23m94 0h-23" stroke="#56544E" strokeLinecap="round" strokeWidth="8" />
              <path d="M250 247c35 14 68 28 101 46 13 7 17 20 9 30-8 10-20 11-33 4l-96-49 19-31Z" fill="#34474A" />
              <path d="M298 275c30 5 60 9 85 23 13 7 16 20 8 30-7 9-20 10-33 4l-74-27 14-30Z" fill="#34474A" />
              <path d="m363 316 27 8c8 2 12 9 10 15-2 7-9 10-17 8l-33-8 13-23Z" fill="#D99473" />
              <path d="m382 340 22 2c8 1 12 7 10 13-1 6-8 9-15 8l-27-4 10-19Z" fill="#D99473" />
              <path d="m393 342 22 1c7 0 11 5 10 10-1 5-5 8-12 8h-25l5-19Z" fill="#343331" />
              <path d="m371 365 26 1c7 0 11 5 10 10-1 5-6 8-13 8h-28l5-19Z" fill="#343331" />
              <path d="M268 180c9-18 27-29 48-29h18c25 0 44 20 44 45v65H255l13-81Z" fill="#FFB800" />
              <path d="M287 188c-2 22 7 37 21 46m66-47c0 19-8 34-20 44" stroke="#D99473" strokeLinecap="round" strokeWidth="15" />
              <path d="m300 229 29 10m45-8-25 18" stroke="#D99473" strokeLinecap="round" strokeWidth="12" />
              <path d="M320 230h99l-8 72h-99l8-72Z" fill="#F3F0E8" stroke="#D7D1C4" strokeWidth="3" />
              <path d="m328 238 83 1-6 57h-83l6-58Z" fill="#3A4748" />
              <path d="M320 302h100l-13 10h-98l11-10Z" fill="#D7D1C4" />
              <path d="M350 306h25" stroke="#B8B1A4" strokeLinecap="round" strokeWidth="2" />
              <path d="M333 265h44m-44 8h32" stroke="#FFB800" strokeLinecap="round" strokeWidth="3" opacity=".8" />
              <path d="M308 91c0-21 16-37 37-37h2c21 0 37 16 37 37v15c0 23-16 40-38 40-21 0-38-17-38-40V91Z" fill="#D99473" />
              <path d="M305 96c-4-31 12-54 40-55 25-1 43 16 43 42-8-7-15-17-17-27-9 14-31 24-61 23l-5 17Z" fill="#343331" />
              <path d="M311 99c-8-2-12 3-10 10 1 6 6 9 12 8m67-18c8-2 12 3 10 10-1 6-6 9-12 8" fill="#D99473" />
              <path d="M326 109h1m35 0h1" stroke="#343331" strokeLinecap="round" strokeWidth="4" />
              <path d="M333 126c7 5 15 5 22 0" stroke="#9B5F4F" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M353 148v15" stroke="#D99473" strokeLinecap="round" strokeWidth="12" />
            </svg>
            <div className="absolute right-0 top-[16%] z-[2] flex items-center gap-3 rounded-xl border border-black/5 bg-[#f7f5ee] px-4 py-3 text-[#292929] shadow-lg sm:right-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#FFB800]">
                <Check aria-hidden="true" className="size-5" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-bold">10K+</span>
                <span className="text-xs text-gray-600">got job</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/6 bg-[#252525] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">A better way forward</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 text-gray-400">Three simple steps to get closer to the work you love.</p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map(({ title, description, icon: Icon }, index) => (
              <article key={title} className="relative flex flex-col items-center text-center">
                {index < steps.length - 1 && (
                  <div aria-hidden="true" className="absolute left-[65%] top-8 hidden h-px w-[70%] border-t border-dashed border-[#FFB800]/35 md:block" />
                )}
                <div className="relative flex size-16 items-center justify-center rounded-full bg-[#FFB800] text-[#292929] shadow-[0_0_0_8px_rgba(255,184,0,0.08)]">
                  <Icon aria-hidden="true" className="size-7" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Real stories, new beginnings</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">People who found their fit</h2>
          </div>
          <Link to="/find-jobs" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#FFB800] transition-colors hover:text-[#ffd05c]">
            Find your opportunity <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="grid gap-8 rounded-[28px] border border-white/8 bg-[#353534] px-6 py-9 sm:px-10 sm:py-11 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">The good stuff, occasionally</p>
            <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Never Wants to Miss<br className="hidden sm:block" /> Any Job News?
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">Get fresh opportunities and career notes straight to your inbox.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setSubscribed(false)
              }}
              className="min-h-14 min-w-0 flex-1 rounded-xl border border-white/10 bg-[#292929] px-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#FFB800]/70"
            />
            <button type="submit" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-6 text-sm font-bold text-[#242424] transition-colors hover:bg-[#ffd05c]">
              {subscribed ? 'Subscribed' : 'Subscribe'}
              {subscribed ? <Check aria-hidden="true" className="size-4" /> : <ArrowRight aria-hidden="true" className="size-4" />}
            </button>
            <span aria-live="polite" className="sr-only">{subscribed ? 'Thanks for subscribing.' : ''}</span>
          </form>
        </div>
      </section>

    </main>
  )
}

export default Home