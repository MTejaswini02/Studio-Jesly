import { Link } from "react-router-dom";

function CTA() {

  return (

    <section className="bg-[#0D1117] py-32 px-8">

      <div className="max-w-5xl mx-auto rounded-[40px] bg-yellow-500 p-16 text-center">

        <h2 className="text-5xl font-bold text-black">

          Ready to Build Something Amazing?

        </h2>

        <p className="text-black/80 mt-8 text-xl">

          Let's transform your ideas into professional designs that leave a lasting impression.

        </p>

        <Link

          to="/signup"

          className="inline-block mt-12 bg-black text-white px-10 py-4 rounded-xl font-semibold hover:scale-105 duration-300"

        >

          Start Your Project

        </Link>

      </div>

    </section>

  );

}

export default CTA;