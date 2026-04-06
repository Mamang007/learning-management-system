import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = session.user;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl space-y-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Name</span>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Email</span>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Role</span>
              <p className="font-medium uppercase">{user.role || 'USER'}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-xl space-y-4 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 rounded-full bg-muted overflow-hidden mb-2">
            {user.image ? (
              <img src={user.image} alt={user.name || ''} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0)}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Manage your avatar in settings.</p>
        </div>
      </div>
    </div>
  );
}
