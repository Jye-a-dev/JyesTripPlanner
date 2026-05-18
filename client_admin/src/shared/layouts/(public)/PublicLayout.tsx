import { Outlet } from "react-router-dom";
import PublicFooter from "./Footer/PublicFooter";
import PublicNavbar from "./Navbar/PublicNavbar";
import LayoutMain from "./ui/LayoutMain";
import LayoutShell from "./ui/LayoutShell";

export default function PublicLayout() {
  return (
    <LayoutShell>
      <PublicNavbar />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
      <PublicFooter />
    </LayoutShell>
  );
}


