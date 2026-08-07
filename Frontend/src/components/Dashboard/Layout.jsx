import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({
  activePage,
  setActivePage,
  children,
}) {
  return (
    <div className="flex min-h-screen bg-[#0D1117]">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;