import { useEffect, useState } from "react";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../api/serviceApi";

import CrudModal from "../Common/CrudModal";

function ServicesSection() {

  const emptyForm = {
    name: "",
    description: "",
  };

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fields = [
    {
      name: "name",
      label: "Service Name",
    },
    {
      name: "description",
      label: "Description",
    },
  ];

  const loadServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
    const fetchServices = async () => {
      await loadServices();
    };

    fetchServices();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingId(service.id);

    setFormData({
      name: service.name,
      description: service.description || "",
    });

    setIsModalOpen(true);
  };

  const handleSave = async () => {

    try {

      if (editingId) {

        await updateService(
          editingId,
          formData
        );

      } else {

        await createService(formData);

      }

      setIsModalOpen(false);

      loadServices();

    } catch (error) {

      console.error(error);

      alert("Operation failed.");

    }

  };

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Delete this service?"
    );

    if (!confirmed) return;

    try {

      await deleteService(id);

      loadServices();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-white">

          Services

        </h1>

        <button
          onClick={handleAdd}
          className="bg-yellow-500 text-black px-5 py-3 rounded-lg font-semibold hover:bg-yellow-400"
        >

          Add Service

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
                Description
              </th>

              <th className="p-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {services.length === 0 ? (

              <tr>

                <td
                  colSpan="3"
                  className="text-center text-gray-400 p-8"
                >

                  No Services Found

                </td>

              </tr>

            ) : (

              services.map((service) => (

                <tr
                  key={service.id}
                  className="border-t border-zinc-800 hover:bg-[#202734]"
                >

                  <td className="p-4 text-white">

                    {service.name}

                  </td>

                  <td className="p-4 text-gray-300">

                    {service.description}

                  </td>

                  <td className="p-4 flex justify-center gap-3">

                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() => handleDelete(service.id)}
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
            ? "Edit Service"
            : "Add Service"
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

export default ServicesSection;