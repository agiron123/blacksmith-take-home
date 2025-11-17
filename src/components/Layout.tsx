import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Bun React Starter</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/kitchen-sink">Kitchen Sink</Link>
            </Button>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}