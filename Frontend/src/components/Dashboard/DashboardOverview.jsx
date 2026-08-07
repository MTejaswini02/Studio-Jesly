function DashboardOverview({
  totalContacts,
  pendingContacts,
  completedContacts,
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
    </>
  );
}

export default DashboardOverview;