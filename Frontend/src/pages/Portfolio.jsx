import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA";

import api from "../api/api";

import {
  getPortfolio,
  getPortfolioServices,
  getPortfolioByService,
} from "../api/portfolioApi";


function Portfolio() {

  const [projects, setProjects] = useState([]);

  const [services, setServices] = useState([]);

  const [selectedService, setSelectedService] =
    useState("all");

  const [loading, setLoading] = useState(true);

  const [serviceLoading, setServiceLoading] =
    useState(false);


  // =========================================
  // Load Initial Portfolio + Services
  // =========================================

  useEffect(() => {

    const loadInitialData = async () => {

      try {

        const [
          portfolioResponse,
          servicesResponse,
        ] = await Promise.all([

          getPortfolio(),

          getPortfolioServices(),

        ]);


        setProjects(
          portfolioResponse.data
        );


        setServices(
          servicesResponse.data
        );


      } catch (error) {

        console.error(
          "Failed to load portfolio:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadInitialData();

  }, []);


  // =========================================
  // Handle Service Selection
  // =========================================

  const handleServiceChange = async (
    serviceId
  ) => {

    setSelectedService(serviceId);


    // -----------------------------------------
    // ALL SERVICES
    // -----------------------------------------

    if (serviceId === "all") {

      try {

        setServiceLoading(true);

        const response =
          await getPortfolio();

        setProjects(
          response.data
        );

      } catch (error) {

        console.error(
          "Failed to load portfolio:",
          error
        );

      } finally {

        setServiceLoading(false);

      }

      return;

    }


    // -----------------------------------------
    // SPECIFIC SERVICE
    // -----------------------------------------

    try {

      setServiceLoading(true);


      const response =
        await getPortfolioByService(
          serviceId
        );


      setProjects(
        response.data
      );


    } catch (error) {

      console.error(
        "Failed to load service portfolio:",
        error
      );

      setProjects([]);

    } finally {

      setServiceLoading(false);

    }

  };


  // =========================================
  // Portfolio PDF URL
  // =========================================

  const getPortfolioViewUrl = (
    portfolioId
  ) => {

    return (
      `${api.defaults.baseURL}` +
      `/portfolio/${portfolioId}/view`
    );

  };


  return (

    <>

      <Navbar />


      {/* =========================================
          HERO
      ========================================= */}

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


      {/* =========================================
          FEATURED SERVICES
      ========================================= */}

      <section className="bg-[#0D1117] px-6 md:px-8 pb-10">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">

            <p className="uppercase tracking-[4px] text-yellow-500 text-sm mb-3">

              EXPLORE OUR WORK

            </p>


            <h2 className="text-3xl md:text-4xl font-bold text-white">

              Featured Services

            </h2>


            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">

              Explore selected client work by service.

            </p>

          </div>


          {/* -----------------------------------------
              SERVICE FILTERS
          ----------------------------------------- */}

          <div className="flex flex-wrap justify-center gap-3">

            {/* ALL SERVICES */}

            <button
              onClick={() =>
                handleServiceChange("all")
              }
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                selectedService === "all"

                  ? "bg-yellow-500 text-black border-yellow-500"

                  : "bg-[#161B22] text-zinc-300 border-zinc-700 hover:border-yellow-500 hover:text-yellow-500"
              }`}
            >

              All Services

            </button>


            {/* INDIVIDUAL SERVICES */}

            {services.map((service) => (

              <button
                key={service.id}
                onClick={() =>
                  handleServiceChange(
                    service.id
                  )
                }
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                  selectedService === service.id

                    ? "bg-yellow-500 text-black border-yellow-500"

                    : "bg-[#161B22] text-zinc-300 border-zinc-700 hover:border-yellow-500 hover:text-yellow-500"
                }`}
              >

                {service.name}

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          PORTFOLIO PROJECTS
      ========================================= */}

      <section className="bg-[#0D1117] px-6 md:px-8 pb-28">

        <div className="max-w-7xl mx-auto">


          {/* -----------------------------------------
              LOADING
          ----------------------------------------- */}

          {loading && (

            <div className="text-center py-20">

              <p className="text-zinc-400">

                Loading portfolio...

              </p>

            </div>

          )}


          {/* -----------------------------------------
              SERVICE LOADING
          ----------------------------------------- */}

          {!loading && serviceLoading && (

            <div className="text-center py-16">

              <p className="text-zinc-400">

                Loading projects...

              </p>

            </div>

          )}


          {/* -----------------------------------------
              EMPTY
          ----------------------------------------- */}

          {!loading &&
            !serviceLoading &&
            projects.length === 0 && (

              <div className="text-center py-20">

                <p className="text-zinc-400">

                  No portfolio projects available
                  for this service.

                </p>

              </div>

            )}


          {/* -----------------------------------------
              ALL MATCHING PROJECTS
          ----------------------------------------- */}

          {!loading &&
            !serviceLoading &&
            projects.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {projects.map(
                  (project) => (

                    <a
                      key={project.id}
                      href={getPortfolioViewUrl(
                        project.id
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="group block rounded-3xl overflow-hidden bg-[#161B22] border border-zinc-800 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300"
                    >


                      {/* -----------------------------------------
                          THUMBNAIL
                      ----------------------------------------- */}

                      <div className="bg-[#0D1117] overflow-hidden">

                        {project.thumbnail ? (

                          <img
                            src={
                              project.thumbnail
                            }
                            alt={
                              project.title
                            }
                            className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-500"
                          />

                        ) : (

                          <div className="h-64 flex items-center justify-center">

                            <span className="text-7xl">

                              📂

                            </span>

                          </div>

                        )}

                      </div>


                      {/* -----------------------------------------
                          PROJECT INFORMATION
                      ----------------------------------------- */}

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


                        <div className="mt-6">

                          <span className="text-sm text-zinc-500 group-hover:text-yellow-500 transition-colors duration-300">

                            View Project →

                          </span>

                        </div>

                      </div>

                    </a>

                  )
                )}

              </div>

            )}

        </div>

      </section>


      <CTA />

      <Footer />

    </>

  );

}


export default Portfolio;