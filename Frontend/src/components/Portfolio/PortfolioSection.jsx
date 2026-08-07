import { useEffect, useState } from "react";

import {
  getPortfolio,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "../../api/portfolioApi";

import { getProjects } from "../../api/projectApi";

import CrudModal from "../Common/CrudModal";
import Button from "../Common/Button";

function PortfolioSection() {

  const emptyForm = {
    project_id: "",
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    is_featured: false,
  };

  const [portfolio, setPortfolio] = useState([]);
  const [projects, setProjects] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const fields = [

    {
      name: "project_id",
      label: "Project",
      type: "select",
      options: projects.map((project) => ({
        value: project.id,
        label: project.title,
      })),
    },

    {
      name: "title",
      label: "Title",
    },

    {
      name: "category",
      label: "Category",
    },

    {
      name: "description",
      label: "Description",
      type: "textarea",
    },

    {
      name: "thumbnail",
      label: "Thumbnail URL",
    },

    {
      name: "is_featured",
      label: "Featured",
      type: "checkbox",
    },

  ];
  const loadData = async () => {

    try {

      const [

        portfolioRes,
        projectRes,

      ] = await Promise.all([

        getPortfolio(),

        getProjects(),

      ]);

      setPortfolio(portfolioRes.data);

      setProjects(projectRes.data);

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

  const getProjectTitle = (id) => {

    const project = projects.find(
      (item) => item.id === id
    );

    return project
      ? project.title
      : "-";

  };

  const handleAdd = () => {

    setEditingId(null);

    setFormData(emptyForm);

    setIsModalOpen(true);

  };

  const handleEdit = (item) => {

    setEditingId(item.id);

    setFormData({
      project_id: item.project_id,
      title: item.title,
      category: item.category,
      description: item.description || "",
      thumbnail: item.thumbnail || "",
      is_featured: item.is_featured,
    });

    setIsModalOpen(true);

  };

  const handleSave = async () => {

    try {

      const payload = {
        ...formData,
        project_id: Number(formData.project_id),
      };

      if (editingId) {

        await updatePortfolioItem(
          editingId,
          payload
        );

      } else {

        await createPortfolioItem(
          payload
        );

      }

      setIsModalOpen(false);

      setEditingId(null);

      setFormData(emptyForm);

      loadData();

    } catch (error) {

      console.error(error);

      alert("Operation failed.");

    }

  };

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Delete this portfolio item?"
    );

    if (!confirmed) return;

    try {

      await deletePortfolioItem(id);

      loadData();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <>

      <div className="flex justify-between items-center mb-6">

        

        <Button
          variant="primary"
          onClick={handleAdd}
        >
          Add Portfolio
        </Button>

      </div>

      <CrudModal
        isOpen={isModalOpen}
        title={
          editingId
            ? "Edit Portfolio"
            : "Add Portfolio"
        }
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />

            <div className="bg-[#161B22] rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1F2937]">

            <tr>

              <th className="p-4 text-left text-white">
                Project
              </th>

              <th className="p-4 text-left text-white">
                Title
              </th>

              <th className="p-4 text-left text-white">
                Category
              </th>

              <th className="p-4 text-left text-white">
                Featured
              </th>

              <th className="p-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {portfolio.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-400"
                >
                  No Portfolio Items Found
                </td>

              </tr>

            ) : (

              portfolio.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-zinc-800 hover:bg-[#202734]"
                >

                  <td className="p-4 text-white">
                    {getProjectTitle(item.project_id)}
                  </td>

                  <td className="p-4 text-white">
                    {item.title}
                  </td>

                  <td className="p-4 text-gray-300">
                    {item.category}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full ${
                        item.is_featured
                          ? "bg-green-500/20 text-green-400"
                          : "bg-zinc-700 text-gray-300"
                      }`}
                    >
                      {item.is_featured ? "Yes" : "No"}
                    </span>

                  </td>

                  <td className="p-4 flex justify-center gap-2">

                    <Button
                      variant="edit"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="delete"
                      onClick={() => handleDelete(item.id)}
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

export default PortfolioSection;