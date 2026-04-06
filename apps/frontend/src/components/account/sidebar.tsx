"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  History, 
  BookOpen, 
  Settings,
  User
} from "lucide-react";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    name: "History Transaction",
    href: "/account/history-transaction",
    icon: History,
  },
  {
    name: "Owned Course",
    href: "/account/owned-course",
    icon: BookOpen,
  },
  {
    name: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full gap-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
