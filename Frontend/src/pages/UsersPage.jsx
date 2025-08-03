export default function UsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        Add User
      </button>
      <div className="border rounded p-4 bg-white shadow">
        <p>No users yet.</p>
        {/* You can map through user list here later */}
      </div>
    </div>
  );
}
