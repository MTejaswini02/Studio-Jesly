import { useEffect, useState } from "react";

import {
  getProjects,
} from "../../api/projectApi";

import {
  getClients,
} from "../../api/clientApi";

import {
  getServices,
} from "../../api/serviceApi";

import {
  getUsers,
} from "../../api/userApi";

function ProjectsSection() {

  const [projects, setProjects] = useState([]);

  const [clients, setClients] = useState([]);

  const [services, setServices] = useState([]);

  const [users, setUsers] = useState([]);

  const loadData = async () => {

    try {

      const [

        projectsRes,

        clientsRes,

        servicesRes,

        usersRes,

      ] = await Promise.all([

        getProjects(),

        getClients(),

        getServices(),

        getUsers(),

      ]);

      setProjects(projectsRes.data);

      setClients(clientsRes.data);

      setServices(servicesRes.data);

      setUsers(usersRes.data);

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

  const getClientName = (id) => {

    const client = clients.find(

      (client) => client.id === id

    );

    return client ? client.full_name : "-";

  };

  const getServiceName = (id) => {

    const service = services.find(

      (service) => service.id === id

    );

    return service ? service.name : "-";

  };

  const getUserName = (id) => {

    const user = users.find(

      (user) => user.id === id

    );

    return user ? user.full_name : "-";

  };

  return (

    <>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-white">

          Projects

        </h1>

        <button
          className="bg-yellow-500 text-black px-5 py-3 rounded-lg font-semibold hover:bg-yellow-400"
        >

          + New Project

        </button>

      </div>

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

            {

              projects.length === 0 ?

              (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center p-8 text-gray-400"
                  >

                    No Projects Found

                  </td>

                </tr>

              )

              :

              (

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

                      {getClientName(project.client_id)}

                    </td>

                    <td className="p-4 text-gray-300">

                      {getServiceName(project.service_id)}

                    </td>

                    <td className="p-4 text-gray-300">

                      {getUserName(project.assigned_to)}

                    </td>

                    <td className="p-4">

                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">

                        {project.status}

                      </span>

                    </td>

                    <td className="p-4">

                      {project.priority}

                    </td>

                    <td className="p-4 flex justify-center gap-3">

                      <button
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                      >

                        Edit

                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </>

  );

}

export default ProjectsSection;