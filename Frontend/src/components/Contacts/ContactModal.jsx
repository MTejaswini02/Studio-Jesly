function ContactModal({ contact, onClose }) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#161B22] rounded-xl w-[600px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Contact Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 text-xl hover:text-white"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <div>
            <p className="text-gray-400">Name</p>
            <p className="text-white">{contact.full_name}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-white">{contact.email}</p>
          </div>

          <div>
            <p className="text-gray-400">Project Type</p>
            <p className="text-white">{contact.project_type}</p>
          </div>

          <div>
            <p className="text-gray-400">Status</p>
            <p className="text-white">{contact.status}</p>
          </div>

          <div>
            <p className="text-gray-400">Message</p>

            <div className="bg-[#0D1117] p-4 rounded mt-2 text-gray-300">
              {contact.message}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ContactModal;