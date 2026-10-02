import { useState } from 'react'
import { Search } from 'lucide-react'

function SearchBar({ fields, onSearch, onValuesChange, buttonLabel = 'Search', className = '' }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map(({ name, defaultValue = '' }) => [name, defaultValue])),
  )

  function updateField(name, value) {
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    onValuesChange?.(nextValues)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSearch?.(values)
  }

  return (
    <form
      className={`grid gap-3 rounded-2xl border border-white/10 bg-[#343434] p-3 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:items-end ${className}`}
      onSubmit={handleSubmit}
    >
      {fields.map(({ name, label, placeholder, type = 'text', options = [] }) => (
        <label key={name} className="flex min-w-0 flex-col gap-2 px-3 py-2">
          <span className="text-xs font-medium text-gray-400">{label}</span>
          {type === 'select' ? (
            <select
              className="w-full appearance-none bg-transparent text-sm text-gray-300 outline-none"
              value={values[name]}
              onChange={(event) => updateField(name, event.target.value)}
            >
              <option className="bg-[#292929]" value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
              {options.map((option) => (
                <option className="bg-[#292929]" key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              placeholder={placeholder}
              type={type}
              value={values[name]}
              onChange={(event) => updateField(name, event.target.value)}
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-5 text-sm font-bold text-[#242424] transition-colors hover:bg-[#ffd05c]"
      >
        <Search aria-hidden="true" className="size-5" />
        {buttonLabel}
      </button>
    </form>
  )
}

export default SearchBar