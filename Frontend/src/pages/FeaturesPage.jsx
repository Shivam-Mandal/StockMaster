import { useState } from "react";
import { FaPlus, FaInfoCircle } from "react-icons/fa";

const roles = ["Owner", "Administrator", "Editor", "Agent", "Contributor"];

export default function FeaturesMatrix() {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: "Disable Create from scratch.",
      description: "Prevents users from creating documents freely.",
      enabledByRole: {
        Owner: false,
        Administrator: false,
        Editor: false,
        Agent: true,
        Contributor: false,
      },
    },
    {
      id: 2,
      name: "Disable Create from scratch button.",
      description: "",
      enabledByRole: {
        Owner: false,
        Administrator: false,
        Editor: false,
        Agent: true,
        Contributor: false,
      },
    },
    {
      id: 3,
      name: "Disable My templates.",
      enabledByRole: {
        Owner: false,
        Administrator: false,
        Editor: false,
        Agent: false,
        Contributor: false,
      },
    },
    {
      id: 4,
      name: "Disable PDF uploads.",
      enabledByRole: {
        Owner: false,
        Administrator: false,
        Editor: false,
        Agent: false,
        Contributor: false,
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
    <div className="p-2 font-sans max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Features</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          onClick={() => alert("Add feature logic here")}
        >
          <FaPlus /> Add Feature
        </button>
      </div>

      <div className="bg-white rounded border shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 font-semibold">Features</th>
              {roles.map((role) => (
                <th key={role} className="p-3 font-semibold text-center">
                  {role}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="bg-gray-50 border-t">
              <td
                colSpan={roles.length + 1}
                className="p-3 font-medium text-gray-600"
              >
                Workspace
              </td>
            </tr>

            {features.map((feature) => (
              <tr key={feature.id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2 text-gray-800">
                  {feature.name}
                  <FaInfoCircle
                    className="text-gray-400"
                    title={feature.description || "No description"}
                  />
                </td>
                {roles.map((role) => (
                  <td key={role} className="text-center p-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600"
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
