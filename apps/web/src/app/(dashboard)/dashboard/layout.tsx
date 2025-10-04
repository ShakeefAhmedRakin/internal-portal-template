import { StaticRoutes } from "@/config/static-routes";
import { auth } from "api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardNavigation from "../_components/dashboard-navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(StaticRoutes.SIGN_IN);
  }

  return (
    <div className="lg:bg-card/20 relative h-screen max-h-screen w-screen max-w-screen overflow-hidden">
      <div className="fade-in-from-bottom relative z-10 flex h-full flex-col gap-2 p-2 lg:flex-row">
        <DashboardNavigation user={session.user} />
        <main className="flex max-h-full flex-1 flex-col">
          <div className="lg:bg-background thin-styled-scroll-container mb-16 h-full flex-1 overflow-y-auto p-4 lg:mb-0 lg:rounded-lg lg:border">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
