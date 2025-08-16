import PurchaseOrder from "../model/purchaseOrderModel.js";
import Product from "../model/productModel.js";
import Supplier from "../model/supplierModel.js";

// Create a purchase order
const purchaseFromSupplier = async (req, res) => {
  try {
    const { supplier, store, products } = req.body;
    console.log("supplier:",supplier)
    console.log("store:",store)
    console.log("products:",products)
    if (!supplier || !store || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Supplier, store, and product list are required." });
    }

    const existingSupplier = await Supplier.findById(supplier);
    if (!existingSupplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    // Validate products (only productId & quantity)
    for (const item of products) {
      if (!item.product || typeof item.quantity !== "number" || item.quantity <= 0) {
        return res.status(400).json({ message: "Each product must have a valid ID and quantity > 0." });
      }
    }

    const newOrder = new PurchaseOrder({
      supplier,
      store,
      products: products.map(p => ({
        product: p.product,
        quantity: p.quantity,
        costPrice: null 
      })),
      status: "Pending",
      totalCost: 0, 
      createdBy: req.admin?.id,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Purchase order created successfully (cost price will be added on receiving).",
      status: newOrder.status,
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error("Error creating purchase order:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};



const receivePurchaseOrder = async (req, res) => {
  try {
    const { purchaseOrderId, productPrices } = req.body;

    if (!purchaseOrderId) {
      return res.status(400).json({ message: "Purchase Order ID is required." });
    }

    const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId).populate("products.product");
    if (!purchaseOrder) {
      return res.status(404).json({ message: "Purchase order not found." });
    }

    if (purchaseOrder.status === "Received") {
      return res.status(400).json({ message: "Purchase order is already marked as received." });
    }

    let totalCost = 0;

    for (const item of purchaseOrder.products) {
      const { product, quantity } = item;
      const priceInfo = productPrices.find(p => p.productId.toString() === product._id.toString());
      if (!priceInfo || typeof priceInfo.costPrice !== "number" || priceInfo.costPrice <= 0) {
        return res.status(400).json({ message: `Missing or invalid cost price for product ${product.name}` });
      }

      const dbProduct = await Product.findById(product._id);
      if (!dbProduct) continue;

      // Update quantity
      dbProduct.quantityInStock += quantity;

      // Update cost price
      dbProduct.costPrice = priceInfo.costPrice;

      // Calculate total cost for order
      totalCost += quantity * priceInfo.costPrice;

      // Update stock status
      if (dbProduct.quantityInStock <= 0) {
        dbProduct.status = 'out-of-stock';
      } else if (dbProduct.quantityInStock <= dbProduct.reorderLevel) {
        dbProduct.status = 'low-stock';
      } else {
        dbProduct.status = 'in-stock';
      }

      dbProduct.updatedAt = new Date();
      await dbProduct.save();

      // Save cost price in purchase order product record
      item.costPrice = priceInfo.costPrice;
    }

    purchaseOrder.totalCost = totalCost;
    purchaseOrder.status = "Received";
    purchaseOrder.receivedDate = new Date();
    await purchaseOrder.save();

    res.status(200).json({
      message: "Purchase order received and cost prices updated.",
      orderId: purchaseOrder._id,
      totalCost,
    });
  } catch (err) {
    console.error("Error receiving purchase order:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};


export default { purchaseFromSupplier, receivePurchaseOrder };
