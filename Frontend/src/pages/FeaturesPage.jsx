import { useState } from "react";
import { FaPlus, FaInfoCircle } from "react-icons/fa";

const roles = ["Add", "View", "Edit", "Cancel", "Delete"];

export default function FeaturesMatrix() {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: "Disable Create from scratch.",
      description: "Prevents users from creating documents freely.",
      enabledByRole: {
        Add: false,
        View: false,
        Edit: false,
        Cancel: true,
        Delete: false,
      },
    },
    {
      id: 2,
      name: "Disable Create from scratch button.",
      description: "",
      enabledByRole: {
        Add: false,
        View: true,
        Edit: false,
        Cancel: true,
        Delete: true,
      },
    },
    {
      id: 3,
      name: "Disable My templates.",
      enabledByRole: {
        Add: true,
        View: false,
        Edit: true,
        Cancel: false,
        Delete: true,
      },
    },
    {
      id: 4,
      name: "Disable PDF uploads.",
      enabledByRole: {
        Add: true,
        View: false,
        Edit: false,
        Cancel: false,
        Delete: false,
      },
    },
  ]);

  const toggleCheckbox = (featureId, role) => {
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === featureId
          ? {
              ...feature,
              enabledByRole: {
                ...feature.enabledByRole,
                [role]: !feature.enabledByRole[role],
              },
            }
          : feature
      )
    );
  };

  return (
    <div className="p-6 font-sans max-w-7xl mx-auto bg-white ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Feature Permissions Matrix
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          onClick={() => alert("Add feature logic here")}
        >
          <FaPlus /> Add Feature
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full min-w-[700px] text-sm text-gray-700">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left font-medium text-gray-600">
                Feature
              </th>
              {roles.map((role) => (
                <th
                  key={role}
                  className="p-4 text-center font-medium text-gray-600 whitespace-nowrap"
                >
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr
                key={feature.id}
                className={
                  i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                }
              >
                <td className="p-4 text-gray-800 flex items-start gap-2">
                  <span className="font-medium">{feature.name}</span>
                  <FaInfoCircle
                    className="text-gray-400 mt-1 cursor-pointer"
                    title={feature.description || "No description provided."}
                  />
                </td>
                {roles.map((role) => (
                  <td key={role} className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 accent-blue-600 focus:ring-blue-500"
                      checked={feature.enabledByRole[role] || false}
                      onChange={() => toggleCheckbox(feature.id, role)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
