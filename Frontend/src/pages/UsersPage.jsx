import { useState } from "react";

const mockUsers = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? "Admin" : "User",
}));

const ITEMS_PER_PAGE = 5;

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = mockUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 bg-white ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        User Management
      </h1>

      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Add User
        </button>
        <p className="text-sm text-gray-500">
          Showing {paginatedUsers.length} of {mockUsers.length} users
        </p>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full bg-white text-sm text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium">ID</th>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Email</th>
              <th className="text-left px-6 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 border-t">{user.id}</td>
                <td className="px-6 py-4 border-t">{user.name}</td>
                <td className="px-6 py-4 border-t">{user.email}</td>
                <td className="px-6 py-4 border-t">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md border text-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
