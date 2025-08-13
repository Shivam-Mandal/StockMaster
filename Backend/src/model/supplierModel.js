import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  store: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  }],
  companyName: { type: String, required: true },
  contactPerson: {type: String, required:true},
  contactNumber: { type: String, required: true },
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'India' }
  },
  createdAt: { type: Date, default: Date.now }
});

const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;
