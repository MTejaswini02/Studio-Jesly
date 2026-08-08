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

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };


  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-[#161B22] rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold text-white mb-6">
          {title}
        </h2>


        <div className="space-y-5">

          {fields.map((field) => (

            <div key={field.name}>

              <label className="block text-gray-300 mb-2">
                {field.label}
              </label>


              {/* Select */}

              {field.type === "select" && (

                <select
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg px-4 py-3 text-white"
                >

                  <option value="">
                    Select...
                  </option>


                  {field.options?.map((option) => (

                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>

                  ))}

                </select>

              )}


              {/* Textarea */}

              {field.type === "textarea" && (

                <textarea
                  rows="4"
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg px-4 py-3 text-white"
                />

              )}


              {/* Checkbox */}

              {field.type === "checkbox" && (

                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    name={field.name}
                    checked={
                      formData[field.name] ?? false
                    }
                    onChange={handleChange}
                  />

                  <span className="text-white">
                    Featured
                  </span>

                </div>

              )}


              {/* Normal Inputs
                  Supports text, email, password,
                  number, date, etc.
              */}

              {![
                "select",
                "textarea",
                "checkbox",
              ].includes(field.type) && (

                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  className="w-full bg-[#0D1117] border border-zinc-700 rounded-lg px-4 py-3 text-white"
                />

              )}

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