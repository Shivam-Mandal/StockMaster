// src/controllers/customerController.js
import Customer from "../model/customerModel.js";

const findCustomer = async (req, res) => {
  const { name, contactNumber, email } = req.query;
  const storeId = req.admin?.storeId; 

  try {
    const query = { storeId, $or: [] };

    if (name) query.$or.push({ name });
    if (contactNumber) query.$or.push({ contactNumber });
    if (email) query.$or.push({ email });

    if (query.$or.length === 0) {
      return res.status(400).json({ message: "Please provide name, contactNumber, or email to search." });
    }

    const customer = await Customer.findOne(query);

    if (customer) {
      return res.status(200).json({ exists: true, customer });
    } else {
      return res.status(200).json({ exists: false, customer: null });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const createCustomer = async (req, res) => {
  try {
    const { name, isDelivery, contactNumber, email, address } = req.body;
    const storeId = req.admin.storeId; 
    if (!isDelivery) {
      // Local walk-in customer, no record needed
      return res.status(200).json({
        message: "Local customer, no record created. Will be shown in order list only.",
      });
    }

    // For delivery customers, validate all fields
    if (!name || !contactNumber || !email || !address) {
      return res.status(400).json({
        message: "For delivery, name, contact number, email, and address are required.",
      });
    }

    // Check duplicate in the same store
    const existingCustomer = await Customer.findOne({
      storeId,
      $or: [{ contactNumber }, { email }],
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer already exists for this store.",
      });
    }

    const customer = new Customer({
      storeId,
      name: name.trim(),
      isDelivery: true,
      contactNumber: contactNumber.trim(),
      email: email.trim(),
      address: address.trim(),
    });

    await customer.save();

    res.status(201).json({ message: "Delivery customer created", customer });
  } catch (err) {
    res.status(500).json({ message: "Error creating customer", error: err.message });
  }
};


export default {createCustomer,findCustomer}