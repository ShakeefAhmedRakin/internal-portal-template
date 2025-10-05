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
    <div className="dark:lg:bg-card/20 lg:bg-card/20 relative h-screen max-h-screen w-screen max-w-screen overflow-hidden">
      <div className="fade-in-from-bottom relative z-10 flex h-full flex-col gap-2 p-2 lg:flex-row">
        <DashboardNavigation user={auth.user} userRole={auth.userRole} />
        <main className="flex max-h-full flex-1 flex-col">
          <div className="lg:bg-background thin-styled-scroll-container mb-16 h-full flex-1 overflow-y-auto p-4 lg:mb-0 lg:rounded-lg lg:border">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
