import { Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f5f6fa] font-['Kumbh Sans',system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-slate-900 antialiased">
    <div className="mx-auto w-full max-w-[1440px] max-h-[900px] overflow-auto">
      <Outlet />
    </div>
  </div>
);

export { RootLayout };
