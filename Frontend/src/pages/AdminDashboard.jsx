import { useEffect, useState } from "react";

import Layout from "../components/Dashboard/Layout";
import DashboardOverview from "../components/Dashboard/DashboardOverview";

import ContactsSection from "../components/Contacts/ContactsSection";
import ClientsSection from "../components/Clients/ClientsSection";
import ServicesSection from "../components/Services/ServicesSection";
import ProjectsSection from "../components/Projects/ProjectsSection";
import PortfolioSection from "../components/Portfolio/PortfolioSection";
import FilesSection from "../components/Files/FilesSection";
import ActivityLogsSection from "../components/ActivityLogs/ActivityLogsSection";

import {
  getContacts,
  deleteContact,
  updateStatus,
} from "../api/contactApi";

function AdminDashboard() {

  const [activePage, setActivePage] = useState("dashboard");

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  async function loadContacts() {
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchContacts = async () => {
      await loadContacts();
    };

    fetchContacts();
  }, []);

  const totalContacts = contacts.length;

  const pendingContacts = contacts.filter(
    (contact) => contact.status === "Pending"
  ).length;

  const completedContacts = contacts.filter(
    (contact) => contact.status === "Completed"
  ).length;

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmed) return;

    try {
      await deleteContact(id);
      await loadContacts();
    } catch (error) {
      console.error(error);
    }

  };

  const handleStatusChange = async (id, status) => {

    try {
      await updateStatus(id, status);
      await loadContacts();
    } catch (error) {
      console.error(error);
    }

  };

  const renderContent = () => {

    switch (activePage) {

      case "dashboard":
        return (
          <DashboardOverview
            totalContacts={totalContacts}
            pendingContacts={pendingContacts}
            completedContacts={completedContacts}
          />
        );

      case "contacts":
        return (
          <ContactsSection
            contacts={contacts}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        );

      case "clients":
        return <ClientsSection />;

      case "services":
        return <ServicesSection />;

      case "projects":
        return <ProjectsSection />;

      case "portfolio":
        return <PortfolioSection />;

      case "files":
        return <FilesSection />;

      case "activity":
        return <ActivityLogsSection />;

      default:
        return (
          <DashboardOverview
            totalContacts={totalContacts}
            pendingContacts={pendingContacts}
            completedContacts={completedContacts}
          />
        );

    }

  };

  return (

    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {renderContent()}
    </Layout>

  );

}

export default AdminDashboard;