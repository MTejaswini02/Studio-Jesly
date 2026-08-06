import { Gem, Users, Clock3 } from "lucide-react";

function WhyUs() {
  const features = [
    {
      icon: <Gem size={42} />,
      title: "Premium Design",
      desc: "Every project is crafted with clarity, precision and attention to detail."
    },
    {
      icon: <Users size={42} />,
      title: "Client Focused",
      desc: "We design around your goals and build solutions that create real impact."
    },
    {
      icon: <Clock3 size={42} />,
      title: "Fast Delivery",
      desc: "Quick turnaround without compromising quality or creativity."
    }
  ];

  return (
    <section className="bg-[#0D1117] py-28 px-8">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-white text-center">
          Why Studio Jesly?
        </h2>

        <p className="text-zinc-400 text-center mt-5 mb-16">
          More than a freelancer. A creative partner.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#161B22] border border-zinc-800 rounded-3xl p-8 hover:-translate-y-2 duration-300"
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

export default WhyUs;