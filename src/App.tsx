import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@components/layout/MainLayout";

const HomePage = lazy(() => import("@pages/HomePage"));
const ToolsIndexPage = lazy(() => import("@pages/ToolsIndexPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-silk-rose/30 border-t-silk-rose animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tools" element={<ToolsIndexPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
