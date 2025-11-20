import type { ReactNode } from 'react'

type SplitPanelProps = {
  left: ReactNode
  right: ReactNode
}

const SplitPanel = ({ left, right }: SplitPanelProps) => (
  <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
    <div className="flex h-full w-full bg-white px-[135px] py-10">
      <div className="w-full max-w-[404px]">{left}</div>
    </div>
    <div className="hidden h-full w-full lg:block">{right}</div>
  </section>
)

export { SplitPanel }

