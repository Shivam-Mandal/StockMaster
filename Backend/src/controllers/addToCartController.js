import Product from "../model/productModel";
import Cart from "../model/cartModel";

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const adminId = req.admin._id;
  const storeId = req.admin.storeId;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Product ID and valid quantity are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ admin: adminId, store: storeId });

    const itemPrice = product.price;
    const itemTotal = itemPrice * quantity;

    if (!cart) {
      cart = new Cart({
        admin: adminId,
        store: storeId,
        items: [{
          product: productId,
          quantity,
          price: itemPrice,
          total: itemTotal
        }],
        grandTotal: itemTotal
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].total = cart.items[itemIndex].price * cart.items[itemIndex].quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: itemPrice,
          total: itemTotal
        });
      }

      // Recalculate grandTotal
      cart.grandTotal = cart.items.reduce((sum, item) => sum + item.total, 0);
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export default {addToCart}