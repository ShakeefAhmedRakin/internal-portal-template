import { StaticRoutes } from "@/config/static-routes";
import { redirect } from "next/navigation";
import { useAuthServer } from "../../../hooks/auth/useAuthServer";
import DashboardNavigation from "../_components/dashboard-navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await useAuthServer();

  if (!auth.isAuthenticated) {
    redirect(StaticRoutes.SIGN_IN);
  }

  return (
    <div className="dark:lg:bg-card/20 lg:bg-card/20 relative h-screen max-h-screen w-screen max-w-screen overflow-hidden pb-[70px] lg:pb-0">
      <div className="fade-in-from-bottom relative z-10 flex h-full flex-1 flex-col gap-2 p-2 lg:flex-row">
        <DashboardNavigation user={auth.user} userRole={auth.userRole} />
        <main className="flex h-full max-h-full flex-1">{children}</main>
      </div>
    </div>
  );
}
