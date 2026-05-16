import type { ReactNode } from "react";

type HomeContainerProps = {
  children: ReactNode;
};

export default function HomeContainer({ children }: HomeContainerProps) {
  return <section className="w-full">{children}</section>;
}
