import { useEffect, useState } from "react";

import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../../api/clientApi";

import CrudModal from "../Common/CrudModal";

function ClientsSection() {

  const emptyForm = {
    full_name: "",
    email: "",
    phone: "",
    company: "",
  };

  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields = [
    {
      name: "full_name",
      label: "Full Name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone",
    },
    {
      name: "company",
      label: "Company",
    },
  ];

  const loadClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      await loadClients();
    };

    fetchClients();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (client) => {
    setEditingId(client.id);

    setFormData({
      full_name: client.full_name,
      email: client.email,
      phone: client.phone || "",
      company: client.company || "",
    });

    setIsModalOpen(true);
  };

  const handleSave = async () => {

    try {

      if (editingId) {

        await updateClient(
          editingId,
          formData
        );

      } else {

        await createClient(formData);

      }

      setIsModalOpen(false);

      loadClients();

    } catch (error) {

      console.error(error);

      alert("Operation failed.");

    }

  };

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Delete this client?"
    );

    if (!confirmed) return;

    try {

      await deleteClient(id);

      loadClients();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <>

      <div className="flex justify-between items-center mb-6">

        

        <button
          onClick={handleAdd}
          className="bg-yellow-500 text-black px-5 py-3 rounded-lg font-semibold hover:bg-yellow-400"
        >

          Add Client

        </button>

      </div>

      <div className="bg-[#161B22] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1F2937]">

            <tr>

              <th className="p-4 text-left text-white">
                Name
              </th>

              <th className="p-4 text-left text-white">
                Email
              </th>

              <th className="p-4 text-left text-white">
                Phone
              </th>

              <th className="p-4 text-left text-white">
                Company
              </th>

              <th className="p-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {clients.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center text-gray-400 p-8"
                >

                  No Clients Found

                </td>

              </tr>

            ) : (

              clients.map((client) => (

                <tr
                  key={client.id}
                  className="border-t border-zinc-800 hover:bg-[#202734]"
                >

                  <td className="p-4 text-white">

                    {client.full_name}

                  </td>

                  <td className="p-4 text-gray-300">

                    {client.email}

                  </td>

                  <td className="p-4 text-gray-300">

                    {client.phone}

                  </td>

                  <td className="p-4 text-gray-300">

                    {client.company}

                  </td>

                  <td className="p-4 flex justify-center gap-3">

                    <button
                      onClick={() => handleEdit(client)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() => handleDelete(client.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <CrudModal
        isOpen={isModalOpen}
        title={
          editingId
            ? "Edit Client"
            : "Add Client"
        }
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />

    </>

  );

}

export default ClientsSection;