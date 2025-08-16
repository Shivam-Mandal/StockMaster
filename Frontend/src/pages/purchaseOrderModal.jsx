export default function PurchaseOrderModal({
  showModal,
  setShowModal,
  selectedProduct,
  suppliers,
  selectedSupplier,
  setSelectedSupplier,
  purchaseQty,
  setPurchaseQty,
  handlePurchase,
}) {
  if (!showModal) return null;
  console.log("supplier list",suppliers)
  console.log("selected supplier",selectedSupplier)
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 
                 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        className="bg-white rounded-xl p-6 w-96 shadow-2xl transform 
                   transition-all duration-300 scale-100 animate-fadeIn"
      >
        {/* Modal Title */}
        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
          Purchase: {selectedProduct?.name}
        </h3>

        {/* Supplier Dropdown */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Supplier
        </label>
        <select
          className="w-full text-black border border-gray-300 p-2 rounded-lg mb-4 focus:outline-none 
                     focus:ring-2 focus:ring-blue-400 transition"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup._id}>
              {sup.contactPerson}
            </option>
          ))}
        </select>

        {/* Quantity Input */}
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Quantity
        </label>
        <input
          type="number"
          className="w-full border text-black border-gray-300 p-2 rounded-lg mb-4 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={purchaseQty}
          onChange={(e) => setPurchaseQty(e.target.value)}
          min="1"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handlePurchase}
          >
            Confirm
          </button>
        </div>
      </div>

     
    </div>
  );
}
