import { NavLink } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <NavLink
              to="/"
              className="text-2xl md:text-3xl font-bold text-white"
            >
              studio <span className="text-yellow-500">jesly</span>
            </NavLink>

            <p className="text-zinc-400 mt-6 leading-7">

              Helping professionals and businesses
              communicate through premium presentations,
              Canva designs, resumes and virtual assistance.

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <NavLink to="/" className="text-zinc-400 hover:text-yellow-500">
                Home
              </NavLink>

              <NavLink to="/services" className="text-zinc-400 hover:text-yellow-500">
                Services
              </NavLink>

              <NavLink to="/portfolio" className="text-zinc-400 hover:text-yellow-500">
                Portfolio
              </NavLink>

              <NavLink to="/about" className="text-zinc-400 hover:text-yellow-500">
                About
              </NavLink>

              <NavLink to="/contact" className="text-zinc-400 hover:text-yellow-500">
                Contact
              </NavLink>

            </div>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-white text-xl font-semibold mb-6">
              Services
            </h3>

            <div className="flex flex-col gap-4 text-zinc-400">

              <p>Presentation Design</p>

              <p>Canva Design</p>

              <p>Resume Services</p>

              <p>Virtual Assistance</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white text-xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-zinc-400">
                <Mail size={18} />
                <span>hello@studiojesly.com</span>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <Phone size={18} />
                <span>Available on request</span>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={18} />
                <span>Remote • Worldwide</span>
              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-zinc-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">

          <p className="text-zinc-500">
            © 2026 Studio Jesly. All rights reserved.
          </p>

          <p className="text-zinc-500 mt-4 md:mt-0">
            Designed & Developed by Studio Jesly
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;