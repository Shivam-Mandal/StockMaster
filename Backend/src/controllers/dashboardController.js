import Product from "../model/productModel.js";
import Order from "../model/orderModel.js";
import mongoose from "mongoose";

const getDashboardStats = async (req, res) => {
  try {
    // Get storeId from the logged-in user
    const storeId = new mongoose.Types.ObjectId(req.admin.storeId);
    console.log("dashboard stats:", storeId.toString());

    // Total Items in Stock
    const itemsInStock = await Product.aggregate([
      { $match: { store: storeId, quantityInStock: { $gt: 0 } } },
      { $group: { _id: null, totalQty: { $sum: "$quantityInStock" } } }
    ]);

    // Low Stock Items
    const lowStockData = await Product.aggregate([
      {
        $match: {
          store: storeId,
          quantityInStock: { $gt: 0 },
          $expr: { $lt: ["$quantityInStock", "$reorderLevel"] }
        }
      },
      { $count: "count" }
    ]);
    const lowStockItems = lowStockData[0]?.count || 0;

    // Inventory Value
    const inventoryValue = await Product.aggregate([
      { $match: { store: storeId, quantityInStock: { $gt: 0 } } },
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$quantityInStock", "$costPrice"] } }
        }
      }
    ]);
    const totalValue = inventoryValue[0]?.totalValue || 0;

    // Orders This Week
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const ordersThisWeek = await Order.countDocuments({
      store: storeId,
      createdAt: { $gte: lastWeek }
    });

    // Final Response
    res.status(200).json({
      itemsInStock: itemsInStock[0]?.totalQty || 0,
      lowStockItems,
      inventoryValue: totalValue,
      ordersThisWeek
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats", error });
  }
};

export default { getDashboardStats };
