import { useEffect, useState } from "react";

import {
  getFiles,
  uploadFile,
  deleteFile,
} from "../../api/projectFileApi";

import { getProjects } from "../../api/projectApi";

import Button from "../Common/Button";

function FilesSection() {

  const [files, setFiles] = useState([]);

  const [projects, setProjects] = useState([]);

  const [projectId, setProjectId] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const loadData = async () => {

    try {

      const [

        filesRes,

        projectsRes,

      ] = await Promise.all([

        getFiles(),

        getProjects(),

      ]);

      setFiles(filesRes.data);

      setProjects(projectsRes.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };

    fetchData();
  }, []);

  const getProjectTitle = (id) => {

    const project = projects.find(
      (item) => item.id === id
    );

    return project
      ? project.title
      : "-";

  };

  const handleUpload = async () => {

    if (!projectId || !selectedFile) {

      alert("Select project and file.");

      return;

    }

    try {

      const formData = new FormData();

      formData.append(
        "project_id",
        projectId
      );

      formData.append(
        "file",
        selectedFile
      );

      await uploadFile(formData);

      setProjectId("");

      setSelectedFile(null);

      await loadData();

    } catch (error) {

      console.error(error);

      alert("Upload failed.");

    }

  };

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Delete this file?"
    );

    if (!confirmed) return;

    try {

      await deleteFile(id);

      await loadData();

    } catch (error) {

      console.error(error);

    }

  };

    return (

    <>

      <div className="flex justify-between items-center mb-6">

        

      </div>

      <div className="bg-[#161B22] rounded-xl p-6 mb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>

            <label className="block text-gray-300 mb-2">
              Project
            </label>

            <select
              value={projectId}
              onChange={(e) =>
                setProjectId(e.target.value)
              }
              className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
            >

              <option value="">
                Select Project
              </option>

              {projects.map((project) => (

                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.title}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block text-gray-300 mb-2">
              Choose File
            </label>

            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
              className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-2 text-white"
            />

          </div>

          <div className="flex items-end">

            <Button
              variant="primary"
              onClick={handleUpload}
            >
              Upload File
            </Button>

          </div>

        </div>

      </div>

      <div className="bg-[#161B22] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1F2937]">

            <tr>

              <th className="p-4 text-left text-white">
                Project
              </th>

              <th className="p-4 text-left text-white">
                File Name
              </th>

              <th className="p-4 text-left text-white">
                Uploaded At
              </th>

              <th className="p-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {files.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center text-gray-400 p-8"
                >
                  No Files Found
                </td>

              </tr>

            ) : (

              files.map((file) => (

                <tr
                  key={file.id}
                  className="border-t border-zinc-800 hover:bg-[#202734]"
                >

                  <td className="p-4 text-white">
                    {getProjectTitle(file.project_id)}
                  </td>

                  <td className="p-4 text-gray-300">
                    {file.file_name}
                  </td>

                  <td className="p-4 text-gray-300">
                    {new Date(
                      file.uploaded_at
                    ).toLocaleString()}
                  </td>

                  <td className="p-4 flex justify-center gap-2">

                    <a
                      href={`http://127.0.0.1:8000/${file.file_path}`}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <Button
                        variant="edit"
                      >
                        Open
                      </Button>

                    </a>

                    <Button
                      variant="delete"
                      onClick={() =>
                        handleDelete(file.id)
                      }
                    >
                      Delete
                    </Button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </>

  );

}

export default FilesSection;