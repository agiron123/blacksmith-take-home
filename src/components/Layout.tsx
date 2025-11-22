import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-hidden flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
