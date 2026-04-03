import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-4 bg-gray-100 border-b">Main Navbar</nav>
      <main className="flex-grow p-4">{children}</main>
      <footer className="p-4 bg-gray-100 border-t">Main Footer</footer>
    </div>
  );
}
