import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projectApi";

import { getClients } from "../../api/clientApi";
import { getServices } from "../../api/serviceApi";
import { getUsers } from "../../api/userApi";

import Button from "../Common/Button";


function ProjectsSection() {

  const emptyForm = {
    project_code: "",
    title: "",
    description: "",

    client_id: "",
    service_id: "",
    assigned_to: "",

    status: "Pending",
    priority: "Medium",

    estimated_hours: "",

    start_date: "",
    due_date: "",

    notes: "",
  };


  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);


  // -----------------------------------------
  // Load Data
  // -----------------------------------------

  const loadData = async () => {

    try {

      const [
        projectRes,
        clientRes,
        serviceRes,
        userRes,
      ] = await Promise.all([
        getProjects(),
        getClients(),
        getServices(),
        getUsers(),
      ]);


      setProjects(projectRes.data);
      setClients(clientRes.data);
      setServices(serviceRes.data);
      setUsers(userRes.data);

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


  // -----------------------------------------
  // Get Client Name
  // -----------------------------------------

  const getClientName = (id) => {

    const client = clients.find(
      (item) => item.id === id
    );

    return client
      ? client.full_name
      : "-";

  };


  // -----------------------------------------
  // Get Service Name
  // -----------------------------------------

  const getServiceName = (id) => {

    const service = services.find(
      (item) => item.id === id
    );

    return service
      ? service.name
      : "-";

  };


  // -----------------------------------------
  // Get User Name
  // -----------------------------------------

  const getUserName = (id) => {

    const user = users.find(
      (item) => item.id === id
    );

    return user
      ? user.full_name
      : "-";

  };


  // -----------------------------------------
  // Handle Input
  // -----------------------------------------

  const handleInputChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // -----------------------------------------
  // Add Project
  // -----------------------------------------

  const handleAdd = () => {

    setEditingId(null);

    setFormData({
      ...emptyForm
    });

    setShowForm(true);

  };


  // -----------------------------------------
  // Edit Project
  // -----------------------------------------

  const handleEdit = (project) => {

    setEditingId(project.id);


    setFormData({

      project_code:
        project.project_code,

      title:
        project.title,

      description:
        project.description || "",


      client_id:
        project.client_id,

      service_id:
        project.service_id,

      assigned_to:
        project.assigned_to,


      status:
        project.status,

      priority:
        project.priority,


      estimated_hours:
        project.estimated_hours ?? "",


      start_date:
        project.start_date || "",

      due_date:
        project.due_date || "",


      notes:
        project.notes || "",

    });


    setShowForm(true);

  };


  // -----------------------------------------
  // Cancel
  // -----------------------------------------

  const handleCancel = () => {

    setShowForm(false);

    setEditingId(null);

    setFormData({
      ...emptyForm
    });

  };


  // -----------------------------------------
  // Save Project
  // -----------------------------------------

  const handleSave = async () => {

    try {

      // Convert frontend form values
      // into the types expected by FastAPI.

      const payload = {

        project_code:
          formData.project_code.trim(),

        title:
          formData.title.trim(),

        description:
          formData.description.trim()
            ? formData.description.trim()
            : null,


        client_id:
          Number(formData.client_id),

        service_id:
          Number(formData.service_id),

        assigned_to:
          Number(formData.assigned_to),


        status:
          formData.status,

        priority:
          formData.priority,


        estimated_hours:
          formData.estimated_hours === ""
            ? null
            : Number(formData.estimated_hours),


        // IMPORTANT:
        // Empty date strings must become null.

        start_date:
          formData.start_date === ""
            ? null
            : formData.start_date,

        due_date:
          formData.due_date === ""
            ? null
            : formData.due_date,


        notes:
          formData.notes.trim()
            ? formData.notes.trim()
            : null,

      };


      console.log(
        "Project payload:",
        payload
      );


      if (editingId) {

        await updateProject(
          editingId,
          payload
        );

      } else {

        await createProject(
          payload
        );

      }


      await loadData();

      handleCancel();


    } catch (error) {

      console.error(
        "Project save error:",
        error
      );


      console.error(
        "Backend response:",
        error?.response?.data
      );


      alert(
        error?.response?.data?.detail ||
        "Failed to save project."
      );

    }

  };


  // -----------------------------------------
  // Delete Project
  // -----------------------------------------

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Delete this project?"
      );


    if (!confirmed) return;


    try {

      await deleteProject(id);

      await loadData();

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.detail ||
        "Failed to delete project."
      );

    }

  };


  return (

    <>

      {/* -----------------------------------------
          Add Project Button
      ----------------------------------------- */}

      <div className="flex justify-between items-center mb-6">

        <Button
          variant="primary"
          onClick={handleAdd}
        >
          + New Project
        </Button>

      </div>


      {/* -----------------------------------------
          Project Form
      ----------------------------------------- */}

      {showForm && (

        <div className="bg-[#161B22] rounded-xl p-6 mb-8">

          <h2 className="text-2xl font-semibold text-white mb-6">

            {editingId
              ? "Edit Project"
              : "Create Project"}

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            {/* Project Code */}

            <div>

              <label className="block text-gray-300 mb-2">
                Project Code
              </label>

              <input
                type="text"
                name="project_code"
                value={formData.project_code}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              />

            </div>


            {/* Project Title */}

            <div>

              <label className="block text-gray-300 mb-2">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              />

            </div>


            {/* Client */}

            <div>

              <label className="block text-gray-300 mb-2">
                Client
              </label>

              <select
                name="client_id"
                value={formData.client_id}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              >

                <option value="">
                  Select Client
                </option>


                {clients.map((client) => (

                  <option
                    key={client.id}
                    value={client.id}
                  >
                    {client.full_name}
                  </option>

                ))}

              </select>

            </div>


            {/* Service */}

            <div>

              <label className="block text-gray-300 mb-2">
                Service
              </label>

              <select
                name="service_id"
                value={formData.service_id}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              >

                <option value="">
                  Select Service
                </option>


                {services.map((service) => (

                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.name}
                  </option>

                ))}

              </select>

            </div>


            {/* Assigned To */}

            <div>

              <label className="block text-gray-300 mb-2">
                Assigned To
              </label>

              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              >

                <option value="">
                  Select User
                </option>


                {users.map((user) => (

                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.full_name}
                  </option>

                ))}

              </select>

            </div>


            {/* Status */}

            <div>

              <label className="block text-gray-300 mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>


            {/* Priority */}

            <div>

              <label className="block text-gray-300 mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

            </div>


            {/* Estimated Hours */}

            <div>

              <label className="block text-gray-300 mb-2">
                Estimated Hours
              </label>

              <input
                type="number"
                name="estimated_hours"
                value={formData.estimated_hours}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              />

            </div>


            {/* Start Date */}

            <div>

              <label className="block text-gray-300 mb-2">
                Start Date
              </label>

              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              />

            </div>


            {/* Due Date */}

            <div>

              <label className="block text-gray-300 mb-2">
                Due Date
              </label>

              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
              />

            </div>

          </div>


          {/* Description */}

          <div className="mt-6">

            <label className="block text-gray-300 mb-2">
              Description
            </label>

            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
            />

          </div>


          {/* Notes */}

          <div className="mt-6">

            <label className="block text-gray-300 mb-2">
              Notes
            </label>

            <textarea
              rows="3"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg p-3 text-white"
            />

          </div>


          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-8">

            <Button
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>


            <Button
              variant="primary"
              onClick={handleSave}
            >
              {editingId
                ? "Update Project"
                : "Save Project"}
            </Button>

          </div>

        </div>

      )}


      {/* -----------------------------------------
          Projects Table
      ----------------------------------------- */}

      <div className="bg-[#161B22] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1F2937]">

            <tr>

              <th className="p-4 text-left text-white">
                Code
              </th>

              <th className="p-4 text-left text-white">
                Title
              </th>

              <th className="p-4 text-left text-white">
                Client
              </th>

              <th className="p-4 text-left text-white">
                Service
              </th>

              <th className="p-4 text-left text-white">
                Assigned To
              </th>

              <th className="p-4 text-left text-white">
                Status
              </th>

              <th className="p-4 text-left text-white">
                Priority
              </th>

              <th className="p-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {projects.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center p-8 text-gray-400"
                >
                  No Projects Found
                </td>

              </tr>

            ) : (

              projects.map((project) => (

                <tr
                  key={project.id}
                  className="border-t border-zinc-800 hover:bg-[#202734]"
                >

                  <td className="p-4 text-white">
                    {project.project_code}
                  </td>

                  <td className="p-4 text-white">
                    {project.title}
                  </td>

                  <td className="p-4 text-gray-300">
                    {getClientName(
                      project.client_id
                    )}
                  </td>

                  <td className="p-4 text-gray-300">
                    {getServiceName(
                      project.service_id
                    )}
                  </td>

                  <td className="p-4 text-gray-300">
                    {getUserName(
                      project.assigned_to
                    )}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {project.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : project.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {project.priority}
                    </span>

                  </td>

                  <td className="p-4 flex justify-center gap-2">

                    <Button
                      variant="edit"
                      onClick={() =>
                        handleEdit(project)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="delete"
                      onClick={() =>
                        handleDelete(project.id)
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


export default ProjectsSection;