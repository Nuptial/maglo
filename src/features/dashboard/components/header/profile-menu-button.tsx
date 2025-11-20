import { ChevronDownIcon } from "@/features/dashboard/components/icons/dashboard-icons";

const profileAvatar =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=120&h=120&q=80";

const ProfileMenuButton = () => (
  <button
    type="button"
    aria-label="Open profile menu"
    className="flex items-center gap-3 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-900 bg-[#FAFAFA]"
  >
    <img
      src={profileAvatar}
      alt="Mahfuzul Nabil avatar"
      className="h-9 w-9 rounded-full object-cover"
    />
    <span>Mahfuzul Nabil</span>
    <ChevronDownIcon />
  </button>
);

export { ProfileMenuButton };
