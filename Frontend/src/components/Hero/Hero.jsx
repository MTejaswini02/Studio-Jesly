import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0D1117] px-6 md:px-8 pt-24">

      <div className="max-w-5xl text-center">

        <p className="uppercase tracking-[6px] text-yellow-500 mb-6">
          Creative Design Studio
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">

          Designing

          <br />

          Clarity.

          <span className="text-yellow-500">

            {" "}Delivering Confidence.

          </span>

        </h1>

        <p className="text-zinc-400 text-lg md:text-xl leading-8 md:leading-9 max-w-3xl mx-auto mt-8">

          Studio Jesly helps businesses and professionals
          communicate through presentations, Canva designs,
          resumes and virtual assistance.

        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">
          
          <NavLink
            to="/portfolio"
            className="bg-yellow-500 text-black w-full sm:w-auto px-8 py-4 text-center rounded-xl font-semibold hover:scale-105 duration-300"
          >
            View Portfolio
          </NavLink>
          

          <NavLink
            to="/contact"
            className="border border-yellow-500 text-white w-full sm:w-auto px-8 py-4 text-center rounded-xl hover:bg-yellow-500 hover:text-black duration-300"
          >
            Work With Us
          </NavLink>

        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-6 text-zinc-400 text-sm uppercase tracking-wider">

          <span className="text-yellow-500 font-semibold">
            Trusted Services
          </span>

          <span>•</span>

          <span>Presentation Design</span>

          <span>•</span>

          <span>Canva Design</span>

          <span>•</span>

          <span>Resume Services</span>

          <span>•</span>

          <span>Virtual Assistance</span>

        </div>

      </div>

    </section>
  );
}

export default Hero;