import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
}

const TextField = ({ label, hint, id, className = '', ...props }: TextFieldProps) => (
  <label className="flex flex-col gap-2" htmlFor={id}>
    <span className="text-sm font-medium text-slate-700">{label}</span>
    <input
      id={id}
      className={`h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 ${className}`.trim()}
      {...props}
    />
    {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
  </label>
)

export { TextField }

