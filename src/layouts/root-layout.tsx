import { Outlet } from '@tanstack/react-router'

const RootLayout = () => (
  <div className="min-h-screen bg-[#f5f6fa] font-['Kumbh Sans',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-slate-900 antialiased">
    <Outlet />
  </div>
)

export { RootLayout }

