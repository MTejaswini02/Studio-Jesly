import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

function Sidebar() {
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

        <Link
          to="/admin"
          className="px-6 py-4 hover:bg-zinc-800 text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/admin"
          className="px-6 py-4 hover:bg-zinc-800 text-white"
        >
          Contacts
        </Link>

        <div className="px-6 py-4 text-zinc-600">
          Projects
        </div>

        <div className="px-6 py-4 text-zinc-600">
          Clients
        </div>

        <div className="px-6 py-4 text-zinc-600">
          Services
        </div>

        <div className="px-6 py-4 text-zinc-600">
          Users
        </div>

        {/* Push Logout to the bottom */}
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