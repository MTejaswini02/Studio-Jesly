import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";

function About() {
  const principles = [
    {
      number: "01",
      title: "Quality",
      desc: "Every project is crafted with precision, consistency and attention to detail."
    },
    {
      number: "02",
      title: "Creativity",
      desc: "We turn ideas into simple, modern and impactful designs that communicate clearly."
    },
    {
      number: "03",
      title: "Trust",
      desc: "We build lasting relationships through reliable communication, honest work and dependable service."
    }
  ];

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}

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


      {/* ================= OUR STORY ================= */}

      <section className="bg-[#0D1117] px-6 md:px-8 py-16 md:py-20">

        <div className="max-w-5xl mx-auto text-center">

          <p className="uppercase tracking-[4px] text-yellow-500 text-sm mb-5">
            OUR STORY
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
            Built With Purpose.
          </h2>

          <p className="text-zinc-400 leading-9 text-lg">
            Studio Jesly was created with a simple goal — to help people
            communicate their ideas beautifully. Whether it's a presentation,
            resume, Canva design or business support, every project is built
            with clarity, creativity and professionalism.
          </p>

        </div>

      </section>


      {/* ================= PRINCIPLES ================= */}

      <section className="bg-[#0D1117] px-6 md:px-8 py-20 md:py-28">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[4px] text-yellow-500 text-sm mb-5">
              OUR PRINCIPLES
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              What We Stand For.
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-6 leading-8">
              The principles behind every project, interaction and
              relationship at Studio Jesly.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {principles.map((principle) => (

              <div
                key={principle.number}
                className="
                  group
                  bg-[#161B22]
                  border border-zinc-800
                  rounded-3xl
                  p-8 md:p-10
                  hover:-translate-y-2
                  hover:border-yellow-500/40
                  transition-all
                  duration-300
                "
              >

                <div className="flex items-center justify-between mb-10">

                  <span className="text-yellow-500 text-sm font-semibold tracking-[3px]">
                    {principle.number}
                  </span>

                  <div className="h-px bg-zinc-800 flex-1 ml-6 group-hover:bg-yellow-500/40 transition-colors duration-300" />

                </div>


                <h3 className="text-white text-3xl font-bold mb-5">
                  {principle.title}
                </h3>


                <p className="text-zinc-400 leading-8">
                  {principle.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <CTA />

      <Footer />
    </>
  );
}

export default About;