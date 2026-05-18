import type { ReactNode } from "react";

type LayoutShellProps = {
  children: ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  return <div className="flex min-h-screen flex-col text-slate-900">{children}</div>;
}

