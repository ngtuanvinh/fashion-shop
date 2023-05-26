import { useState, createContext, useEffect } from "react";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || {}
  );
  const [showMiniBag, setShowMiniBag] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [productSizes, setProductSizes] = useState(null);

  useEffect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item, imageUrl, sizes) => {
    if (sizes.length) setProductSizes(sizes);
    if (!cartItems[item?.id])
      setCartItems((prev) => ({
        [item?.id]: { ...item, amount: 1, imageUrl },
        ...prev,
      }));
    if (cartItems[item?.id])
      setCartItems((prev) => ({
        ...prev,
        [item?.id]: {
          ...prev[item?.id],
          amount: cartItems[item?.id]?.amount + 1,
        },
      }));
  };
  const removeItemById = (itemId) => {
    const updatedItems = { ...cartItems };
    delete updatedItems[itemId];
    setCartItems(updatedItems);
  };

  const updateItemByAmount = (qty, id) => {
    const updatedItems = { ...cartItems };
    if (updatedItems[id]) {
      updatedItems[id].amount = qty;
      setCartItems(updatedItems);
    }
  };

  const getTotalItemsCount = () => {
    let totalCount = 0;
    Object.values(cartItems).forEach((item) => {
      totalCount += item.amount;
    });
    return totalCount;
  };

  const getSubTotal = () => {
    let subTotal = 0;
    Object.values(cartItems).forEach((item) => {
      subTotal += item?.price?.current?.value * item?.amount;
    });
    return subTotal;
  };

  const updateItemSize = (size, id) => {
    const updatedItems = { ...cartItems };
    if (updatedItems[id]) {
      updatedItems[id].brandSize = size;
      setCartItems(updatedItems);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        showMiniBag,
        timeoutId,
        productSizes,
        setTimeoutId,
        setShowMiniBag,
        addItemToCart,
        removeItemById,
        updateItemByAmount,
        getTotalItemsCount,
        getSubTotal,
        updateItemSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
