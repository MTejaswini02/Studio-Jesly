import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-8xl font-bold text-yellow-500">
        404
      </h1>

      <h2 className="text-4xl font-bold text-white mt-6">
        Page Not Found
      </h2>

      <p className="text-zinc-400 mt-4 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <NavLink
        to="/"
        className="mt-10 bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 duration-300"
      >
        Back to Home
      </NavLink>

    </section>
  );
}

export default NotFound;