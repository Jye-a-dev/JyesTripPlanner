import type { ReactNode } from "react";

type LayoutMainProps = {
  children: ReactNode;
};

export default function LayoutMain({ children }: LayoutMainProps) {
  return <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-12">{children}</main>;
}

