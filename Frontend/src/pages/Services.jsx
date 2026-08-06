import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";

import {
  Presentation,
  Palette,
  FileText,
  Briefcase,
} from "lucide-react";

function Services() {
  const services = [
    {
      icon: <Presentation size={42} />,
      title: "Presentation Design",
      description:
        "Professional PowerPoint presentations, pitch decks, business reports and academic presentations.",
    },
    {
      icon: <Palette size={42} />,
      title: "Canva Design",
      description:
        "Social media posts, banners, brochures, flyers and complete brand kits designed in Canva.",
    },
    {
      icon: <FileText size={42} />,
      title: "Resume Services",
      description:
        "Modern ATS-friendly resumes, cover letters and LinkedIn profile optimization.",
    },
    {
      icon: <Briefcase size={42} />,
      title: "Virtual Assistance",
      description:
        "Email management, research, scheduling, documentation and administrative support.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}

      <section className="bg-[#0D1117] pt-32 md:pt-36 pb-20 md:pb-24 px-6 md:px-8">

        <div className="max-w-6xl mx-auto text-center">

          <p className="uppercase tracking-[5px] text-yellow-500 mb-6">
            OUR SERVICES
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">

            Helping Your Ideas

            <br />

            Look Professional.

          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-8 md:leading-9">

            From presentations to resumes and Canva designs,
            Studio Jesly helps professionals communicate
            with confidence.

          </p>

        </div>

      </section>

      {/* Services */}

      <section className="bg-[#0D1117] px-8 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {services.map((service, index) => (

              <div
                key={index}
                className="bg-[#161B22] border border-zinc-800 rounded-3xl p-8 md:p-10 hover:-translate-y-2 duration-300"
              >

                <div className="text-yellow-500 mb-8">

                  {service.icon}

                </div>

                <h2 className="text-3xl font-bold text-white mb-6">

                  {service.title}

                </h2>

                <p className="text-zinc-400 leading-8">

                  {service.description}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Process */}

      <section className="bg-[#0D1117] px-8 py-24">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl text-white font-bold text-center mb-20">

            Our Process

          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-[#161B22] rounded-3xl p-8">
              <h3 className="text-yellow-500 text-2xl font-bold mb-4">
                01
              </h3>

              <h4 className="text-white text-xl font-semibold mb-3">
                Discuss
              </h4>

              <p className="text-zinc-400">
                We understand your goals and project requirements.
              </p>
            </div>

            <div className="bg-[#161B22] rounded-3xl p-8">
              <h3 className="text-yellow-500 text-2xl font-bold mb-4">
                02
              </h3>

              <h4 className="text-white text-xl font-semibold mb-3">
                Design
              </h4>

              <p className="text-zinc-400">
                We create clean and professional concepts.
              </p>
            </div>

            <div className="bg-[#161B22] rounded-3xl p-8">
              <h3 className="text-yellow-500 text-2xl font-bold mb-4">
                03
              </h3>

              <h4 className="text-white text-xl font-semibold mb-3">
                Review
              </h4>

              <p className="text-zinc-400">
                Feedback is incorporated until you're satisfied.
              </p>
            </div>

            <div className="bg-[#161B22] rounded-3xl p-8">
              <h3 className="text-yellow-500 text-2xl font-bold mb-4">
                04
              </h3>

              <h4 className="text-white text-xl font-semibold mb-3">
                Deliver
              </h4>

              <p className="text-zinc-400">
                Final files are delivered in the required format.
              </p>
            </div>

          </div>

        </div>

      </section>

      <CTA />

      <Footer />
    </>
  );
}

export default Services;