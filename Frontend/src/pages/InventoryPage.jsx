import { useState, useEffect } from "react";
import { apiBaseUrl } from "../service/api";
import axios from 'axios'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {
  FaPlus,
  FaInfoCircle,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/api/inventory/product-list`, { withCredentials: true }),
          axios.get(`${apiBaseUrl}/api/inventory/category-list`, { withCredentials: true })
        ]);

        setProducts(productRes.data.data);
        setCategories(categoryRes.data);

        console.log("Product List:", productRes.data.data);
        console.log("Category List:", categoryRes.data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, []);

  const filtered = products.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.store.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const pageData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 font-sans max-w-7xl mx-auto bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Inventory Management
        </h2>
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
      <div className="overflow-x-scroll border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-max text-sm text-gray-700">
          <thead className="border-b text-gray-700">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">SKU</th>
              <th className="px-5 py-3 text-left font-semibold">Products</th>
              <th className="px-5 py-3 text-left font-semibold">Cost Price</th>
              <th className="px-5 py-3 text-left font-semibold">Selling Price</th>
              <th className="px-5 py-3 text-left font-semibold">Brand</th>
              <th className="px-5 py-3 text-left font-semibold">Category</th>
              <th className="px-5 py-3 text-left font-semibold">Supplier</th>
              <th className="px-5 py-3 text-left font-semibold">Description</th>
              <th className="px-5 py-3 text-left font-semibold">Stock Status</th>
              <th className="px-5 py-3 text-left font-semibold">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  No inventory found.
                </td>
              </tr>
            ) : (
              products.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`transition hover:bg-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                >
                  <td className="px-5 py-4">{item.sku}</td>
                  <td className="px-5 py-4">{item.name}</td>
                  <td className="px-5 py-4">{item.costPrice} Rs.</td>
                  <td className="px-5 py-4">{item.sellingPrice} Rs.</td>
                  <td className="px-5 py-4">{item.brand}</td>
                  <td className="px-5 py-4">{item.category}</td>
                  <td className="px-5 py-4">{item.supplier.contactPerson}</td>
                  {/* <td className="px-5 py-4 relative group">
                    {item.description.length > 10
                      ? `${item.description.substring(0, 30)}...`
                      : item.description}
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-200 text-gray-900 rounded px-3 py-1 shadow-lg w-max max-w-xs z-20">
                      {item.description}
                    </div>
                  </td> */}
                  <td className="px-5 py-4 cursor-pointer">
                    <Tippy content={item.description} placement="top" theme="light">
                      <span>
                        {item.description.length > 30
                          ? `${item.description.substring(0, 30)}...`
                          : item.description}
                      </span>
                    </Tippy>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full
    ${item.quantityInStock === 0
                          ? "bg-red-100 text-red-600"
                          : item.quantityInStock < item.reorderLevel
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                    >
                      {item.quantityInStock === 0
                        ? "Out of Stock"
                        : item.quantityInStock < item.reorderLevel
                          ? "Low Stock"
                          : "In Stock"}
                    </span>
                  </td>
                  <td className={`px-5 py-4 font-medium
    ${item.quantityInStock === 0
                      ? " text-red-600"
                      : item.quantityInStock < item.reorderLevel
                        ? " text-yellow-600"
                        : " text-green-600"
                    }`}>{item.quantityInStock}</td>
                </tr>
              ))
            )}

            {/* Empty rows to maintain height */}
            {Array.from({ length: pageSize - pageData.length }).map((_, i) => (
              <tr key={`empty-${i}`} className="bg-white">
                <td colSpan={7} className="px-5 py-4">
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Actions and Pagination */}
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
  );
}
