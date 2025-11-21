import { useState, useMemo } from "react";
import { ChevronDownIcon } from "@/features/dashboard/components/icons/dashboard-icons";
import { useAuth } from "@/features/auth/context/use-auth";

const ProfileMenuButton = () => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const displayName = user?.fullName ?? "Maglo User";
  const displayEmail = user?.email ?? "user@maglo.com";
  const displayRole = user?.role ? user.role.replace(/-/g, " ") : "Team member";

  const profileAvatar = useMemo(
    () =>
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName
      )}&background=0D8ABC&color=fff&size=120`,
    [displayName]
  );

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-label="Open profile menu"
        className="flex items-center gap-3 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-900 bg-[#FAFAFA]"
      >
        <img
          src={profileAvatar}
          alt={`${displayName} avatar`}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <span>{displayName}</span>
          <span className="text-xs capitalize text-slate-500">
            {displayRole}
          </span>
        </div>
        <ChevronDownIcon />
      </button>
      {isHovered && (
        <div className="absolute left-1/2 mt-2 w-max -translate-x-1/2 rounded-lg bg-white px-4 py-2 text-xs text-slate-600 shadow-lg">
          <p className="font-semibold text-slate-900">{displayName}</p>
          <p className="text-[11px] text-slate-500">{displayEmail}</p>
        </div>
      )}
    </div>
  );
};

export { ProfileMenuButton };
