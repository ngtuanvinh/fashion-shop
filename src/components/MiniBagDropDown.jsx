import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { CartContext } from "./CartContextProvider";
import CartProductCard from "./CartProductCard";

const MiniBagDropDown = () => {
  const {
    showMiniBag,
    getSubTotal,
    getTotalItemsCount,
    cartItems,
    setShowMiniBag,
    timeoutId,
  } = useContext(CartContext);
  const totalItem = getTotalItemsCount();
  const subTotal = getSubTotal();

  const handleOpenMiniBag = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowMiniBag(true);
  };

  const handleCloseMiniBag = () => {
    setShowMiniBag(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const isShowMiniBag = Object.keys(cartItems).length > 0 && showMiniBag;

  return (
    <Box
      className={`mini-bag ${isShowMiniBag ? "show-miniBag" : ""}`}
      sx={{ display: { xs: "none", sm: "block" } }}
      onMouseEnter={handleOpenMiniBag}
      onMouseLeave={handleCloseMiniBag}
    >
      <Box sx={{ display: "flex", bgcolor: "#eee", py: "16px" }}>
        <Typography
          component="h2"
          sx={{
            fontSize: "16px",
            color: "#2d2d2d",
            fontWeight: "bold",
            pl: "1em",
            pr: "5px",
          }}
        >
          My Bag,
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: "16px", color: "2d2d2d", fontFamily: "futura-pt" }}
        >
          {totalItem} item
        </Typography>
      </Box>
      <CartProductCard display="block" />
      <Box
        sx={{
          display: "flex",
          position: "relative",
          bgcolor: "#f8f8f8",
          py: "16px",
          px: "15px",
          justifyContent: "space-between",

          boxShadow: "0 -2px 3px 0 rgba(76.5, 76.5, 76.5, 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#2d2d2d",
              mr: "5px",
              letterSpacing: ".4px",
            }}
          >
            Sub-total
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#2d2d2d",
              lineHeight: "1.8",
              letterSpacing: ".4px",
            }}
          >
            (excluding sales tax)
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#2d2d2d",
            letterSpacing: ".6px",
            fontFamily: "futura-pt",
          }}
        >
          ${subTotal}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "12px 16px",
          bgcolor: "#eee",
          gap: "12px",
          border: "1px solid #ddd",
        }}
      >
        <Link to="/cart" style={{ flex: "1" }}>
          <Button
            sx={{
              width: "100%",
              border: "2px solid #ddd",
              fontSize: ".875rem",
              fontWeight: "bold",
              height: "44px",
              letterSpacing: ".8px",
              color: "#2d2d2d",
              bgcolor: "#fff",
              borderRadius: "0",
            }}
          >
            VIEW BAG
          </Button>
        </Link>
        <Link style={{ flex: "1" }}>
          <Button
            sx={{
              width: "100%",
              fontSize: ".875rem",
              bgcolor: "#018849",
              height: "44px",
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: ".8px",
              borderRadius: "0",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#006637",
              },
            }}
          >
            CHECK OUT
          </Button>
        </Link>
      </Box>
      <Box sx={{ padding: "12px", color: "#2d2d2d", bgcolor: "#eee" }}>
        <Typography
          component="p"
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            mb: "4px",
            lineHeight: "15px",
            fontFamily: "futura-pt",
          }}
        >
          Free Shipping WorldWide*
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: ".8rem",
            fontFamily: "futura-pt",
          }}
        >
          More info{" "}
          <a
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              textAlign: "center",
              fontSize: ".8rem",
              fontFamily: "futura-pt",
            }}
          >
            here
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniBagDropDown;
