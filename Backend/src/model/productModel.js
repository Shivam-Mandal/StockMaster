import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  sku: { type: String, unique: true, trim: true }, // unique identifier / barcode

  category: { type: String, trim: true },
  brand: { type: String, trim: true },

  description: { type: String, trim: true }, 

  quantityInStock: { type: Number, default: 0, min: 0 },

  costPrice: { type: Number, required: true, min: 0 }, 
  sellingPrice: { type: Number, required: true, min: 0 }, 
  unit: { type: String, required: true }, // e.g. "kg", "pcs", "litre"

  taxRate: { type: Number, default: 0 }, // GST/VAT % (e.g. 5, 12, 18)

  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },

  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },

  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock'],
    default: 'active'
  },

  reorderLevel: { type: Number, default: 50 }, // when to notify for low stock

  expiryDate: { type: Date }, 
  batchNumber: { type: String }, 

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Automatically update `updatedAt` on save
productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
