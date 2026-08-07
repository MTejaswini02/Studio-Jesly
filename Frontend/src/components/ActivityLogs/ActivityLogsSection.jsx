import { useEffect, useState } from "react";

import { getActivityLogs } from "../../api/activityLogApi";
import { getProjects } from "../../api/projectApi";
import { getUsers } from "../../api/userApi";

function ActivityLogsSection() {

  const [logs, setLogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const loadData = async () => {

    try {

      const [
        logsRes,
        projectsRes,
        usersRes,
      ] = await Promise.all([
        getActivityLogs(),
        getProjects(),
        getUsers(),
      ]);

      setLogs(logsRes.data);
      setProjects(projectsRes.data);
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

  const getProjectName = (id) => {

    const project = projects.find(
      (item) => item.id === id
    );

    return project ? project.title : "Unknown Project";

  };

  const getUserName = (id) => {

    const user = users.find(
      (item) => item.id === id
    );

    return user ? user.full_name : "Unknown User";

  };

  return (

    <>

      <h1 className="text-3xl font-bold text-white mb-6">
        Activity Logs
      </h1>

      <div className="space-y-4">

        {logs.length === 0 ? (

          <div className="bg-[#161B22] rounded-xl p-8 text-center text-gray-400">
            No activity found.
          </div>

        ) : (

          logs.map((log) => (

            <div
              key={log.id}
              className="bg-[#161B22] rounded-xl p-6 border-l-4 border-yellow-500"
            >

              <h3 className="text-lg font-semibold text-white">
                {log.activity}
              </h3>

              <p className="text-gray-300 mt-2">
                <strong>Project:</strong>{" "}
                {getProjectName(log.project_id)}
              </p>

              <p className="text-gray-300">
                <strong>User:</strong>{" "}
                {getUserName(log.user_id)}
              </p>

              <p className="text-gray-500 text-sm mt-3">
                {new Date(
                  log.created_at
                ).toLocaleString()}
              </p>

            </div>

          ))

        )}

      </div>

    </>

  );

}

export default ActivityLogsSection;