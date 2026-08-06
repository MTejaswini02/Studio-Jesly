function PortfolioPreview() {

  const projects = [
    {
      title: "Startup Pitch Deck",
      category: "Presentation Design",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      title: "ATS Resume Design",
      category: "Resume Services",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    },
    {
      title: "Instagram Brand Kit",
      category: "Canva Design",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
  ];

  return (

    <section className="bg-[#0D1117] px-8 py-28">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-white text-center">

          Featured Work

        </h2>

        <p className="text-zinc-400 text-center mt-5 mb-16">

          A glimpse of projects delivered with clarity and creativity.

        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {projects.map((project,index)=>(

            <div
              key={index}
              className="rounded-3xl overflow-hidden bg-[#161B22] border border-zinc-800 hover:-translate-y-2 duration-300"
            >

              <img
                src={project.image}
                alt={project.title}
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

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