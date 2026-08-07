import { useEffect, useState } from "react";
import { getDashboardData } from "../../api/dashboardApi";

function DashboardOverview() {

  const [data, setData] = useState(null);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const result =
          await getDashboardData();

        setData(result);

      } catch (error) {

        console.error(error);

      }

    }

    loadDashboard();

  }, []);

  if (!data) {

    return (

      <div className="text-white">

        Loading Dashboard...

      </div>

    );

  }

  const pendingContacts =
    data.contacts.filter(
      (c) => c.status === "Pending"
    ).length;

  const completedProjects =
    data.projects.filter(
      (p) => p.status === "Completed"
    ).length;

  return (

    <>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        <Card
          title="Projects"
          value={data.projects.length}
        />

        <Card
          title="Clients"
          value={data.clients.length}
        />

        <Card
          title="Services"
          value={data.services.length}
        />

        <Card
          title="Portfolio"
          value={data.portfolio.length}
        />

        <Card
          title="Files"
          value={data.files.length}
        />

        <Card
          title="Pending Contacts"
          value={pendingContacts}
        />

        <Card
          title="Completed Projects"
          value={completedProjects}
        />

        <Card
          title="Activities"
          value={data.activities.length}
        />

      </div>

      <div className="bg-[#161B22] rounded-xl mt-8 p-6">

        <h2 className="text-2xl font-semibold text-white mb-5">

          Recent Activity

        </h2>

        {

          data.activities
            .slice(0, 5)
            .map((activity) => (

              <div
                key={activity.id}
                className="border-b border-zinc-800 py-4"
              >

                <p className="text-white">

                  {activity.activity}

                </p>

                <p className="text-gray-500 text-sm">

                  {

                    new Date(
                      activity.created_at
                    ).toLocaleString()

                  }

                </p>

              </div>

            ))

        }

      </div>

    </>

  );

}

function Card({

  title,

  value,

}) {

  return (

    <div className="bg-[#161B22] rounded-xl p-6">

      <h3 className="text-gray-400">

        {title}

      </h3>

      <p className="text-4xl font-bold text-white mt-3">

        {value}

      </p>

    </div>

  );

}

export default DashboardOverview;