import PageLayout from "@/components/ui/page-layout";
import { Separator } from "@/components/ui/separator";
import UnauthorizedCard from "@/components/unauthorized-card";
import { useAuthServer } from "@/hooks/auth/useAuthServer";
import AccountsNameUpdate from "./_components/accounts-name-update";
import AccountsUserCard from "./_components/accounts-user-card";
import PasswordInfoCard from "./_components/password-info-card";

export default async function AccountsPage() {
  const { user, userRole } = await useAuthServer();

  if (!user) {
    return <UnauthorizedCard />;
  }

  return (
    <PageLayout
      title="Account"
      description="Manage your user account information"
    >
      <div className="max-w-5xl space-y-4 xl:max-w-3xl">
        <AccountsUserCard user={user} userRole={userRole} />
        <Separator />

        <AccountsNameUpdate user={user} />

        <PasswordInfoCard />
      </div>
    </PageLayout>
  );
}
