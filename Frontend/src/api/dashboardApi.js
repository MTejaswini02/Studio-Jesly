import { getContacts } from "./contactApi";
import { getClients } from "./clientApi";
import { getServices } from "./serviceApi";
import { getProjects } from "./projectApi";
import { getPortfolio } from "./portfolioApi";
import { getFiles } from "./projectFileApi";
import { getActivityLogs } from "./activityLogApi";

export async function getDashboardData() {

  const [

    contacts,

    clients,

    services,

    projects,

    portfolio,

    files,

    activities,

  ] = await Promise.all([

    getContacts(),

    getClients(),

    getServices(),

    getProjects(),

    getPortfolio(),

    getFiles(),

    getActivityLogs(),

  ]);

  return {

    contacts: contacts.data,

    clients: clients.data,

    services: services.data,

    projects: projects.data,

    portfolio: portfolio.data,

    files: files.data,

    activities: activities.data,

  };

}