function ContactTable({
  contacts,
  onView,
  onDelete,
  onStatusChange,
}) {
  return (

    <div className="w-full overflow-x-auto">

      <table className="w-full min-w-[750px]">

        <thead className="bg-[#1F2937]">

          <tr>

            <th className="p-4 text-left text-white whitespace-nowrap">
              Name
            </th>

            <th className="p-4 text-left text-white whitespace-nowrap">
              Email
            </th>

            <th className="p-4 text-left text-white whitespace-nowrap">
              Project
            </th>

            <th className="p-4 text-left text-white whitespace-nowrap">
              Status
            </th>

            <th className="p-4 text-center text-white whitespace-nowrap">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {contacts.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center text-gray-400 p-8"
              >
                No contact requests found.
              </td>

            </tr>

          ) : (

            contacts.map((contact) => (

              <tr
                key={contact.id}
                className="border-t border-zinc-800 hover:bg-[#202734]"
              >

                <td className="p-4 text-white whitespace-nowrap">
                  {contact.full_name}
                </td>

                <td className="p-4 text-gray-300">
                  <div className="min-w-[180px] max-w-[250px] break-words">
                    {contact.email}
                  </div>
                </td>

                <td className="p-4 text-gray-300">
                  <div className="min-w-[130px] max-w-[200px] break-words">
                    {contact.project_type.charAt(0).toUpperCase() +
                      contact.project_type.slice(1)}
                  </div>
                </td>

                <td className="p-4 whitespace-nowrap">

                  <select
                    value={contact.status}
                    onChange={(e) =>
                      onStatusChange(
                        contact.id,
                        e.target.value
                      )
                    }
                    className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3 min-w-[170px]">

                    <button
                      onClick={() => onView(contact)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onDelete(contact.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );
}

export default ContactTable;