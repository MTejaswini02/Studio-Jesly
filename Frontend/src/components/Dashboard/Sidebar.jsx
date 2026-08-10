import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../utils/auth";
import { X } from "lucide-react";

function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-[300px] sm:w-[330px] lg:w-[363px]
          shrink-0
          bg-[#161B22]
          border-r border-zinc-800
          flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Brand */}
        <div className="p-6 relative">

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-6 right-5 text-zinc-400 hover:text-white"
            aria-label="Close admin menu"
          >
            <X size={25} />
          </button>

          <NavLink
            to="/"
            className="relative block w-[220px] sm:w-[230px] h-[78px] md:h-[82px]"
          >

            {/* studio */}
            <span
              className="
                absolute
                top-[2px]
                left-[28px]
                text-white
                text-[13px]
                sm:text-[14px]
                tracking-[5px]
                leading-none
                whitespace-nowrap
              "
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              studio
            </span>

            {/* jesly */}
            <span
              className="
                absolute
                top-[-2px]
                left-[10px]
                text-yellow-500
                text-[60px]
                sm:text-[70px]
                md:text-[70px]
                leading-none
                tracking-[3px]
                whitespace-nowrap
              "
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
              }}
            >
              jesly
            </span>

          </NavLink>

          <p className="text-zinc-400 text-sm mt-1">
            Admin Panel
          </p>

        </div>


        {/* Navigation */}
        <nav className="mt-8 flex flex-col flex-1 min-h-0 overflow-y-auto">

          <button
            onClick={() => handlePageClick("dashboard")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "dashboard"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => handlePageClick("contacts")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "contacts"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Contacts
          </button>

          <button
            onClick={() => handlePageClick("clients")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "clients"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Clients
          </button>

          <button
            onClick={() => handlePageClick("services")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "services"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Services
          </button>

          <button
            onClick={() => handlePageClick("projects")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "projects"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => handlePageClick("portfolio")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "portfolio"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Portfolio
          </button>

          <button
            onClick={() => handlePageClick("files")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "files"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Project Files
          </button>

          <button
            onClick={() => handlePageClick("activity")}
            className={`px-6 py-4 text-left transition-colors ${
              activePage === "activity"
                ? "bg-yellow-500 text-black font-semibold"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            Activity Logs
          </button>

          {/* Logout */}
          <div className="mt-auto border-t border-zinc-800">

            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-4 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
            >
              Logout
            </button>

          </div>

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;