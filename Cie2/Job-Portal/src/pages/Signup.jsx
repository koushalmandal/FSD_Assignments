import { useState } from 'react'
import { Anchor, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

function Signup() {
  const [created, setCreated] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setCreated(true)
  }

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#292929] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto grid min-h-[680px] max-w-6xl overflow-hidden rounded-3xl border border-white/8 bg-[#30302f] lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#39362d] p-7 sm:p-10 lg:min-h-full">
          <div aria-hidden="true" className="absolute -right-16 -top-14 size-72 rounded-full border border-[#FFB800]/20" />
          <Link to="/" className="relative inline-flex w-fit items-center gap-2 text-2xl font-bold text-[#FFB800]"><Anchor className="size-7" />JobHook</Link>
          <div className="relative py-10"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Find your next chapter</p><h1 className="mt-4 max-w-md text-4xl font-bold leading-tight sm:text-5xl">Great work begins with a connection.</h1><p className="mt-4 max-w-sm leading-7 text-gray-300">Create your profile and bring your next opportunity closer.</p></div>
          <p className="relative text-xs text-gray-400">A good life begins with a good company.</p>
        </aside>
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Join JobHook</p><h2 className="mt-3 text-3xl font-bold">Create Account</h2><p className="mt-2 text-sm text-gray-400">Start building your next opportunity.</p>
            <div className="mt-7 space-y-4">{[['Full Name', 'text'], ['Email', 'email'], ['Password', 'password'], ['Confirm Password', 'password']].map(([label, type]) => <label key={label} className="block text-sm font-medium text-gray-300">{label}<input required type={type} autoComplete={label === 'Password' ? 'new-password' : type === 'email' ? 'email' : undefined} className="mt-2 w-full rounded-xl border border-white/10 bg-[#292929] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#FFB800]/70" placeholder={label === 'Full Name' ? 'Your name' : label === 'Email' ? 'you@example.com' : 'At least 8 characters'} /></label>)}</div>
            <label className="mt-5 flex items-start gap-3 text-sm leading-5 text-gray-400"><input required type="checkbox" className="mt-1 size-4 accent-[#FFB800]" /><span>I agree to the <Link to="/about" className="text-[#FFB800] hover:underline">Terms & Conditions</Link> and Privacy Policy.</span></label>
            <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-5 text-sm font-bold text-[#242424] hover:bg-[#ffd05c]">Create account <ArrowRight className="size-4" /></button>
            {created && <p role="status" className="mt-4 inline-flex items-center gap-2 text-sm text-[#FFB800]"><Check className="size-4" />Your account form is ready.</p>}
            <p className="mt-6 text-center text-sm text-gray-400">Already have an account? <Link to="/login" className="font-semibold text-[#FFB800] hover:underline">Log in</Link></p>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Signup