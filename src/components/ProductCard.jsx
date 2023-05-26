import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const ProductCard = ({ product, xs, sm }) => {
  return (
    <>
      <Grid
        xs={xs || 6}
        sm={sm || 4}
        lg={sm || 3}
        sx={{
          mb: "1rem",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "100%",
            boxShadow: "none",
            borderRadius: "0",
          }}
        >
          <Link to={`/product/${product.id}`}>
            <Box position="relative" className="product_img">
              <CardMedia
                component="img"
                sx={{ height: "100%" }}
                width="100%"
                image={`//${product?.imageUrl}?$n_480w$&wid=476&fit=constrain`}
                alt="dress"
              />
              <CardMedia
                className="product_overlay"
                sx={{ height: "100%" }}
                src={`//${product.additionalImageUrls[0]}?$n_480w$&wid=476&fit=constrain`}
                width="100%"
                alt="dress"
                component="img"
              />
            </Box>

            <CardContent className="product_card">
              <Typography
                className="product_text"
                color="#2d2d2d"
                fontSize="14px"
                letterSpacing=".5px"
                lineHeight="20px"
                margin=" 0 0 8px"
                height="44px"
                overflow="hidden"
                position="relative"
                fontFamily="inherit"
              >
                {product?.name}
              </Typography>
              {product?.price?.previous?.text ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Typography
                    component="span"
                    color="#2d2d2d"
                    fontSize="12px"
                    letterSpacing=".8px"
                    fontWeight={400}
                    sx={{
                      textDecoration: "line-through",
                      fontFamily: "futura-pt",
                    }}
                    lineHeight="16px"
                  >
                    RRP {product.price.previous.text}
                  </Typography>
                  <Typography
                    color="#D01345"
                    fontSize="14px"
                    fontWeight={700}
                    letterSpacing=".8px"
                    lineHeight="20px"
                  >
                    {product.price.current.text}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography
                    color="#666666"
                    fontSize="14px"
                    fontWeight={700}
                    letterSpacing=".8px"
                    lineHeight="20px"
                  >
                    {product.price.current.text}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Link>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
