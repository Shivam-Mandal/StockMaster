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
    description: "test",
    minStock: 1,
  },
  {
    id: 2,
    name: "EE0066",
    store: "Patna Saheb Store",
    manufacturer: "XYZ Manufacturer",
    model: "on-9887hg",
    orderBy: "ABC organization",
    description: "test",
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
    <div className="p-3 font-sans max-w-7xl mx-auto">
      {/* Table Container */}
      <div className="bg-white border rounded-lg shadow">
        {/* Table Header with Search */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Inventory</h2>
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full bg-white text-sm text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Search..."
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
          <table className="min-w-full text-sm text-black">
            <thead className="text-gray-800 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Item Name</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Store Location
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Manufacturer
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Model Type
                </th>
                <th className="px-4 py-3 text-left font-semibold">Order By</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Details Description
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Min. Stock
                </th>
              </tr>
            </thead>
            <tbody style={{ height: "300px" }} className="divide-y">
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No data found.
                  </td>
                </tr>
              ) : (
                pageData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.store}</td>
                    <td className="px-4 py-3">{item.manufacturer}</td>
                    <td className="px-4 py-3">{item.model}</td>
                    <td className="px-4 py-3">{item.orderBy}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3">{item.minStock}</td>
                  </tr>
                ))
              )}
              {/* Empty rows to keep fixed height */}
              {Array.from({ length: pageSize - pageData.length }).map(
                (_, idx) => (
                  <tr key={`empty-${idx}`} className="bg-white">
                    <td className="px-4 py-3" colSpan={7}>
                      &nbsp;
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4 border-t bg-white">
          {/* Pagination (Left) */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-end ">
            {["New Stock", "Edit", "Add Stock", "Consumption Stock"].map(
              (label) => (
                <button
                  key={label}
                  className="px-4 cursor-pointer py-2 border border-pink-400 text-pink-600 rounded-md hover:bg-pink-50 transition"
                >
                  {label}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              className="p-1 cursor-pointer border rounded text-pink-600 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-1 cursor-pointer border rounded text-pink-600 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Buttons (Right) */}
        </div>
      </div>
    </div>
  );
}
