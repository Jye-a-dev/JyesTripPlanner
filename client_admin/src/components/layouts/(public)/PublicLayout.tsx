import { Outlet } from "react-router-dom";
import PublicFooter from "./Footer/PublicFooter";
import PublicNavbar from "./Navbar/PublicNavbar";
import LayoutMain from "./components/LayoutMain";
import LayoutShell from "./components/LayoutShell";

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
