import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";

function About() {
  const values = [
    {
      title: "Quality",
      desc: "Every project is crafted with precision and attention to detail."
    },
    {
      title: "Creativity",
      desc: "Simple, modern and impactful designs that communicate clearly."
    },
    {
      title: "Trust",
      desc: "Building long-term relationships through reliable service."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}

      <section className="bg-[#0D1117] pt-32 md:pt-36 pb-20 md:pb-24 px-6 md:px-8">

        <div className="max-w-6xl mx-auto text-center">

          <p className="uppercase tracking-[5px] text-yellow-500 mb-6">
            ABOUT STUDIO JESLY
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
            Design That Builds
            <br />
            Confidence.
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-8 md:leading-9">
            Studio Jesly helps businesses, students and professionals
            present their ideas through clean, modern and effective design.
          </p>

        </div>

      </section>

      {/* Story */}

      <section className="bg-[#0D1117] px-6 md:px-8 py-16 md:py-20">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-bold text-white mb-10">
            Our Story
          </h2>

          <p className="text-zinc-400 leading-9 text-lg">
            Studio Jesly was created with a simple goal — to help people
            communicate their ideas beautifully. Whether it's a presentation,
            resume, Canva design or business support, every project is built
            with clarity, creativity and professionalism.
          </p>

        </div>

      </section>

      {/* Values */}

      <section className="bg-[#0D1117] px-6 md:px-8 pb-20 md:pb-28">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {values.map((value, index) => (

              <div
                key={index}
                className="bg-[#161B22] border border-zinc-800 rounded-3xl p-8 md:p-10 hover:-translate-y-2 duration-300"
              >

                <h3 className="text-3xl font-bold text-white mb-6">
                  {value.title}
                </h3>

                <p className="text-zinc-400 leading-8">
                  {value.desc}
                </p>

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

export default About;