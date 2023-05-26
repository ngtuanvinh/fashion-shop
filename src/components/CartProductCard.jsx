import { useContext, useState } from "react";
import {
  Box,
  Typography,
  CardMedia,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material";
import { CartContext } from "./CartContextProvider";
import { DeleteOutlined, ArrowDropDownOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const CartProductCard = ({ display }) => {
  const {
    cartItems,
    removeItemById,
    productSizes,
    updateItemSize,
    updateItemByAmount,
  } = useContext(CartContext);
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  const [sizesAnchorEl, setSizesAnchorEl] = useState(null);
  const sizesOpen = Boolean(sizesAnchorEl);
  const handleSizesMenuClick = (event) => {
    setSizesAnchorEl(event.currentTarget);
  };
  const handleSizesMenuClose = (size, itemId) => {
    setSizesAnchorEl(null);
    if (size) {
      updateItemSize(size, itemId);
    }
  };

  const [quantityAnchorEl, setQuantityAnchorEl] = useState(null);
  const quantityOpen = Boolean(quantityAnchorEl);
  const handleQuantityMenuClick = (event) => {
    setQuantityAnchorEl(event.currentTarget);
  };
  const handleQuantityMenuClose = (amount, itemId) => {
    setQuantityAnchorEl(null);
    if (amount) {
      updateItemByAmount(amount, itemId);
    }
  };

  return (
    <Box
      sx={{
        height: !isCartPage ? "173px" : "auto",
        overflowY: !isCartPage ? "scroll" : "",
      }}
    >
      {Object.values(cartItems).map((item, index) => (
        <Box key={item?.id}>
          <Box
            sx={{
              display: "flex",
              p: "15px",
              bgcolor: "#fff",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              src={`//${item?.imageUrl}`}
              alt="image"
              sx={{
                mr: "15px",
                width: "100px",
                height: !isCartPage ? "auto" : "140px",
              }}
            />
            <Box>
              <Box sx={{ display: display, mb: "0.375em" }}>
                <Typography
                  sx={{
                    fontSize: !isCartPage ? "14px" : ".85em",
                    fontWeight: "bold",
                    mr: "6px",
                    letterSpacing: !isCartPage ? "" : "1.7px",
                    lineHeight: !isCartPage ? "" : ".7em",
                    mb: !isCartPage ? "" : "10px",
                    color:
                      item?.price?.previous?.value &&
                      item?.price?.previous?.value !==
                        item?.price?.current?.value
                        ? "#d01345"
                        : "#2d2d2d",
                  }}
                >
                  {item?.price?.current?.text}
                </Typography>
                {item?.price?.previous?.value &&
                  item?.price?.previous?.value !==
                    item?.price?.current?.value && (
                    <Typography
                      sx={{
                        fontSize: !isCartPage ? "14px" : ".85em",
                        letterSpacing: !isCartPage ? "" : "1.7px",
                        lineHeight: !isCartPage ? "" : ".7em",
                        textDecoration: "line-through",
                        fontFamily: "futura-pt",
                        color: "#666",
                      }}
                    >
                      {item?.price?.previous?.text}
                    </Typography>
                  )}
              </Box>
              <Typography
                component="p"
                className="cart_text"
                sx={{
                  position: "relative",
                  color: "#666",
                  fontSize: !isCartPage ? "12px" : "14px",
                  letterSpacing: ".4px",
                  lineHeight: "1.25em",
                  height: "2.5em",
                  overflow: "hidden",
                  mb: !isCartPage ? "3px" : "10px",
                }}
              >
                {item?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: !isCartPage ? "10px" : "18px",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: !isCartPage ? "" : "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                      letterSpacing: ".4px",
                    }}
                  >
                    {item?.colour}
                  </Typography>
                </Box>

                {!isCartPage ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                      letterSpacing: ".4px",
                    }}
                  >
                    {item?.brandSize}
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      gap: !isCartPage ? "" : "8px",
                      alignItems: !isCartPage ? "" : "center",
                      cursor: "pointer",
                    }}
                    onClick={handleSizesMenuClick}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                        letterSpacing: ".4px",
                      }}
                    >
                      {item?.brandSize}
                    </Typography>
                    <ArrowDropDownOutlined />
                  </Box>
                )}
                {isCartPage && (
                  <Menu
                    id="basic-menu"
                    anchorEl={sizesAnchorEl}
                    open={sizesOpen}
                    onClose={handleSizesMenuClose}
                  >
                    {productSizes?.map((size) => (
                      <Box key={size}>
                        <MenuItem
                          sx={{ py: "10px" }}
                          onClick={() => handleSizesMenuClose(size, item?.id)}
                        >
                          {size}
                        </MenuItem>
                      </Box>
                    ))}
                  </Menu>
                )}
                {!isCartPage ? (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#666",
                      letterSpacing: ".4px",
                    }}
                  >
                    Qty: {item?.amount}
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      gap: !isCartPage ? "" : "8px",
                      alignItems: !isCartPage ? "" : "center",
                      cursor: "pointer",
                    }}
                    onClick={handleQuantityMenuClick}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                        letterSpacing: ".4px",
                      }}
                    >
                      Qty: {item?.amount}
                    </Typography>
                    <ArrowDropDownOutlined />
                  </Box>
                )}
                {isCartPage && (
                  <Menu
                    id="basic-menu"
                    anchorEl={quantityAnchorEl}
                    open={quantityOpen}
                    onClose={handleQuantityMenuClose}
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((amount) => (
                      <Box key={amount}>
                        <MenuItem
                          sx={{ py: "10px" }}
                          onClick={() =>
                            handleQuantityMenuClose(amount, item?.id)
                          }
                        >
                          {amount}
                        </MenuItem>
                      </Box>
                    ))}
                  </Menu>
                )}
              </Box>
              <DeleteOutlined
                onClick={() => removeItemById(item?.id)}
                sx={{
                  fontSize: "24px",
                  color: "#666",
                  position: "absolute",
                  bottom: "13px",
                  right: "24px",
                  cursor: "pointer",
                  "&.MuiSvgIcon-root:hover": {
                    color: "red",
                  },
                }}
              />
            </Box>
          </Box>
          {index < Object.keys(cartItems).length - 1 ? <Divider /> : null}
        </Box>
      ))}
    </Box>
  );
};

export default CartProductCard;
