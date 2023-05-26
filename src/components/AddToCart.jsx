import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { CartContext } from "./CartContextProvider";

const AddToCart = ({ size, setIsSizeSelected, product, imageUrl, data }) => {
  const { addItemToCart, setShowMiniBag, timeoutId, setTimeoutId } =
    useContext(CartContext);
  const productSizes = data?.variants?.map?.((variant) => variant.brandSize);
  const addToCart = () => {
    if (!size) {
      setIsSizeSelected(false);
    } else {
      addItemToCart(product, imageUrl, productSizes);
      if (window.innerWidth >= 768) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setShowMiniBag(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeout = setTimeout(() => {
        setShowMiniBag(false);
      }, 3000);
      setTimeoutId(newTimeout);
    }
  };

  return (
    <Box mt="20px">
      <Button
        sx={{
          width: "100%",
          bgcolor: "#018849",
          borderRadius: "0",
          color: "#fff",
          fontWeight: "bold",
          "&.MuiButton-root:hover": {
            bgcolor: "#006637",
          },
        }}
        onClick={addToCart}
      >
        ADD TO BAG
      </Button>
    </Box>
  );
};

export default AddToCart;
