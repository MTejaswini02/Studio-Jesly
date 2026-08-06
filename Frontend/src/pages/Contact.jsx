import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

function Contact() {
  return (
    <>
      <Navbar />

      {/* Hero */}

      <section className="bg-[#0D1117] pt-32 md:pt-36 pb-20 md:pb-24 px-6 md:px-8">

        <div className="max-w-6xl mx-auto text-center">

          <p className="uppercase tracking-[5px] text-yellow-500 mb-6">
            CONTACT
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">

            Let's Create

            <br />

            Something Great.

          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-8 md:leading-9">

            We'd love to hear about your project.
            Fill in the details below and we'll get back to you.

          </p>

        </div>

      </section>

      {/* Contact Section */}

      <section className="bg-[#0D1117] px-6 md:px-8 pb-20 md:pb-28">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}

          <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-10">

            <h2 className="text-3xl font-bold text-white mb-8">
              Send a Message
            </h2>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Project Type"
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none"
              />

              <textarea
                rows="6"
                placeholder="Tell us about your project..."
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none"
              ></textarea>

              <button className="bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl hover:scale-105 duration-300">
                Send Message
              </button>

            </div>

          </div>

          {/* Contact Details */}

          <div className="space-y-6">

            <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-8 md:p-10 flex items-center gap-6">
              <Mail className="text-yellow-500" size={32} />
              <div>
                <h3 className="text-white text-xl font-semibold">Email</h3>
                <p className="text-zinc-400">hello@studiojesly.com</p>
              </div>
            </div>

            <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-8 flex items-center gap-6">
              <Phone className="text-yellow-500" size={32} />
              <div>
                <h3 className="text-white text-xl font-semibold">Phone</h3>
                <p className="text-zinc-400">Available on request</p>
              </div>
            </div>

            <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-8 flex items-center gap-6">
              <Clock className="text-yellow-500" size={32} />
              <div>
                <h3 className="text-white text-xl font-semibold">Working Hours</h3>
                <p className="text-zinc-400">Monday – Saturday</p>
              </div>
            </div>

            <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-8 flex items-center gap-6">
              <MapPin className="text-yellow-500" size={32} />
              <div>
                <h3 className="text-white text-xl font-semibold">Location</h3>
                <p className="text-zinc-400">Remote • Worldwide</p>
              </div>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;