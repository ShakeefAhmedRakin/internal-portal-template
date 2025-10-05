import { hasMinimumRole } from "@/hooks/useAuthServer";
import { USER_ROLES } from "api/src/modules/auth/auth.constants";
import UnauthorizedCard from "../../../../components/unauthorized-card";
import PageHeader from "../_components/page-header";

export default async function ManageUsersPage() {
  const allowedAccess = await hasMinimumRole(USER_ROLES.ADMIN);

  if (!allowedAccess) {
    return <UnauthorizedCard />;
  }

  return (
    <>
      <PageHeader title="Manage Users" description="Manage your users" />
    </>
  );
}
