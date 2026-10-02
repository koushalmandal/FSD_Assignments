import { useState } from 'react'
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  MessageCircle,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { talents } from '../data/jobData.js'

function TalentProfile() {
  const [messageReady, setMessageReady] = useState(false)

  // Aashita Meena is the first talent in the talents array
  const talent = talents[0]

  return (
    <main className="min-h-[70vh] bg-[#292929] px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          to="/find-talent"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#FFB800]"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to talent
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* Main Profile Content */}
          <div className="space-y-5">

            {/* Profile Header */}
            <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#30302f]">

              {/* Cover */}
              <div className="h-36 bg-[#494538] sm:h-48" />

              <div className="px-5 pb-6 sm:px-8">

                {/* Profile Image + Message */}
                <div className="flex flex-wrap items-end justify-between gap-4">

                  <img
                    src={`https://images.unsplash.com/${talent.avatar}?auto=format&fit=crop&w=200&h=200&q=85`}
                    alt={`${talent.name} profile`}
                    className="-mt-12 size-24 rounded-2xl border-4 border-[#30302f] bg-[#444] object-cover sm:size-28"
                  />

                  <button
                    type="button"
                    onClick={() => setMessageReady(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-bold text-[#242424] hover:bg-[#ffd05c]"
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="size-4"
                    />
                    Message
                  </button>

                </div>

                {/* Name */}
                <h1 className="mt-4 text-2xl font-bold">
                  {talent.name}
                </h1>

                {/* Profession */}
                <p className="mt-1 text-[#FFB800]">
                  {talent.title}
                </p>

                {/* Company / Location / Experience */}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400">

                  <span className="inline-flex items-center gap-2">
                    <BriefcaseBusiness className="size-4" />
                    {talent.company}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    {talent.location}
                  </span>

                  <span>
                    {talent.experience}
                  </span>

                </div>

                {/* Message Status */}
                {messageReady && (
                  <p
                    role="status"
                    className="mt-4 text-sm text-[#FFB800]"
                  >
                    Message request ready.
                  </p>
                )}

              </div>
            </section>

            {/* ABOUT */}
            <section className="rounded-2xl border border-white/8 bg-[#30302f] p-5 sm:p-7">

              <h2 className="text-lg font-semibold">
                About
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                MBBS doctor focused on patient care, clinical practice,
                and providing quality healthcare to patients. Passionate
                about helping patients and contributing to a positive
                healthcare experience.
              </p>

            </section>

            {/* SKILLS */}
            <section className="rounded-2xl border border-white/8 bg-[#30302f] p-5 sm:p-7">

              <h2 className="text-lg font-semibold">
                Skills
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">

                {talent.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-300"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </section>

            {/* EXPERIENCE */}
            <section className="rounded-2xl border border-white/8 bg-[#30302f] p-5 sm:p-7">

              <h2 className="text-lg font-semibold">
                Experience
              </h2>

              <div className="mt-4 flex gap-4">

                {/* Experience Icon */}
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FFB800]/15 text-[#FFB800]">
                  <UserRound className="size-5" />
                </span>

                <div>

                  {/* Job Title */}
                  <h3 className="font-medium">
                    MBBS Doctor
                  </h3>

                  {/* Company + Duration */}
                  <p className="mt-1 text-sm text-gray-400">
                    NSCB Medical College · 2024 - Present
                  </p>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Provided patient care, supported clinical diagnosis
                    and treatment, and worked closely with healthcare
                    teams to provide quality medical care.
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* Recommended Talent */}
          <aside className="rounded-2xl border border-white/8 bg-[#30302f] p-5">

            <h2 className="font-semibold">
              Recommended Talent
            </h2>

            <div className="mt-4 space-y-4">

              {talents.slice(1).map((person) => (
                <Link
                  key={person.id}
                  to="/talent-profile"
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
                >

                  <img
                    src={`https://images.unsplash.com/${person.avatar}?auto=format&fit=crop&w=96&h=96&q=80`}
                    alt=""
                    className="size-10 rounded-full bg-[#444] object-cover"
                  />

                  <span>

                    <span className="block text-sm font-medium">
                      {person.name}
                    </span>

                    <span className="mt-1 block text-xs text-gray-400">
                      {person.title}
                    </span>

                  </span>

                </Link>
              ))}

            </div>

          </aside>

        </div>
      </div>
    </main>
  )
}

export default TalentProfile