import { useState, useEffect, useContext } from "react";
import "./ProductDetails.css";
import { AppContext } from "../App";
import {useShoppingBag} from './ShoppingBagContext';

const ProductDetails = () => {
  const {items, selectedItem } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const { addToBag } = useShoppingBag();



  useEffect(() => {
    if (selectedItem) {
      setProduct(selectedItem);
      setSelectedImage(process.env.PUBLIC_URL + selectedItem.bgImg);
    } else if (!selectedItem) {
      const firstItem = items[0];
      setProduct(firstItem);
      const mainImg = firstItem.images?.[0] ;
      setSelectedImage(process.env.PUBLIC_URL + mainImg);
    }
  }, [selectedItem, items]);
  

  if (!product) {
    return <div className="loading">Loading product...</div>;
  }

  const calculateDiscountedPrice = () => {
    return product.price * (1 - product.discount);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(0, prev + change));
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    if (product) {
      addToBag(product, selectedSize, quantity);}
  };

  const handleKeepBrowsing = () => {
    window.history.back();
  };
// all the details here 
  return (
    <div className="product-details">
      <div className="product-container">
        {/* ✅ Left: Image Gallery */}
        <div className="image-gallery">
          <div className="small-images">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={process.env.PUBLIC_URL + img}
                alt={`thumb ${index}`}
                className={`small-image ${selectedImage === process.env.PUBLIC_URL + img ? "active" : ""}`}
                onClick={() => setSelectedImage(process.env.PUBLIC_URL + img)}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={selectedImage} alt={product.title} />
          </div>
        </div>

        {/* ✅ Right: Product Info */}
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>

          <div className="price-section">
            <span className="original-price">
              Price: ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="discount">
                  {Math.round(product.discount * 100)}% OFF
                </span>
                <span className="final-price">
                  Now: ${calculateDiscountedPrice().toFixed(2)}
                </span>
              </>
            )}
          </div>

          <div className="details-section">
            <h3>Details</h3>
            <p className="description">{product.description}</p>
          </div>

          <div className="size-section">
            <h3>Size</h3>
            <div className="sizes">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-bag-btn" onClick={handleAddToBag}>
              ADD TO BAG
            </button>
            <button className="add-to-bag-btn" onClick={handleKeepBrowsing}>
              KEEP BROWSING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
