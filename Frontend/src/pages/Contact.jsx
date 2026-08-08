import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import { createContact } from "../api/contactApi";

function Contact() {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    project_type: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      await createContact(formData);

      alert("Your message has been sent successfully!");

      setFormData({
        full_name: "",
        email: "",
        project_type: "",
        message: "",
      });

    } catch (error) {

      console.error(
        "Failed to submit contact:",
        error
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.detail ||
        "Failed to send your message."
      );

    } finally {

      setSubmitting(false);

    }

  };

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

          <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-6 md:p-10">

            <h2 className="text-3xl font-bold text-white mb-8">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <input
                type="text"
                name="full_name"
                placeholder="Your Name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none"
              />

              <input
                type="text"
                name="project_type"
                placeholder="Project Type"
                value={formData.project_type}
                onChange={handleChange}
                required
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none"
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none resize-y"
              ></textarea>

              <button
                type="submit"
                disabled={submitting}
                className="bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl hover:scale-105 duration-300 w-full sm:w-auto"
              >
                {submitting
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </form>

          </div>


          {/* Contact Details */}

          <div className="space-y-6">

            {/* Email */}

            <a
              href="mailto:Tejaswinimaddali07@gmail.com"
              className="bg-[#161B22] rounded-3xl border border-zinc-800 p-6 md:p-10 flex items-center gap-6"
            >

              <Mail
                className="text-yellow-500 shrink-0"
                size={32}
              />

              <div>

                <h3 className="text-white text-xl font-semibold">
                  Email
                </h3>

                <p className="text-zinc-400 break-all">
                  Tejaswinimaddali07@gmail.com
                </p>

              </div>

            </a>


            {/* Phone */}

            <div>

              <a
                href="tel:+917075657239"
                className="bg-[#161B22] rounded-3xl border border-zinc-800 p-6 md:p-8 flex items-center gap-6"
              >

                <Phone
                  className="text-yellow-500 shrink-0"
                  size={32}
                />

                <div>

                  <h3 className="text-white text-xl font-semibold">
                    Phone
                  </h3>

                  <p className="text-zinc-400">
                    +91 7075657239
                  </p>

                </div>

              </a>

            </div>


            {/* Working Hours */}

            <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-6 md:p-8 flex items-center gap-6">

              <Clock
                className="text-yellow-500 shrink-0"
                size={32}
              />

              <div>

                <h3 className="text-white text-xl font-semibold">
                  Working Hours
                </h3>

                <p className="text-zinc-400">
                  Monday – Saturday
                </p>

              </div>

            </div>


            {/* Location */}

            <div className="bg-[#161B22] rounded-3xl border border-zinc-800 p-6 md:p-8 flex items-center gap-6">

              <MapPin
                className="text-yellow-500 shrink-0"
                size={32}
              />

              <div>

                <h3 className="text-white text-xl font-semibold">
                  Location
                </h3>

                <p className="text-zinc-400">
                  Remote • Worldwide
                </p>

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