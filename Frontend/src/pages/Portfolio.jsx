import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";

function Portfolio() {

  const projects = [
    {
      category: "Presentation Design",
      title: "Business Pitch Deck",
      description: "Professional investor presentation for startup funding."
    },
    {
      category: "Resume Design",
      title: "ATS Resume",
      description: "Modern resume designed for software professionals."
    },
    {
      category: "Canva Design",
      title: "Instagram Brand Kit",
      description: "Complete branding kit with 30 social media templates."
    },
    {
      category: "Presentation Design",
      title: "Company Profile",
      description: "Corporate presentation for business meetings."
    },
    {
      category: "Virtual Assistance",
      title: "Business Documentation",
      description: "Administrative documentation and presentation support."
    },
    {
      category: "Canva Design",
      title: "Marketing Brochure",
      description: "Professional promotional brochure for a business."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}

      <section className="bg-[#0D1117] pt-32 md:pt-36 pb-20 md:pb-24 px-6 md:px-8">

        <div className="max-w-6xl mx-auto text-center">

          <p className="uppercase tracking-[5px] text-yellow-500 mb-6">
            PORTFOLIO
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">

            Work That Speaks

            <br />

            For Itself.

          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-8 md:leading-9">

            Every project is designed with clarity,
            consistency and attention to detail.

          </p>

        </div>

      </section>

      {/* Projects */}

      <section className="bg-[#0D1117] px-8 pb-28">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project,index)=>(

              <div
                key={index}
                className="group rounded-3xl overflow-hidden bg-[#161B22] border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300"
              >

                <div className="h-64 bg-gradient-to-br from-yellow-500/30 to-zinc-900 flex items-center justify-center">

                  <span className="text-7xl">
                    📂
                  </span>

                </div>

                <div className="p-6 md:p-8">

                  <p className="text-yellow-500 text-sm mb-3">

                    {project.category}

                  </p>

                  <h2 className="text-white text-2xl font-bold mb-4">

                    {project.title}

                  </h2>

                  <p className="text-zinc-400 leading-7">

                    {project.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <CTA />

      <Footer />

    </>
  );
}

export default Portfolio;