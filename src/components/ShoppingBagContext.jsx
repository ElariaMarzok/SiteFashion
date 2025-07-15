import { createContext, useContext, useState } from "react";

const ShoppingBagContext = createContext();

export const useShoppingBag = () => {
  const context = useContext(ShoppingBagContext);
  if (!context) {
    throw new Error("useShoppingBag must be used within ShoppingBagProvider");
  }
  return context;
};

export const ShoppingBagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (product, selectedSize, quantity) => {
    const itemId = `${product._id}-${selectedSize}`;

    setBagItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);

      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // Add new item
        const newItem = {
          id: itemId,
          productId: product._id,
          title: product.title,
          price: product.price,
          discount: product.discount,
          image: product.bgImg,
          size: selectedSize,
          quantity: quantity,
          addedAt: new Date().toISOString(),
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromBag = (itemId) => {
    setBagItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const decreaseQuantity = (itemId) => {
    setBagItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const increaseQuantity = (itemId) => {
    setBagItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  };

  const calculateItemTotal = (item) => {
    const discountedPrice = item.price * (1 - item.discount);
    return discountedPrice * item.quantity;
  };

  const getTotalItems = () => {
    return bagItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return bagItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0,
    );
  };

  const clearBag = () => {
    setBagItems([]);
  };

  return (
    <ShoppingBagContext.Provider
      value={{
        bagItems,
        addToBag,
        removeFromBag,
        decreaseQuantity,
        increaseQuantity,
        calculateItemTotal,
        getTotalItems,
        getTotalPrice,
        clearBag,
      }}
    >
      {children}
    </ShoppingBagContext.Provider>
  );
};
