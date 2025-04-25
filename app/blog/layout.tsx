import React from "react";

export default function AdminLayout ({ children,}:{
  children: React.ReactNode;
}) {
  return (
    <main>
      <header>
        Admin Layout
      </header>
      {children}
    </main>
  )
}