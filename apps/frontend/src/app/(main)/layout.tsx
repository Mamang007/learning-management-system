import React from "react";
import { Navbar } from "@/components/navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t py-6 bg-gray-50/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Learning Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
