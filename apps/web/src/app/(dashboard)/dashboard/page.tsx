import PageHeader from "./_components/page-header";

export default function Home() {
  // const router = useRouter();
  // const { data: session, isPending } = authClient.useSession();

  // const privateData = useQuery(orpc.privateData.queryOptions());

  // useEffect(() => {
  //   if (!session && !isPending) {
  //     router.push(StaticRoutes.SIGN_IN);
  //   }
  // }, [session, isPending]);

  // if (isPending) {
  //   return (
  //     <div className="flex h-full w-full items-center justify-center">
  //       <Loader2 size={48} className="animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <>
      <PageHeader
        description="Welcome to your Internal Portal Home"
        showBreadcrumb={false}
        titleFirst={false}
      />
    </>
  );
}
