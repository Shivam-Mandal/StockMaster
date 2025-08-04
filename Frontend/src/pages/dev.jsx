import React, { useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const initialInventory = [
  {
    id: 1,
    name: "EE0098",
    store: "Patna Saheb Store",
    manufacturer: "XYZ Manufacturer",
    model: "on-9887hg",
    orderBy: "ABC organization",
    description: "Basic electric component",
    minStock: 1,
  },
  {
    id: 2,
    name: "EE0066",
    store: "Patna Saheb Store",
    manufacturer: "XYZ Manufacturer",
    model: "on-9887hg",
    orderBy: "ABC organization",
    description: "Test item for quality",
    minStock: 8,
  },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = initialInventory.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.store.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b bg-[#E6F7FC]">
          <h1 className="text-2xl font-semibold text-gray-800">
            Inventory Dashboard
          </h1>
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items or stores"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full bg-white text-gray-700 focus:ring-2 focus:ring-[#1AB2E6] focus:outline-none"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-[#E6F7FC] border-b text-gray-700">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Item Name</th>
                <th className="px-5 py-3 text-left font-semibold">Store</th>
                <th className="px-5 py-3 text-left font-semibold">
                  Manufacturer
                </th>
                <th className="px-5 py-3 text-left font-semibold">Model</th>
                <th className="px-5 py-3 text-left font-semibold">Order By</th>
                <th className="px-5 py-3 text-left font-semibold">
                  Description
                </th>
                <th className="px-5 py-3 text-left font-semibold">Min Stock</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No inventory found.
                  </td>
                </tr>
              ) : (
                pageData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition hover:bg-[#E6F7FC] ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-5 py-4">{item.name}</td>
                    <td className="px-5 py-4">{item.store}</td>
                    <td className="px-5 py-4">{item.manufacturer}</td>
                    <td className="px-5 py-4">{item.model}</td>
                    <td className="px-5 py-4">{item.orderBy}</td>
                    <td className="px-5 py-4">{item.description}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          item.minStock < 3
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.minStock}
                      </span>
                    </td>
                  </tr>
                ))
              )}

              {/* Empty rows to maintain height */}
              {Array.from({ length: pageSize - pageData.length }).map(
                (_, i) => (
                  <tr key={`empty-${i}`} className="bg-white">
                    <td colSpan={7} className="px-5 py-4">
                      &nbsp;
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-5 border-t bg-white">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {["New Stock", "Edit", "Add Stock", "Consumption Stock"].map(
              (label) => (
                <button
                  key={label}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#1AB2E6] hover:bg-[#199FCC] transition"
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              className="p-2 border rounded disabled:opacity-50 text-[#1AB2E6]"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span>
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>
            <button
              className="p-2 border rounded disabled:opacity-50 text-[#1AB2E6]"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
