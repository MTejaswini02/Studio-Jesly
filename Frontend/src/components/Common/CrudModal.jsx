function CrudModal({
  isOpen,
  title,
  fields,
  formData,
  setFormData,
  onSave,
  onClose,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-[#161B22] rounded-xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          {title}
        </h2>

        <div className="space-y-4">

          {fields.map((field) => (

            <div key={field.name}>

              <label className="block text-gray-300 mb-2">
                {field.label}
              </label>

              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
              />

            </div>

          ))}

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-5 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default CrudModal;