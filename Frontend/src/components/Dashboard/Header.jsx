import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

function Header({
  activePage,
  onMenuClick,
}) {
  const navigate = useNavigate();

  const titles = {
    dashboard: "Dashboard",
    contacts: "Contacts",
    clients: "Clients",
    services: "Services",
    projects: "Projects",
    portfolio: "Portfolio",
    files: "Project Files",
    activity: "Activity Logs",
  };

  return (
    <header className="h-24 bg-[#161B22] border-b border-zinc-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden text-white p-2 mr-3 rounded-lg hover:bg-zinc-800 transition-colors"
        aria-label="Open admin menu"
      >
        <Menu size={26} />
      </button>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white flex-1">
        {titles[activePage] || "Dashboard"}
      </h2>

      {/* Home */}
      <button
        onClick={() => navigate("/")}
        className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 sm:px-5 py-2 rounded-lg transition-colors"
      >
        Home
      </button>

    </header>
  );
}

export default Header;