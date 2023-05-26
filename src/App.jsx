import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import {
  Main,
  Footer,
  Navbar,
  ProductsPage,
  SingleProductPage,
  SearchPage,
  CartPage,
  CartContextProvider,
} from "./components";

import { Box, Typography } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Box className="container">
          <Box backgroundColor="#557B97">
            <Typography
              color="white"
              textAlign="center"
              padding="10px"
              fontWeight={600}
            >
              Free delivery on all orders $200 and over
            </Typography>
          </Box>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/products/:catId" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<SingleProductPage />} />
            <Route path="/search/:productName" element={<SearchPage />} />
          </Routes>
          <Footer />
        </Box>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
