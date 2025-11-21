import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardPage } from "./dashboard-page";

const ProtectedDashboardPage = () => (
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
);

export { ProtectedDashboardPage };

