import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  leftIcon?: ReactNode
}

const baseClasses =
  'inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const variantMap: Record<ButtonVariant, string> = {
  primary:
    'bg-[#ccff33] text-slate-900 hover:bg-lime-200 focus-visible:outline-[#ccff33]',
  outline:
    'border border-slate-200 bg-white text-slate-900 hover:border-slate-300 focus-visible:outline-slate-300',
  ghost:
    'bg-transparent text-slate-500 hover:text-slate-900 focus-visible:outline-slate-200',
}

const Button = ({ className = '', variant = 'primary', leftIcon, ...props }: ButtonProps) => (
  <button className={`${baseClasses} ${variantMap[variant]} ${className}`.trim()} {...props}>
    {leftIcon ? <span className="text-base">{leftIcon}</span> : null}
    <span>{props.children}</span>
  </button>
)

export { Button }

