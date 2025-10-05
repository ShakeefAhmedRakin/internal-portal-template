import PageHeader from "../../app/(dashboard)/dashboard/_components/page-header";

export default function PageLayout({
  children,
  showHeader = true,
  title,
  description,
  showBreadcrumb = true,
  titleFirst = true,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
  description?: string;
  showBreadcrumb?: boolean;
  titleFirst?: boolean;
}) {
  return (
    <div className="lg:bg-background thin-styled-scroll-container flex h-full w-full flex-1 flex-col p-2 md:p-4 lg:rounded-lg lg:border">
      {showHeader && (
        <PageHeader
          title={title}
          description={description}
          showBreadcrumb={showBreadcrumb}
          titleFirst={titleFirst}
        />
      )}
      <div className="max-h-full flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
