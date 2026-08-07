import ContactTable from "./ContactTable";
import ContactModal from "./ContactModal";

function ContactsSection({
  contacts,
  selectedContact,
  setSelectedContact,
  onDelete,
  onStatusChange,
}) {
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-6">
        Contact Requests
      </h1>

      <ContactTable
        contacts={contacts}
        onView={setSelectedContact}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />

      <ContactModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </>
  );
}

export default ContactsSection;