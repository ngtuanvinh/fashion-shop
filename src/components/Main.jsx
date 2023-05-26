import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import useFetch from "../utils/useFetch";
import ProductCard from "./ProductCard";
import poster from "../assets/poster.webp";
import Spinner from "./Spinner";

const Main = () => {
  const { data, isLoading } = useFetch(
    "https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=8799&limit=20&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US"
  );
  let content;
  if (isLoading) {
    content = (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </Box>
    );
  } else {
    content = (
      <Box sx={{ pt: "4rem", px: { xs: "20px", sm: "55px" }, mb: "15px" }}>
        <Typography
          variant="h6"
          color="#3d4246"
          fontWeight={600}
          textAlign="center"
        >
          SPRING 23
        </Typography>
        <Grid container spacing="12px" my="12px">
          {data?.products?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Grid>
        <Box
          width="100%"
          sx={{ display: "flex", justifyContent: "center", my: "1rem" }}
        >
          <Link to="/products/8799">
            <Button
              variant="outlined"
              sx={{
                maxWidth: "300px",
                borderRadius: 0,
                p: "15px",
                border: "2px solid #DDDDDD",
                "&:hover": {
                  border: "2px solid #DDDDDD",
                  color: "#DDDDDD",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#2d2d2d",
                  fontSize: "16px",
                  letterSpacing: "2px",
                }}
              >
                VIEW ALL
              </Typography>
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: { md: "flex", xs: "none" },
            mt: "4rem",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <img className="main_poster" src={poster} alt="poster" />
          <Box>
            <Typography
              variant="h5"
              sx={{
                mb: ".5rem",
                fontSize: "1.625rem",
                fontWeight: "600",
                lineHeight: "1.2",
                color: "#3d4246",
              }}
            >
              Conquista Your Closet!
            </Typography>
            <Typography sx={{ fontSize: "1.125rem", color: "#69727b" }}>
              With Spring just around the corner, make sure you shore up the
              chic with some of Conquista’s best from the SS Collection.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return <>{content}</>;
};

export default Main;
