import { ReactNode } from "react";

interface VerticalLayoutProps {
  children: ReactNode;
}

export function VerticalLayout({ children }: VerticalLayoutProps) {
  return <div className="flex flex-col gap-4 w-full">{children}</div>;
}
