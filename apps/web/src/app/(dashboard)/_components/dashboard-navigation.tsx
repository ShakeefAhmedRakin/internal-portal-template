import type { User } from "better-auth";
import DashboardDesktopNavigation from "./dashboard-desktop-navigation";

import { AppLogo } from "@/components/branding/app-logo";
import { ThemeToggleButton } from "../../../components/theme-toggle";
import { DashboardMobileNavigation } from "./dashboard-mobile-navigation";

export default function DashboardNavigation({ user }: { user: User | null }) {
  return (
    <nav>
      <div className="bg-background/50 flex items-center justify-between border-b p-3 backdrop-blur-lg lg:hidden">
        <AppLogo />

        <span>
          <DashboardMobileNavigation user={user} />
          <ThemeToggleButton />
        </span>
      </div>

      <div className="hidden h-full lg:block">
        <DashboardDesktopNavigation user={user} />
      </div>
    </nav>
  );
}
