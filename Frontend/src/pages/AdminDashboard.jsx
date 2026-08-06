import { useEffect, useState } from "react";
import ContactModal from "../components/Contacts/ContactModal";
import Layout from "../components/Dashboard/Layout";
import ContactTable from "../components/Contacts/ContactTable";
import {
  getContacts,
  deleteContact,
  updateStatus,
} from "../api/contactApi";

function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Load contacts from backend
  async function loadContacts() {
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      console.error("Failed to load contacts:", error);
    }
  }

  useEffect(() => {
    const fetchContacts = async () => {
      await loadContacts();
    };

    fetchContacts();
  }, []);

  // Dashboard Statistics
  const totalContacts = contacts.length;

  const pendingContacts = contacts.filter(
    (contact) => contact.status === "Pending"
  ).length;

  const completedContacts = contacts.filter(
    (contact) => contact.status === "Completed"
  ).length;

  // View Contact
  const handleView = (contact) => {
    setSelectedContact(contact);
  };

  // Delete Contact
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

  // Update Status
  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status);

      alert("Status updated successfully.");

      await loadContacts();
    } catch (error) {
      console.error(error);

      alert("Failed to update status.");
    }
  };
  return (
    <Layout>

      <h1 className="text-3xl font-bold text-white mb-6">
        Contact Requests
      </h1>

      {/* Dashboard Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-[#161B22] rounded-xl p-6">

          <h3 className="text-gray-400">
            Total Contacts
          </h3>

          <p className="text-4xl font-bold text-white mt-3">
            {totalContacts}
          </p>

        </div>

        <div className="bg-[#161B22] rounded-xl p-6">

          <h3 className="text-gray-400">
            Pending
          </h3>

          <p className="text-4xl font-bold text-yellow-400 mt-3">
            {pendingContacts}
          </p>

        </div>

        <div className="bg-[#161B22] rounded-xl p-6">

          <h3 className="text-gray-400">
            Completed
          </h3>

          <p className="text-4xl font-bold text-green-400 mt-3">
            {completedContacts}
          </p>

        </div>

      </div>

      {/* Contact Table */}

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

    </Layout>
  );
}

export default AdminDashboard;