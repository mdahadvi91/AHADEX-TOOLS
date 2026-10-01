import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { PageTransition } from "./PageTransition";
import { CinematicBackground } from "@components/background";

export function MainLayout() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <>
      <CinematicBackground />

      <Header
        onLeftMenuClick={() => setLeftOpen(true)}
        onRightMenuClick={() => setRightOpen(true)}
      />

      <LeftSidebar mobileOpen={leftOpen} onMobileClose={() => setLeftOpen(false)} />
      <RightSidebar mobileOpen={rightOpen} onMobileClose={() => setRightOpen(false)} />

      <div className="h-24 lg:h-28" aria-hidden="true" />

      <main id="main-content" className="relative lg:ml-64 lg:mr-72 min-h-[60vh]">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </>
  );
}
