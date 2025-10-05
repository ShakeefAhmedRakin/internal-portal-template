import { hasMinimumRole } from "@/hooks/auth/useAuthServer";
import { USER_ROLES } from "api/src/modules/auth/auth.constants";
import PageLayout from "../../../../components/ui/page-layout";
import UnauthorizedCard from "../../../../components/unauthorized-card";

export default async function ManageUsersPage() {
  const allowedAccess = await hasMinimumRole(USER_ROLES.ADMIN);

  if (!allowedAccess) {
    return <UnauthorizedCard />;
  }

  return (
    <PageLayout title="Manage Users" description="Manage your users">
      <div className="h-[6000px] bg-gray-100">
        <h1>2</h1>
      </div>
    </PageLayout>
  );
}
