function PortfolioPreview() {

  const projects = [
    {
      title: "Fashion Design",
      category: "Presentation Design",
      image:
        "/Portfolio Assets/Presentation Design/Fashion design.png",
    },
    {
      title: "ATS Resume Design",
      category: "Resume Services",
      image:
        "/Portfolio Assets/Resume Services/resume2_cover.png",
    },
    {
      title: "Branded Event & Promotion Posters",
      category: "Canva Design",
      image:
        "/Portfolio Assets/Canva Design/Music poster.png",
    },
  ];

  return (

    <section className="bg-[#0D1117] px-8 py-28">

      <div className="max-w-7xl mx-auto">

        {/* ==============================
            SECTION HEADING
        ============================== */}

        <h2 className="text-5xl font-bold text-white text-center">

          Featured Work

        </h2>

        <p className="text-zinc-400 text-center mt-5 mb-16">

          A glimpse of projects delivered with clarity and creativity.

        </p>


        {/* ==============================
            PROJECT CARDS
        ============================== */}

        <div className="grid md:grid-cols-3 gap-8">

          {projects.map((project, index) => (

            <div
              key={index}
              className="group rounded-3xl overflow-hidden bg-[#161B22] border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300"
            >

              {/* ==============================
                  IMAGE PREVIEW
              ============================== */}

              <div className="h-60 w-full bg-[#0D1117] overflow-hidden flex items-center justify-center">

                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

              </div>


              {/* ==============================
                  PROJECT INFORMATION
              ============================== */}

              <div className="p-8">

                <p className="text-yellow-500 text-sm mb-3">

                  {project.category}

                </p>

                <h3 className="text-white text-2xl font-semibold">

                  {project.title}

                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default PortfolioPreview;