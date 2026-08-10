import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0D1117] border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-24 flex items-center justify-between">

        {/* ================= STUDIO JESLY WORDMARK ================= */}

          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="relative block w-[220px] sm:w-[230px] h-[78px] md:h-[82px]"
          >
            {/* studio */}
            <span
              className="
                absolute
                top-[17px]
                left-[29px]
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
                top-[12px]
                left-[8px]
                text-yellow-500
                text-[64px]
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
        {/* ================= DESKTOP NAVIGATION ================= */}

        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-base lg:text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-yellow-500"
                    : "text-zinc-300 hover:text-yellow-500"
                }`
              }
            >
              {link.name}
            </NavLink>

          ))}

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center">

          <NavLink
            to="/signup"
            className="hidden md:inline-flex bg-yellow-500 text-black px-7 py-3.5 rounded-xl font-semibold hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
          >
            Start Project
          </NavLink>


          {/* Mobile menu */}

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={27} /> : <Menu size={27} />}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}

        {isOpen && (

          <div className="absolute top-20 left-0 w-full bg-[#0D1117] border-b border-zinc-800 md:hidden">

            <div className="flex flex-col px-6 py-6 gap-5">

              {navLinks.map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-base transition-colors duration-300 ${
                      isActive
                        ? "text-yellow-500"
                        : "text-zinc-300 hover:text-yellow-500"
                    }`
                  }
                >
                  {link.name}
                </NavLink>

              ))}

              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-yellow-500 text-black text-center px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors duration-300 mt-1"
              >
                Start Project
              </NavLink>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;