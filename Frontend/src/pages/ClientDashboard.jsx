import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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


      {/* -----------------------------------------
          Header
      ----------------------------------------- */}

      <header className="bg-[#161B22] border-b border-zinc-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-bold text-yellow-500">
              Studio Jesly
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Client Portal
            </p>

          </div>


          <div className="flex items-center gap-3">

            <button
                onClick={handleHome}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-2 rounded-lg"
            >
                Home
            </button>

            <button
                onClick={handleLogout}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-2 rounded-lg"
            >
                Logout
            </button>

        </div>

        </div>

      </header>


      {/* -----------------------------------------
          Main
      ----------------------------------------- */}

      <main className="max-w-7xl mx-auto px-6 py-10">


        {/* Welcome */}

        <div className="mb-10">

          <h2 className="text-4xl font-bold mb-3">

            Welcome

            {currentUser?.sub
              ? `, ${currentUser.sub}`
              : ""}

          </h2>

          <p className="text-gray-400">
            Track your projects and monitor their progress.
          </p>

        </div>


        {/* Loading */}

        {loading && (

          <div className="bg-[#161B22] rounded-xl p-10 text-center">

            <p className="text-gray-400">
              Loading your projects...
            </p>

          </div>

        )}


        {/* Error */}

        {!loading && error && (

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">

            <p className="text-red-400">
              {error}
            </p>

          </div>

        )}


        {/* No Projects */}

        {!loading &&
          !error &&
          projects.length === 0 && (

            <div className="bg-[#161B22] rounded-xl p-12 text-center">

              <h3 className="text-2xl font-semibold mb-3">
                No Projects Yet
              </h3>

              <p className="text-gray-400">
                Your projects will appear here once Studio Jesly
                starts working on them.
              </p>

            </div>

        )}


        {/* Projects */}

        {!loading &&
          !error &&
          projects.length > 0 && (

            <div>

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl font-semibold">
                  My Projects
                </h3>

                <span className="text-gray-400">
                  {projects.length}{" "}
                  {projects.length === 1
                    ? "Project"
                    : "Projects"}
                </span>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {projects.map((project) => (

                  <div
                    key={project.id}
                    className="bg-[#161B22] border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition"
                  >

                    <div className="flex justify-between items-start mb-4">

                      <span className="text-sm text-gray-500">
                        {project.project_code}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>

                    </div>


                    <h4 className="text-xl font-semibold mb-3">
                      {project.title}
                    </h4>


                    {project.description && (

                      <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                        {project.description}
                      </p>

                    )}


                    <div className="flex justify-between items-center mb-4">

                      <span className="text-gray-500 text-sm">
                        Priority
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyle(
                          project.priority
                        )}`}
                      >
                        {project.priority}
                      </span>

                    </div>


                    {project.due_date && (

                      <div className="flex justify-between items-center mb-5">

                        <span className="text-gray-500 text-sm">
                          Due Date
                        </span>

                        <span className="text-gray-300 text-sm">
                          {project.due_date}
                        </span>

                      </div>

                    )}


                    <button
                      onClick={() =>
                        handleViewDetails(project)
                      }
                      className="w-full mt-3 bg-yellow-500 hover:bg-yellow-400 text-black py-2.5 rounded-lg font-semibold transition"
                    >
                      View Details
                    </button>

                  </div>

                ))}

              </div>

            </div>

        )}

      </main>


      {/* =========================================
          PROJECT DETAILS MODAL
      ========================================= */}

      {selectedProject && (

        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={handleCloseDetails}
        >

          <div
            className="bg-[#161B22] border border-zinc-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-7"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* Modal Header */}

            <div className="flex justify-between items-start mb-6">

              <div>

                <p className="text-sm text-gray-500 mb-1">
                  {selectedProject.project_code}
                </p>

                <h2 className="text-3xl font-bold">
                  {selectedProject.title}
                </h2>

              </div>


              <button
                onClick={handleCloseDetails}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>

            </div>


            {/* Status + Priority */}

            <div className="flex gap-3 mb-7">

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                  selectedProject.status
                )}`}
              >
                {selectedProject.status}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityStyle(
                  selectedProject.priority
                )}`}
              >
                {selectedProject.priority}
              </span>

            </div>


            {/* Description */}

            <div className="mb-6">

              <h3 className="text-lg font-semibold mb-2">
                Description
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {selectedProject.description ||
                  "No description provided."}
              </p>

            </div>


            {/* Project Information */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

              <div className="bg-[#0D1117] rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  Estimated Hours
                </p>

                <p className="text-white mt-1">

                  {selectedProject.estimated_hours ??
                    "Not specified"}

                  {selectedProject.estimated_hours !== null &&
                    selectedProject.estimated_hours !== undefined
                    ? " hrs"
                    : ""}

                </p>

              </div>


              <div className="bg-[#0D1117] rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  Start Date
                </p>

                <p className="text-white mt-1">
                  {selectedProject.start_date ||
                    "Not specified"}
                </p>

              </div>


              <div className="bg-[#0D1117] rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  Due Date
                </p>

                <p className="text-white mt-1">
                  {selectedProject.due_date ||
                    "Not specified"}
                </p>

              </div>


              <div className="bg-[#0D1117] rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  Project ID
                </p>

                <p className="text-white mt-1">
                  #{selectedProject.id}
                </p>

              </div>

            </div>


            {/* Notes */}

            <div className="mb-6">

              <h3 className="text-lg font-semibold mb-2">
                Notes
              </h3>

              <div className="bg-[#0D1117] rounded-lg p-4">

                <p className="text-gray-400">
                  {selectedProject.notes ||
                    "No notes available."}
                </p>

              </div>

            </div>


            {/* =====================================
                PROJECT FILES
            ===================================== */}

            <div className="mb-6">

              <div className="flex justify-between items-center mb-3">

                <h3 className="text-lg font-semibold">
                  Project Files
                </h3>

                {!filesLoading &&
                  projectFiles.length > 0 && (

                    <span className="text-sm text-gray-500">
                      {projectFiles.length}{" "}
                      {projectFiles.length === 1
                        ? "File"
                        : "Files"}
                    </span>

                  )}

              </div>


              {/* Files Loading */}

              {filesLoading && (

                <div className="bg-[#0D1117] rounded-lg p-5">

                  <p className="text-gray-400 text-sm">
                    Loading project files...
                  </p>

                </div>

              )}


              {/* File Error */}

              {!filesLoading && fileError && (

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">

                  <p className="text-red-400 text-sm">
                    {fileError}
                  </p>

                </div>

              )}


              {/* No Files */}

              {!filesLoading &&
                !fileError &&
                projectFiles.length === 0 && (

                  <div className="bg-[#0D1117] rounded-lg p-5">

                    <p className="text-gray-500 text-sm">
                      No files have been uploaded for this project yet.
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
                        className="bg-[#0D1117] border border-zinc-800 rounded-lg p-4 flex items-center justify-between gap-4"
                      >

                        <div className="min-w-0">

                          <p className="text-white font-medium truncate">
                            📄 {file.file_name}
                          </p>

                          <p className="text-gray-500 text-xs mt-1">
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
                          className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Open
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
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2.5 rounded-lg"
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