import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Expand, ToggleLeft, ToggleRight } from "lucide-react";

export default function OperatorManage() {
  const [operators, setOperators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOperator, setNewOperator] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch operators
  const fetchOperators = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/all-operators", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch operators");
      const data = await res.json();
      console.log(data.operators);
      setOperators(data.operators || []);
    } catch (error) {
      console.error("Error fetching operators:", error);
      setErrorMsg("Failed to fetch operators. Please try again later.");
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  // Add operator
  const handleAddOperator = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!newOperator.name || !newOperator.email || !newOperator.password) {
      setErrorMsg("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/add-operator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newOperator),
      });

      if (!res.ok) throw new Error("Failed to add operator");

      const data = await res.json();
      setSuccessMsg("Operator added successfully!");
      setNewOperator({ name: "", email: "", password: "" });
      setIsModalOpen(false);

      // Refresh list
      fetchOperators();
    } catch (err) {
      setErrorMsg("Error adding operator. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete operator
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete-operator/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete operator");
      setOperators(operators.filter((op) => op._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Operator Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1AB2E6] hover:bg-[#159AC4] text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} /> Add Operator
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Added On</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((op) => (
              <tr key={op.operatorId} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800 flex items-center space-x-3">
                  
                  <div className={`relative h-10 w-10  rounded-full flex items-center justify-center ${op.isOnline ? 'border-5 border-green-300' : ' '}`}>
                    <img
                    src={op?.avatar || "https://i.pravatar.cc/100"}
                    alt="User"
                    className=" h-8 w-8 rounded-full object-cover border"
                    />
                  </div>
                  
                  <span>{op.name}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{op.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(op.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(op._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <div
                      className="flex items-center space-x-2"
                    >
                      { op.isActive ? <ToggleLeft size={22} /> : <ToggleRight size={22} color="green"/>}
                      <Expand size={18} color="blue"/>
                      <Trash2 size={18} />
                      
                    </div>
                  </button>
                </td>
              </tr>
            ))}
            {operators.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No operators found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-lg p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4 text-black">Add New Operator</h2>

            {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 text-sm mb-2">{successMsg}</p>}

            <div className="mb-4 text-gray-700">
              <label className="block text-sm font-medium  mb-1">Name</label>
              <input
                type="text"
                value={newOperator.name}
                onChange={(e) => setNewOperator({ ...newOperator, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1AB2E6] outline-none"
                placeholder="Enter name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newOperator.email}
                onChange={(e) => setNewOperator({ ...newOperator, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#1AB2E6] outline-none"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-6 text-gray-700">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={newOperator.password}
                onChange={(e) => setNewOperator({ ...newOperator, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1AB2E6] outline-none"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOperator}
                disabled={loading}
                className="px-4 py-2 bg-[#1AB2E6] hover:bg-[#159AC4] text-white rounded-lg shadow transition flex items-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
