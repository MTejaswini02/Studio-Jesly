import { useNavigate } from "react-router-dom";

function Header({ activePage }) {
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
    <header className="bg-[#161B22] border-b border-zinc-800 p-6 flex justify-between items-center">

      <h2 className="text-3xl font-bold text-white">
        {titles[activePage] || "Dashboard"}
      </h2>

      <button
        onClick={() => navigate("/")}
        className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-2 rounded-lg"
      >
        Home
      </button>

    </header>
  );
}

export default Header;