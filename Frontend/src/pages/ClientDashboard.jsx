import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  getClientProjects,
  getClientProjectFiles,
  getClientProjectFile,
} from "../api/projectApi";

import {
  getCurrentUser,
  logout,
} from "../utils/auth";


function ClientDashboard() {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedProject, setSelectedProject] = useState(null);

  const [projectFiles, setProjectFiles] = useState([]);

  const [filesLoading, setFilesLoading] = useState(false);

  const [fileError, setFileError] = useState("");


  // -----------------------------------------
  // Current User
  // -----------------------------------------

  const currentUser = getCurrentUser();


  // -----------------------------------------
  // Load Client Projects
  // -----------------------------------------

  useEffect(() => {

    const loadClientProjects = async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await getClientProjects();

        setProjects(response.data);

      } catch (error) {

        console.error(
          "Failed to load client projects:",
          error
        );

        console.error(
          "Backend response:",
          error?.response?.data
        );

        setError(
          error?.response?.data?.detail ||
          "Unable to load your projects."
        );

      } finally {

        setLoading(false);

      }

    };


    loadClientProjects();

  }, []);


  // -----------------------------------------
  // Logout
  // -----------------------------------------

  const handleLogout = () => {

    logout();

    navigate("/client/login");

  };

  const handleHome = () => {
    navigate("/");
  };


  // -----------------------------------------
  // Status Style
  // -----------------------------------------

  const getStatusStyle = (status) => {

    if (status === "Completed") {
      return "bg-green-500/20 text-green-400";
    }

    if (status === "In Progress") {
      return "bg-blue-500/20 text-blue-400";
    }

    return "bg-yellow-500/20 text-yellow-400";

  };


  // -----------------------------------------
  // Priority Style
  // -----------------------------------------

  const getPriorityStyle = (priority) => {

    if (priority === "High") {
      return "bg-red-500/20 text-red-400";
    }

    if (priority === "Medium") {
      return "bg-yellow-500/20 text-yellow-400";
    }

    return "bg-green-500/20 text-green-400";

  };


  // -----------------------------------------
  // Open Project Details
  // -----------------------------------------

  const handleViewDetails = async (project) => {

    setSelectedProject(project);

    setProjectFiles([]);

    setFileError("");

    setFilesLoading(true);


    try {

      const response =
        await getClientProjectFiles(project.id);

      setProjectFiles(response.data);

    } catch (error) {

      console.error(
        "Failed to load project files:",
        error
      );

      setFileError(
        error?.response?.data?.detail ||
        "Unable to load project files."
      );

    } finally {

      setFilesLoading(false);

    }

  };


  // -----------------------------------------
  // Close Project Details
  // -----------------------------------------

  const handleCloseDetails = () => {

    setSelectedProject(null);

    setProjectFiles([]);

    setFileError("");

  };


  // -----------------------------------------
  // Open File
  // -----------------------------------------

  const handleOpenFile = async (file) => {

    try {

      const response =
        await getClientProjectFile(file.id);


      const blob = new Blob(
        [response.data],
        {
          type:
            response.headers["content-type"] ||
            "application/octet-stream",
        }
      );


      const fileUrl =
        window.URL.createObjectURL(blob);


      window.open(
        fileUrl,
        "_blank",
        "noopener,noreferrer"
      );


      setTimeout(() => {

        window.URL.revokeObjectURL(
          fileUrl
        );

      }, 60000);

    } catch (error) {

      console.error(
        "Failed to open file:",
        error
      );

      alert(
        error?.response?.data?.detail ||
        "Unable to open this file."
      );

    }

  };


    return (
    <div className="min-h-screen bg-[#0D1117] text-white">

      {/* ================= HEADER ================= */}

      <header className="bg-[#161B22] border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">

          {/* Brand */}

           <NavLink
           
            className="relative block w-[220px] sm:w-[230px] h-[78px] md:h-[82px]"
          >
            {/* studio */}
            <span
              className="
                absolute
                top-[17px]
                left-[29px]
                text-white
                text-[13px]
                sm:text-[14px]
                tracking-[5px]
                leading-none
                whitespace-nowrap
              "
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              studio
            </span>

            {/* jesly */}
            <span
              className="
                absolute
                top-[12px]
                left-[8px]
                text-yellow-500
                text-[64px]
                sm:text-[70px]
                md:text-[70px]
                leading-none
                tracking-[3px]
                whitespace-nowrap
              "
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
              }}
            >
              jesly
            </span>

          </NavLink>


          {/* Right Actions */}

          <div className="flex items-center gap-3">

            <button
              onClick={handleHome}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300"
            >
              Home
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-14">


        {/* ================= WELCOME ================= */}

        <section className="mb-12">

          

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Welcome
            {currentUser?.sub
              ? `, ${currentUser.sub}`
              : ""}
          </h1>

          <p className="text-zinc-400 text-lg mt-4 max-w-2xl">
            Track your projects, review progress and access
            your project files from one place.
          </p>

        </section>


        {/* ================= LOADING ================= */}

        {loading && (

          <div className="bg-[#161B22] border border-zinc-800 rounded-3xl p-12 text-center">

            <div className="w-8 h-8 border-2 border-zinc-700 border-t-yellow-500 rounded-full animate-spin mx-auto mb-5" />

            <p className="text-zinc-400">
              Loading your projects...
            </p>

          </div>

        )}


        {/* ================= ERROR ================= */}

        {!loading && error && (

          <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-6">

            <p className="text-red-400">
              {error}
            </p>

          </div>

        )}


        {/* ================= NO PROJECTS ================= */}

        {!loading &&
          !error &&
          projects.length === 0 && (

            <div className="bg-[#161B22] border border-zinc-800 rounded-3xl p-12 md:p-16 text-center">

              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

                <span className="text-yellow-500 text-2xl">
                  ✦
                </span>

              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                No Projects Yet
              </h2>

              <p className="text-zinc-400 max-w-md mx-auto leading-7">
                Your projects will appear here once
                Studio Jesly starts working on them.
              </p>

            </div>

          )}


        {/* ================= PROJECTS ================= */}

        {!loading &&
          !error &&
          projects.length > 0 && (

            <section>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

                <div>

                  <p className="text-yellow-500 text-sm uppercase tracking-[3px] mb-2">
                    Your Work
                  </p>

                  <h2 className="text-3xl font-bold">
                    My Projects
                  </h2>

                </div>

                <span className="text-zinc-500">
                  {projects.length}{" "}
                  {projects.length === 1
                    ? "Project"
                    : "Projects"}
                </span>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                {projects.map((project) => (

                  <div
                    key={project.id}
                    className="group bg-[#161B22] border border-zinc-800 rounded-3xl p-7 hover:border-yellow-500/40 hover:-translate-y-1 transition-all duration-300"
                  >

                    {/* Top */}

                    <div className="flex justify-between items-start gap-4 mb-6">

                      <span className="text-xs text-zinc-500 font-medium">
                        {project.project_code}
                      </span>

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>

                    </div>


                    {/* Title */}

                    <h3 className="text-2xl font-semibold mb-3">
                      {project.title}
                    </h3>


                    {/* Description */}

                    {project.description && (

                      <p className="text-zinc-400 text-sm leading-7 mb-6 line-clamp-3">
                        {project.description}
                      </p>

                    )}


                    {/* Project Info */}

                    <div className="space-y-4 mb-7">

                      <div className="flex justify-between items-center">

                        <span className="text-zinc-500 text-sm">
                          Priority
                        </span>

                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${getPriorityStyle(
                            project.priority
                          )}`}
                        >
                          {project.priority}
                        </span>

                      </div>


                      {project.due_date && (

                        <div className="flex justify-between items-center">

                          <span className="text-zinc-500 text-sm">
                            Due Date
                          </span>

                          <span className="text-zinc-300 text-sm">
                            {project.due_date}
                          </span>

                        </div>

                      )}

                    </div>


                    {/* Details Button */}

                    <button
                      onClick={() =>
                        handleViewDetails(project)
                      }
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/10"
                    >
                      View Project
                    </button>

                  </div>

                ))}

              </div>

            </section>

          )}

      </main>


      {/* =====================================================
          PROJECT DETAILS MODAL
      ===================================================== */}

      {selectedProject && (

        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCloseDetails}
        >

          <div
            className="bg-[#161B22] border border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="flex justify-between items-start gap-5 mb-7">

              <div>

                <p className="text-yellow-500 text-sm mb-2">
                  {selectedProject.project_code}
                </p>

                <h2 className="text-2xl md:text-3xl font-bold">
                  {selectedProject.title}
                </h2>

              </div>


              <button
                onClick={handleCloseDetails}
                aria-label="Close project details"
                className="w-10 h-10 shrink-0 rounded-xl bg-[#0D1117] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition"
              >
                ×
              </button>

            </div>


            {/* Status + Priority */}

            <div className="flex flex-wrap gap-3 mb-8">

              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(
                  selectedProject.status
                )}`}
              >
                {selectedProject.status}
              </span>

              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${getPriorityStyle(
                  selectedProject.priority
                )}`}
              >
                {selectedProject.priority}
              </span>

            </div>


            {/* Description */}

            <div className="mb-7">

              <h3 className="text-lg font-semibold mb-3">
                Description
              </h3>

              <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                <p className="text-zinc-400 leading-7">
                  {selectedProject.description ||
                    "No description provided."}
                </p>

              </div>

            </div>


            {/* Project Information */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">

              <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                <p className="text-zinc-500 text-sm">
                  Estimated Hours
                </p>

                <p className="text-white mt-2 font-medium">

                  {selectedProject.estimated_hours ??
                    "Not specified"}

                  {selectedProject.estimated_hours !== null &&
                    selectedProject.estimated_hours !== undefined
                    ? " hrs"
                    : ""}

                </p>

              </div>


              <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                <p className="text-zinc-500 text-sm">
                  Start Date
                </p>

                <p className="text-white mt-2 font-medium">
                  {selectedProject.start_date ||
                    "Not specified"}
                </p>

              </div>


              <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                <p className="text-zinc-500 text-sm">
                  Due Date
                </p>

                <p className="text-white mt-2 font-medium">
                  {selectedProject.due_date ||
                    "Not specified"}
                </p>

              </div>


              <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                <p className="text-zinc-500 text-sm">
                  Project ID
                </p>

                <p className="text-white mt-2 font-medium">
                  #{selectedProject.id}
                </p>

              </div>

            </div>


            {/* Notes */}

            <div className="mb-7">

              <h3 className="text-lg font-semibold mb-3">
                Notes
              </h3>

              <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                <p className="text-zinc-400 leading-7">
                  {selectedProject.notes ||
                    "No notes available."}
                </p>

              </div>

            </div>


            {/* ================= PROJECT FILES ================= */}

            <div className="mb-7">

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-lg font-semibold">
                  Project Files
                </h3>

                {!filesLoading &&
                  projectFiles.length > 0 && (

                    <span className="text-sm text-zinc-500">
                      {projectFiles.length}{" "}
                      {projectFiles.length === 1
                        ? "File"
                        : "Files"}
                    </span>

                  )}

              </div>


              {/* Files Loading */}

              {filesLoading && (

                <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-400 text-sm">
                    Loading project files...
                  </p>

                </div>

              )}


              {/* File Error */}

              {!filesLoading &&
                fileError && (

                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">

                    <p className="text-red-400 text-sm">
                      {fileError}
                    </p>

                  </div>

                )}


              {/* No Files */}

              {!filesLoading &&
                !fileError &&
                projectFiles.length === 0 && (

                  <div className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-5">

                    <p className="text-zinc-500 text-sm">
                      No files have been uploaded for
                      this project yet.
                    </p>

                  </div>

                )}


              {/* Files */}

              {!filesLoading &&
                !fileError &&
                projectFiles.length > 0 && (

                  <div className="space-y-3">

                    {projectFiles.map((file) => (

                      <div
                        key={file.id}
                        className="bg-[#0D1117] border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >

                        <div className="min-w-0">

                          <p className="text-white font-medium truncate">
                            📄 {file.file_name}
                          </p>

                          <p className="text-zinc-500 text-xs mt-1">
                            Uploaded{" "}
                            {file.uploaded_at
                              ? new Date(
                                  file.uploaded_at
                                ).toLocaleString()
                              : ""}
                          </p>

                        </div>


                        <button
                          onClick={() =>
                            handleOpenFile(file)
                          }
                          className="shrink-0 bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                        >
                          Open File
                        </button>

                      </div>

                    ))}

                  </div>

                )}

            </div>


            {/* Close */}

            <div className="flex justify-end">

              <button
                onClick={handleCloseDetails}
                className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-white px-7 py-3 rounded-xl font-medium transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );

}

export default ClientDashboard;