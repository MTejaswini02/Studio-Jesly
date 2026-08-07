function Header({ activePage }) {
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
    <header className="bg-[#161B22] border-b border-zinc-800 p-6">
      <h2 className="text-3xl font-bold text-white">
        {titles[activePage] || "Dashboard"}
      </h2>
    </header>
  );
}

export default Header;