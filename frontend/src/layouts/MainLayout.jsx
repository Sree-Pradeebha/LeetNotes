import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import "./MainLayout.css";

function MainLayout({ children }) {
  const location = useLocation();
  const isAddNotePage =
  location.pathname === "/add-note";

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const keepOpenRoutes = ["/"];

    setIsSidebarOpen(
      keepOpenRoutes.includes(location.pathname)
    );
  }, [location.pathname]);

  return (
    <div className="layout">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() =>
          setIsSidebarOpen(!isSidebarOpen)
        }
      />

      <div className="main-section">
        {!isAddNotePage && (
          <TopBar isSidebarOpen={isSidebarOpen} />
        )}

        <main
        className={`page-content ${
            isAddNotePage
            ? "editor-page"
            : ""
        }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;