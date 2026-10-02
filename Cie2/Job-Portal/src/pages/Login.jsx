import { useState } from 'react'
import { Anchor, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

function Login() {
  const [loggedIn, setLoggedIn] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoggedIn(true)
  }

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#292929] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto grid min-h-[620px] max-w-6xl overflow-hidden rounded-3xl border border-white/8 bg-[#30302f] lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#39362d] p-7 sm:p-10 lg:min-h-full">
          <div aria-hidden="true" className="absolute -right-16 -top-14 size-72 rounded-full border border-[#FFB800]/20" />
          <Link to="/" className="relative inline-flex w-fit items-center gap-2 text-2xl font-bold text-[#FFB800]"><Anchor className="size-7" />JobHook</Link>
          <div className="relative py-10"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Welcome back</p><h1 className="mt-4 max-w-md text-4xl font-bold leading-tight sm:text-5xl">Make your next move.</h1><p className="mt-4 max-w-sm leading-7 text-gray-300">Sign in to find opportunities and pick up where you left off.</p></div>
          <p className="relative text-xs text-gray-400">Your JobHook community is right here.</p>
        </aside>
        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#FFB800]">Your account</p><h2 className="mt-3 text-3xl font-bold">Log in</h2><p className="mt-2 text-sm text-gray-400">Welcome back to JobHook.</p>
            <div className="mt-7 space-y-4"><label className="block text-sm font-medium text-gray-300">Email<input required type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/10 bg-[#292929] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#FFB800]/70" placeholder="you@example.com" /></label><label className="block text-sm font-medium text-gray-300">Password<input required type="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-white/10 bg-[#292929] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#FFB800]/70" placeholder="Your password" /></label></div>
            <div className="mt-4 text-right"><Link to="/login" className="text-sm text-[#FFB800] hover:underline">Forgot password?</Link></div>
            <button type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-5 text-sm font-bold text-[#242424] hover:bg-[#ffd05c]">Log in <ArrowRight className="size-4" /></button>
            {loggedIn && <p role="status" className="mt-4 inline-flex items-center gap-2 text-sm text-[#FFB800]"><Check className="size-4" />Login form submitted in demo mode.</p>}
            <p className="mt-6 text-center text-sm text-gray-400">New to JobHook? <Link to="/signup" className="font-semibold text-[#FFB800] hover:underline">Create an account</Link></p>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Login