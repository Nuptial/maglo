import { useMemo, useState } from "react";
import { useAuth } from "@/features/auth/context/use-auth";

type NotificationOption = {
  id: string;
  label: string;
  description: string;
  defaultEnabled?: boolean;
};

const notificationOptions: NotificationOption[] = [
  {
    id: "payments",
    label: "Payment alerts",
    description: "Receive updates when invoices are paid or overdue.",
    defaultEnabled: true,
  },
  {
    id: "transfers",
    label: "Transfer approvals",
    description: "Be notified when transfers need your approval.",
    defaultEnabled: true,
  },
  {
    id: "weeklyDigest",
    label: "Weekly digest",
    description: "A summary of balances, invoices, and activity every Monday.",
    defaultEnabled: false,
  },
];

type NotificationState = Record<string, boolean>;

const getInitialNotificationState = () =>
  notificationOptions.reduce<NotificationState>(
    (acc, option) => ({
      ...acc,
      [option.id]: Boolean(option.defaultEnabled),
    }),
    {}
  );

const getSwitchClasses = (isEnabled: boolean) => {
  const baseClasses =
    "relative flex h-7 w-12 items-center rounded-full border transition";
  const activeClasses = "border-emerald-300 bg-emerald-400/20 text-emerald-700";
  const inactiveClasses = "border-slate-200 bg-slate-100 text-slate-500";

  return `${baseClasses} ${isEnabled ? activeClasses : inactiveClasses}`;
};

const SettingsPanel = () => {
  const { user, isRefreshing } = useAuth();
  const [notificationState, setNotificationState] = useState<NotificationState>(
    getInitialNotificationState
  );

  const profileDetails = useMemo(() => {
    if (user) {
      return {
        fullName: user.fullName,
        email: user.email,
      };
    }

    return {
      fullName: isRefreshing ? "Loading profile…" : "Unavailable",
      email: isRefreshing ? "Loading profile…" : "Unavailable",
    };
  }, [user, isRefreshing]);

  const handleToggleNotification = (id: string) => {
    setNotificationState((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  return (
    <section
      aria-label="Settings content"
      className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
    >
      <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">
            Profile details
          </h2>
          <p className="text-sm text-slate-500">
            Keep your workspace profile up to date for teammates and clients.
          </p>
        </header>
        <form className="mt-6 grid gap-4" aria-label="Profile form">
          <label className="text-sm font-semibold text-slate-700">
            Full name
            <input
              type="text"
              value={profileDetails.fullName}
              readOnly
              aria-readonly="true"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none ring-offset-2 transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Work email
            <input
              type="email"
              value={profileDetails.email}
              readOnly
              aria-readonly="true"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none ring-offset-2 transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Timezone
            <select
              defaultValue="PST"
              disabled
              aria-disabled="true"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-500 outline-none ring-offset-2 transition"
            >
              <option value="PST">Pacific (PST)</option>
              <option value="EST">Eastern (EST)</option>
              <option value="GMT">GMT</option>
              <option value="CET">Central Europe (CET)</option>
            </select>
          </label>
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">
              Session security
            </p>
            <label className="flex items-center justify-between text-sm text-slate-600">
              Enable biometric login
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
            </label>
            <label className="flex items-center justify-between text-sm text-slate-600">
              Auto-lock dashboard after 5 min idle
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
            </label>
          </div>
        </form>
      </article>
      <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">
            Notifications
          </h2>
          <p className="text-sm text-slate-500">
            Choose how you would like to be notified about key activity.
          </p>
        </header>
        <ul className="mt-6 space-y-4">
          {notificationOptions.map((option) => {
            const isEnabled = notificationState[option.id];

            return (
              <li
                key={option.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-slate-100 p-4"
              >
                <div className="max-w-[70%]">
                  <p className="text-base font-semibold text-slate-900">
                    {option.label}
                  </p>
                  <p className="text-sm text-slate-500">{option.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isEnabled}
                  aria-label={`Toggle ${option.label}`}
                  onClick={() => handleToggleNotification(option.id)}
                  className={getSwitchClasses(isEnabled)}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
                      isEnabled ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Need quieter days?</p>
          <p>Schedule focus hours to pause all non-critical notifications.</p>
        </div>
      </article>
    </section>
  );
};

export { SettingsPanel };
