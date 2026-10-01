import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function MainLayout() {
  return (
    <>
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" aria-hidden="true" />

      <main id="main-content" className="relative min-h-[60vh]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
