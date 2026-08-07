import { useEffect, useState } from "react";

function useCrud({
  getAll,
  createItem,
  updateItem,
  deleteItem,
  emptyForm,
}) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadItems = async () => {
    try {
      const response = await getAll();
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      await loadItems();
    };

    fetchItems();
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {

      if (editingId) {
        await updateItem(editingId, formData);
      } else {
        await createItem(formData);
      }

      setIsModalOpen(false);
      loadItems();

    } catch (error) {
      console.error(error);
      alert("Operation failed.");
    }
  };

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) return;

    try {

      await deleteItem(id);

      loadItems();

    } catch (error) {
      console.error(error);
    }
  };

  return {

    items,

    formData,
    setFormData,

    editingId,

    isModalOpen,
    setIsModalOpen,

    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,

    reload: loadItems,

  };
}

export default useCrud;