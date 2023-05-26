import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Divider, Button, CardMedia } from "@mui/material";
import {
  ErrorOutlineOutlined,
  LocalShippingOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { CartContext } from "./CartContextProvider";
import paymentList from "../assets/payment.png";
import CartProductCard from "./CartProductCard";
const CartPage = () => {
  const { getSubTotal, cartItems } = useContext(CartContext);

  return Object.keys(cartItems).length > 0 ? (
    <Box bgcolor="#eee">
      <Box sx={{ mx: { md: "32px", lg: "160px" }, height: "100%" }}>
        <Box sx={{ display: { md: "flex" }, p: "10px" }}>
          <Box sx={{ flex: 2 }}>
            <Box sx={{ mb: "8px", bgcolor: "#fff", p: "24px 30px" }}>
              <Typography
                sx={{
                  fontSize: "1.15em",
                  fontFamily: "futura-pt",
                  fontWeight: "700",
                  letterSpacing: "2.5px",
                  lineHeight: "22px",
                  color: "#2d2d2d",
                }}
              >
                MY BAG
              </Typography>
            </Box>
            <Box sx={{ px: "30px", bgcolor: "#fff" }}>
              <Box>
                <CartProductCard display="flex" />
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: "24px",
                  mt: "8px",
                  gap: "24px",
                  bgcolor: "#fff",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    letterSpacing: "2.5px",
                    lineHeight: "16px",
                    color: "#2D2D2D",
                    fontFamily: "futura-pt",
                  }}
                >
                  SUB-TOTAL
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    letterSpacing: "2.5px",
                    fontWeight: "700",

                    lineHeight: "16px",
                    color: "#2d2d2d",
                    fontFamily: "futura-pt",
                    mr: "",
                  }}
                >
                  ${getSubTotal()}
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: "8px",
                  p: "23px 30px",
                  display: "flex",
                  bgcolor: "#fff",
                  mb: "10px",
                }}
              >
                <LocalShippingOutlined
                  sx={{ fontSize: "28px", mr: "30px", color: "#2d2d2d" }}
                />
                <Box>
                  <Typography
                    sx={{
                      lineHeight: "1.5em",
                      fontFamily: "futura-pt",
                      fontWeight: "700",
                      fontSize: "16px",
                      letterSpacing: "2px",
                      mb: "3px",
                    }}
                  >
                    FREE* STANDARD SHIPPING
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: "1.5em",
                      fontFamily: "futura-pt",
                      fontSize: "16px",
                      letterSpacing: ".4px",
                      mb: "3px",
                    }}
                  >
                    Faster delivery options available to most countries
                  </Typography>
                  <Typography
                    component="a"
                    src="#"
                    sx={{
                      lineHeight: "1.5em",
                      fontFamily: "futura-pt",
                      fontSize: "16px",
                      letterSpacing: ".4px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    More info
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              ml: { md: "10px" },
            }}
          >
            <Box
              sx={{
                p: "24px 30px 24px 30px",
                bgcolor: "#fff",

                position: "sticky",
                top: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.15em",
                  fontFamily: "futura-pt",
                  fontWeight: "700",
                  letterSpacing: "2.5px",
                  lineHeight: "22px",
                  color: "#2d2d2d",
                  mb: "24px",
                }}
              >
                TOTAL
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    letterSpacing: "2.5px",
                    lineHeight: "16px",
                    color: "#2d2d2d",
                    fontFamily: "futura-pt",
                  }}
                >
                  Sub-total
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    letterSpacing: "2.5px",
                    lineHeight: "16px",
                    color: "#2d2d2d",
                    fontFamily: "futura-pt",
                  }}
                >
                  ${getSubTotal()}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    letterSpacing: "2.5px",
                    lineHeight: "16px",
                    color: "#2d2d2d",
                    fontFamily: "futura-pt",
                  }}
                >
                  Shipping
                </Typography>
                <ErrorOutlineOutlined
                  sx={{ fontSize: "16px", color: "#999" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    letterSpacing: "2.5px",
                    lineHeight: "16px",
                    color: "#2d2d2d",
                    fontFamily: "futura-pt",
                  }}
                >
                  Sales Tax
                </Typography>
                <ErrorOutlineOutlined
                  sx={{ fontSize: "16px", color: "#999" }}
                />
              </Box>
              <Button
                sx={{
                  width: "100%",
                  bgcolor: "#018849",
                  borderRadius: "0",
                  color: "#fff",
                  fontWeight: "bold",
                  mt: "25px",
                  "&.MuiButton-root:hover": {
                    bgcolor: "#006637",
                  },
                }}
              >
                CHECKOUT
              </Button>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "16px",
                  color: "#2d2d2d",
                  fontFamily: "futura-pt",
                  mt: "16px",
                }}
              >
                WE ACCEPT:
              </Typography>
              <CardMedia
                component="img"
                src={paymentList}
                alt="payment method"
                sx={{ width: "192px", height: "20px", mt: "8px" }}
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  lineHeight: "16px",
                  color: "#2d2d2d",
                  fontFamily: "futura-pt",
                  mt: "16px",
                }}
              >
                Got a discount code? Add it in the next step.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box p="125px 0px">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ShoppingBagOutlined
          sx={{ fontSize: "32px", color: "#2d2d2d", mb: "20px" }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: "700", fontSize: "20px", color: "#2d2d2d" }}
        >
          Your Bag is Empty
        </Typography>
        <Link to="/products/8799">
          <Button
            sx={{
              bgcolor: "#018849",
              borderRadius: "0",
              color: "#fff",
              fontWeight: "bold",
              mt: "25px",
              p: "15px",
              "&.MuiButton-root:hover": {
                bgcolor: "#006637",
              },
            }}
          >
            CONTINUE SHOPPING
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CartPage;
