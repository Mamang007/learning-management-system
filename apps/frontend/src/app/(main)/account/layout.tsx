import { AccountSidebar } from "@/components/account/sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-6 px-4">Account</h2>
            <AccountSidebar />
          </div>
        </aside>

        {/* Content */}
        <main className="grow min-h-[60vh] bg-card border rounded-xl p-6 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
