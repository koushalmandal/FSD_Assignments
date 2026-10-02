import { Check, Star } from 'lucide-react'

function TestimonialCard({ testimonial }) {
  const { name, role, avatar, review } = testimonial

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-[#30302f] p-6 sm:p-7">
      <div className="flex items-center gap-1 text-[#FFB800]" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} aria-hidden="true" className="size-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 flex-1 text-sm leading-7 text-gray-300">&ldquo;{review}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
        <img
          src={`https://images.unsplash.com/${avatar}?auto=format&fit=crop&w=96&h=96&q=80`}
          alt=""
          className="size-11 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold text-white">{name}</h3>
          <p className="mt-0.5 text-xs text-gray-400">{role}</p>
        </div>
        <Check aria-hidden="true" className="ml-auto size-5 text-[#FFB800]" />
      </div>
    </article>
  )
}

export default TestimonialCard