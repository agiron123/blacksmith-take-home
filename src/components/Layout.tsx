import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Blacksmith.sh Take Home</h1>
          </div>
        </div>
      </nav>
      <main className="flex-1 overflow-hidden flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}