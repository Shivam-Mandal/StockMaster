import Product from "../model/productModel.js";

const getCategories = async (req, res) => {
    try {
        let categories = await Product.distinct('category', { store: req.admin.storeId });

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No categories found for this store',
                data: [],
            });
        }

        categories = categories.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            totalCategory: categories.length,
            data: categories,
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const storeId = req.admin.storeId;
        const products = await Product.find({store:storeId});

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No product found for this store',
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            totalProduct: products.length,
            data: products,
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
        });
    }
};

const generateUniqueSKU = async (name) => {
  let sku;
  let exists = true;

  while (exists) {
    const shortName = name.trim().toUpperCase().replace(/\s+/g, '').slice(0, 3);
    const uniquePart = Date.now().toString().slice(-5) + Math.floor(Math.random() * 1000);
    sku = `${shortName}-${uniquePart}`;
    exists = await Product.exists({ sku });
  }

  return sku;
};


const addProducts = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      description,
      quantityInStock,
      costPrice,
      sellingPrice,
      unit,
      taxRate,
      supplier,
      store,
      reorderLevel,
      expiryDate,
      batchNumber
    } = req.body;

  
    if (!name || !costPrice || !sellingPrice || !unit || !store) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const sku = await generateUniqueSKU(name);

    // Determine stock status
    let status = 'in-stock';
    if (quantityInStock === 0) {
      status = 'out-of-stock';
    } else if (quantityInStock <= (reorderLevel || 50)) {
      status = 'low-stock';
    }

    // Create new product
    const newProduct = new Product({
      name,
      sku,
      category,
      brand,
      description,
      quantityInStock,
      costPrice,
      sellingPrice,
      unit,
      taxRate,
      supplier,
      store,
      reorderLevel,
      expiryDate,
      batchNumber,
      status
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Add Product Error:', error);
    res.status(500).json({ message: 'Server error. Could not add product.' });
  }
};






export default { getCategories, getAllProducts,addProducts}