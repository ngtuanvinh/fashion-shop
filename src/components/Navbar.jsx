import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { navLinks, productsType } from "../utils/constant";
import Logo from "../assets/fashionLogo.png";
import { CartContext } from "./CartContextProvider";
import MiniBagDropDown from "./MiniBagDropDown";
import { useLocation } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Toolbar,
  CardMedia,
} from "@mui/material";
import { ShoppingBagOutlined, MenuOutlined } from "@mui/icons-material";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { getTotalItemsCount, setShowMiniBag, timeoutId } =
    useContext(CartContext);
  const totalItem = getTotalItemsCount();
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: 0, borderBottom: "1px solid #e8e9eb " }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { lg: "32px", sm: "24px" },
          py: { sm: "10px" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <CardMedia
              sx={{
                pl: { xs: "20px", sm: 0 },
                py: { xs: "8px", sm: 0 },
                mr: { xs: "0", md: "20px" },
              }}
              component="img"
              src={Logo}
              alt="Logo"
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: { md: "flex", xs: "none" },
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.id}
              className="nav-link"
              to={item.title === "Home" ? "/" : `/products/${item.id}`}
            >
              <Typography color="#3d4246">{item.title}</Typography>
            </Link>
          ))}
          <Link className="nav-link" onClick={handleClick}>
            <Typography color="#3d4246">Shop</Typography>
          </Link>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {productsType.map((item) => (
              <Box key={item.id}>
                <Link className="nav-link" to={`/products/${item.id}`}>
                  <MenuItem sx={{ py: "10px" }} onClick={handleClose}>
                    {item.title}
                  </MenuItem>
                </Link>
              </Box>
            ))}
          </Menu>
        </Box>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            px: { xs: "20px", sm: 0 },
          }}
        >
          <SearchBar />
          <Box position="relative">
            <Link to="/cart">
              <IconButton
                className="cart-icon"
                sx={{
                  ":hover": {
                    color: "#3d4246",
                  },
                }}
                onMouseEnter={handleOpenMiniBag}
                onMouseLeave={handleCloseMiniBag}
              >
                <ShoppingBagOutlined sx={{ fontSize: "30px" }} />
                {totalItem > 0 ? (
                  <Box className="cart-icon__count">{totalItem}</Box>
                ) : null}
              </IconButton>
            </Link>
            {!isCartPage && <MiniBagDropDown />}
          </Box>
          <IconButton
            sx={{
              display: { md: "none" },
              ":hover": {
                color: "#3d4246",
              },
            }}
            onClick={handleClick}
          >
            <MenuOutlined sx={{ fontSize: "30px" }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ display: { sm: "none", xs: "block" } }}
          >
            {navLinks.map((item) => (
              <Link
                key={item.id}
                className="nav-link"
                to={item.title === "Home" ? "/" : `/products/${item.id}`}
              >
                <MenuItem sx={{ py: "10px" }} onClick={handleClose}>
                  {item.title}
                </MenuItem>
              </Link>
            ))}
            {productsType.map((item) => (
              <Link
                className="nav-link"
                key={item.id}
                to={`/products/${item.id}`}
              >
                <MenuItem sx={{ py: "10px" }} onClick={handleClose}>
                  {item.title}
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </Toolbar>
      </Box>
    </Paper>
  );
};

export default Navbar;
