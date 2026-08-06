import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {

  return (

    <div className="flex min-h-screen bg-[#0D1117]">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8">

          {children}

        </main>

      </div>

    </div>

  );

}

export default Layout;