import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({
  activePage,
  setActivePage,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[#0D1117]">

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Area */}
      <div className="flex-1 min-w-0 h-screen flex flex-col">

        {/* Header */}
        <div className="shrink-0">
          <Header
            activePage={activePage}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;