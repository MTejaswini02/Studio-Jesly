import { useEffect, useState } from "react";

import Layout from "../components/Dashboard/Layout";

import ContactTable from "../components/Contacts/ContactTable";
import ContactModal from "../components/Contacts/ContactModal";

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
      try {
        await loadContacts();
      } catch (error) {
      console.error(error);
    }
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

  const handleView = (contact) => {
    setSelectedContact(contact);
  };

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmed) return;

    await deleteContact(id);

    loadContacts();

  };

  const handleStatusChange = async (id, status) => {

    await updateStatus(id, status);

    loadContacts();

  };

  return (

    <Layout
      activePage={activePage}
      setActivePage={setActivePage}
    >

      {/* ================= DASHBOARD ================= */}

      {activePage === "dashboard" && (

        <>

          <h1 className="text-3xl font-bold text-white mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#161B22] p-6 rounded-xl">

              <h3 className="text-gray-400">
                Total Contacts
              </h3>

              <p className="text-4xl font-bold text-white mt-3">
                {totalContacts}
              </p>

            </div>

            <div className="bg-[#161B22] p-6 rounded-xl">

              <h3 className="text-gray-400">
                Pending
              </h3>

              <p className="text-4xl font-bold text-yellow-400 mt-3">
                {pendingContacts}
              </p>

            </div>

            <div className="bg-[#161B22] p-6 rounded-xl">

              <h3 className="text-gray-400">
                Completed
              </h3>

              <p className="text-4xl font-bold text-green-400 mt-3">
                {completedContacts}
              </p>

            </div>

          </div>

        </>

      )}

      {/* ================= CONTACTS ================= */}

      {activePage === "contacts" && (

        <>

          <h1 className="text-3xl font-bold text-white mb-6">
            Contact Requests
          </h1>

          <ContactTable
            contacts={contacts}
            onView={handleView}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />

          <ContactModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />

        </>

      )}

      {/* ================= CLIENTS ================= */}

      {activePage === "clients" && (

        <h1 className="text-3xl text-white">
          Clients Module
        </h1>

      )}

      {/* ================= SERVICES ================= */}

      {activePage === "services" && (

        <h1 className="text-3xl text-white">
          Services Module
        </h1>

      )}

      {/* ================= PROJECTS ================= */}

      {activePage === "projects" && (

        <h1 className="text-3xl text-white">
          Projects Module
        </h1>

      )}

      {/* ================= PORTFOLIO ================= */}

      {activePage === "portfolio" && (

        <h1 className="text-3xl text-white">
          Portfolio Module
        </h1>

      )}

      {/* ================= FILES ================= */}

      {activePage === "files" && (

        <h1 className="text-3xl text-white">
          Project Files Module
        </h1>

      )}

      {/* ================= ACTIVITY ================= */}

      {activePage === "activity" && (

        <h1 className="text-3xl text-white">
          Activity Logs
        </h1>

      )}

    </Layout>

  );

}

export default AdminDashboard;