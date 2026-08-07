import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

function Sidebar({
  activePage,
  setActivePage,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#161B22] min-h-screen border-r border-zinc-800 flex flex-col">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-yellow-500">
          Studio Jesly
        </h1>

        <p className="text-zinc-400 text-sm mt-1">
          Admin Panel
        </p>

      </div>

      <nav className="mt-8 flex flex-col flex-1">

        <button
          onClick={() => setActivePage("dashboard")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "dashboard"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActivePage("contacts")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "contacts"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Contacts
        </button>

        <button
          onClick={() => setActivePage("clients")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "clients"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Clients
        </button>

        <button
          onClick={() => setActivePage("services")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "services"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Services
        </button>

        <button
          onClick={() => setActivePage("projects")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "projects"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Projects
        </button>

        <button
          onClick={() => setActivePage("portfolio")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "portfolio"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Portfolio
        </button>

        <button
          onClick={() => setActivePage("files")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "files"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Project Files
        </button>

        <button
          onClick={() => setActivePage("activity")}
          className={`px-6 py-4 text-left transition-colors ${
            activePage === "activity"
              ? "bg-yellow-500 text-black font-semibold"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          Activity Logs
        </button>

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
  );
}

export default Sidebar;