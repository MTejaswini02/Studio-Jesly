import { Presentation, Palette, FileText, Briefcase } from "lucide-react";

function Services() {
  const services = [
    {
      icon: <Presentation size={42} />,
      title: "Presentation Design",
      desc: "Professional PowerPoint presentations for businesses, startups and students."
    },
    {
      icon: <Palette size={42} />,
      title: "Canva Design",
      desc: "Social media posts, banners, flyers, brochures and marketing creatives."
    },
    {
      icon: <FileText size={42} />,
      title: "Resume Services",
      desc: "ATS-friendly resumes and cover letters designed to impress recruiters."
    },
    {
      icon: <Briefcase size={42} />,
      title: "Virtual Assistance",
      desc: "Administrative support, research, documentation and business assistance."
    }
  ];

  return (
    <section className="bg-[#0D1117] py-28 px-8">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center text-white">
          Our Services
        </h2>

        <p className="text-zinc-400 text-center mt-5 mb-16">
          Everything you need to present your business professionally.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((item, index) => (

            <div
              key={index}
              className="bg-[#161B22] rounded-3xl p-8 hover:-translate-y-2 duration-300 border border-zinc-800"
            >

              <div className="text-yellow-500 mb-8">
                {item.icon}
              </div>

              <h3 className="text-white text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-zinc-400 leading-8">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Services;