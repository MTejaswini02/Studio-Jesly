import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0D1117]/90 backdrop-blur-md border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <NavLink
          to="/"
          className="text-3xl font-bold tracking-tight text-white hover:text-yellow-500 duration-300"
        >
          studio <span className="text-yellow-500">jesly</span>
        </NavLink>
        <div className="hidden md:flex gap-10 text-zinc-300">

         
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-semibold"
                : "text-zinc-300 hover:text-yellow-500 duration-300"
            }
          >
             Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-semibold"
                : "text-zinc-300 hover:text-yellow-500 duration-300"
            }
          >
             Services
          </NavLink>

          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-semibold"
                : "text-zinc-300 hover:text-yellow-500 duration-300"
            }
          >
             Portfolio
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-semibold"
                : "text-zinc-300 hover:text-yellow-500 duration-300"
            }
          >
             About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-semibold"
                : "text-zinc-300 hover:text-yellow-500 duration-300"
            }
          >
             Contact
          </NavLink>

          
        </div>

        <div className="flex items-center gap-4">

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "hidden md:block bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold"
                : "hidden md:block bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 duration-300"
            }
          >
            Start Project
          </NavLink>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
           {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0D1117] border-t border-zinc-800 md:hidden">

            <div className="flex flex-col p-6 gap-5">

              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-yellow-500"
              >
                Home
              </NavLink>

              <NavLink
                to="/services"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-yellow-500"
              >
                Services
              </NavLink>

              <NavLink
                to="/portfolio"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-yellow-500"
              >
               Portfolio
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-yellow-500"
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-yellow-500"
              >
                Contact
              </NavLink>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;