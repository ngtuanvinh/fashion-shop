import { useState } from "react";
import useFetch from "../utils/useFetch";
import { useParams } from "react-router-dom";
import Arrow from "./Arrow";
import AddToCart from "./AddToCart";
import ProductDescription from "./ProductDescription";
import ProductCard from "./ProductCard";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Spinner from "./Spinner";
import {
  Box,
  Typography,
  CardMedia,
  Rating,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import {
  ArrowForwardIosOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
  QueryBuilderOutlined,
  ArrowBackIosNewOutlined,
} from "@mui/icons-material";
const SingleProductPage = () => {
  const { id } = useParams();
  const url = `https://asos2.p.rapidapi.com/products/v3/detail?id=${id}&lang=en-US&store=US&sizeSchema=US&currency=USD`;
  const { data, isLoading, error } = useFetch(url);
  const imagesGallery = data?.media?.images?.map((item) => item.url);
  const [currentImg, setCurrentImg] = useState("");

  const productType = data?.productType?.id;
  const similarProductUrl = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=8799&limit=20&country=US&sort=freshness&attribute_1047=${productType}&currency=USD&sizeSchema=US&lang=en-US`;
  const { data: similarProducts } = useFetch(similarProductUrl);

  const [size, setSize] = useState("");
  const [isSizeSelected, setIsSizeSelected] = useState(true);
  const [productVariant, setProductVariant] = useState("");
  const handleSelectSize = (event) => {
    setSize(event.target.value);
    setIsSizeSelected(true);
  };
  const isDiscountPrice =
    data?.price?.previous?.value &&
    data?.price?.previous?.value !== data?.price?.current?.value;

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
      <Box>
        <Box sx={{ maxWidth: "960px", m: "0 auto" }}>
          <Box sx={{ display: { sm: "flex" }, mt: { sm: "50px", xs: "0" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { sm: "row", xs: "column-reverse" },
                px: { sm: "10px" },
                width: { sm: "inherit", xs: "100%" },
                flex: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { sm: "column", xs: "row" },
                  pr: "17px",
                  justifyContent: { xs: "center", sm: "start" },
                }}
              >
                {imagesGallery?.map((item, index) => (
                  <CardMedia
                    className={currentImg === item ? "img_active" : ""}
                    key={index}
                    component="img"
                    src={`//${item}`}
                    alt="image"
                    sx={{
                      width: "40px",
                      height: "52px",
                      border: "2px solid #fff",
                      m: "20px 10px 11px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => setCurrentImg(item)}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  position: "relative",
                  flex: 2,
                  mr: { sm: "24px", xs: "0" },
                }}
              >
                <Box sx={{ position: "sticky", top: 0 }}>
                  <TransformWrapper>
                    <TransformComponent>
                      <CardMedia
                        component="img"
                        alt="image"
                        src={`//${
                          currentImg || data?.media?.images?.[0]?.url
                        }?$n_750w$&wid=750&fit=constrain`}
                        sx={{ width: "100%" }}
                      />
                    </TransformComponent>
                  </TransformWrapper>

                  <Arrow
                    right={0}
                    pl="15px"
                    imagesGallery={imagesGallery}
                    currentImg={currentImg}
                    setCurrentImg={setCurrentImg}
                  >
                    <ArrowForwardIosOutlined sx={{ fontSize: "32px" }} />
                  </Arrow>

                  <Arrow
                    pr="15px"
                    imagesGallery={imagesGallery}
                    currentImg={currentImg}
                    setCurrentImg={setCurrentImg}
                  >
                    <ArrowBackIosNewOutlined sx={{ fontSize: "32px" }} />
                  </Arrow>
                </Box>
              </Box>
            </Box>
            <Box
              flex={1}
              sx={{ px: { sm: "0", xs: "10px" }, mt: { xs: "0", sm: "20px" } }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    mr: { sm: "24px" },
                    fontSize: "18px",
                    fontWeight: "normal",
                    letterSpacing: ".6px",
                    lineHeight: "24px",
                    color: "#2d2d2d",
                    fontFamily: "futura-pt",
                    mt: { xs: "10px", sm: "0" },
                  }}
                >
                  {data?.name}
                </Typography>
                <Typography
                  sx={{
                    mt: "12px",
                    color: isDiscountPrice ? "#d01345" : "#666",
                    fontSize: "18px",
                    fontFamily: "futura-pt",
                    fontWeight: "bold",
                    letterSpacing: ".8px",
                    lineHeight: "24px",
                  }}
                >
                  {isDiscountPrice && "Now"} {data?.price?.current?.text}
                </Typography>
                {isDiscountPrice && (
                  <Typography
                    sx={{
                      fontFamily: "futura-pt",
                      color: "#666",
                      fontSize: "14px",
                      fontWeight: "normal",
                      letterSpacing: ".6px",
                      lineHeight: "20px",
                      mt: "5px",
                    }}
                  >
                    Was {data?.price?.previous?.text}
                  </Typography>
                )}
                {data?.rating?.averageOverallRating && (
                  <Box mt="20px" sx={{ display: "flex" }}>
                    <Rating
                      name="read-only"
                      value={data?.rating?.averageOverallRating}
                      readOnly
                      sx={{
                        width: "14px",
                        height: "14px",
                        fontSize: "20px",
                        mr: "92px",
                        "&.MuiRating-root": {
                          ".MuiRating-icon": {
                            color: "#2d2d2d",
                          },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontFamily: "futura-pt",
                        color: "#2d2d2d",

                        mr: "10px",
                      }}
                    >
                      {data?.rating?.averageOverallRating}{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontFamily: "futura-pt",
                        color: "#2d2d2d",
                      }}
                    >
                      ({data?.rating?.totalReviewCount}){" "}
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    mt: "20px",
                    bgcolor: "#cde2f5",
                    p: "10px 10px 15px ",
                    fontSize: "15px",
                    letterSpacing: "1px",
                    color: "#2d2d2d",
                    fontFamily: "futura-pt",
                    lineHeight: "24px",
                  }}
                >
                  NEW HERE <br />
                  Get 15% off everything!* <br />
                  With code: <strong> NEWBIE</strong>
                </Box>
                <Box sx={{ display: "inline-block", mt: "24px" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      display: "inline-block",
                      fontSize: "16px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      color: "#2d2d2d",
                      fontFamily: "futura-pt",
                      lineHeight: "16px",
                    }}
                  >
                    COLOR:
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline-block",
                      ml: "6px",
                      fontSize: "16px",
                      fontWeight: "normal",
                      letterSpacing: ".4px",
                      color: "#2d2d2d",
                      fontFamily: "futura-pt",
                      lineHeight: "22px",
                    }}
                  >
                    {data?.variants?.[0].colour}
                  </Typography>
                </Box>
                <Box mt="10px">
                  <Typography
                    variant="h2"
                    sx={{
                      display: "inline-block",
                      fontSize: "16px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      color: "#2d2d2d",
                      fontFamily: "futura-pt",
                      lineHeight: "16px",
                    }}
                  >
                    SIZE:
                  </Typography>
                  <Box sx={{ minWidth: 120, mt: "11px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label" sx={{ top: "-7px" }}>
                        Size
                      </InputLabel>
                      <Select
                        labelId="select-label"
                        value={size}
                        label="Size"
                        onChange={handleSelectSize}
                        sx={{
                          borderRadius: "0",
                          height: "40px",
                          "&.MuiInputBase-root": {
                            "& fieldset": {
                              border: !isSizeSelected
                                ? "2px solid #d01345"
                                : "",
                            },
                            "&.Mui-focused fieldset": {
                              boxShadow: "0 0 3px 1px #0770cf",
                              border: "1px solid #999",
                            },
                          },
                        }}
                      >
                        {data?.variants?.map((item) => (
                          <MenuItem
                            key={item?.id}
                            onClick={() => setProductVariant(item)}
                            value={item?.brandSize}
                            disabled={!item?.isInStock}
                            sx={{ display: "flex" }}
                          >
                            <Typography component="span" sx={{ mr: "5px" }}>
                              {item?.brandSize}
                            </Typography>
                            {!item?.isInStock && (
                              <Typography> - (Out of stock)</Typography>
                            )}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                {!isSizeSelected && (
                  <Typography
                    mt="20px"
                    sx={{
                      bgcolor: "#fae7ec",
                      padding: "10px",
                      width: "100%",
                      fontFamily: "futura-pt",
                      fontSize: "16px",
                    }}
                  >
                    Please select from the available size options
                  </Typography>
                )}
                {productVariant?.isLowInStock && (
                  <Box sx={{ display: "flex", mt: "15px" }}>
                    <QueryBuilderOutlined sx={{ mr: "7px" }} />
                    <Typography
                      sx={{
                        width: "100%",
                        fontFamily: "futura-pt",
                        fontSize: "16px",
                        color: "#2d2d2d",
                        fontWeight: "bold",
                        letterSpacing: "1.4",
                      }}
                    >
                      LOW IN STOCK
                    </Typography>
                  </Box>
                )}
                <AddToCart
                  size={size}
                  setIsSizeSelected={setIsSizeSelected}
                  product={productVariant}
                  imageUrl={imagesGallery?.[0]}
                  data={data}
                />
                <Box sx={{ border: "1px solid #eee", p: "16px", mt: "20px" }}>
                  <Box sx={{ display: "flex", mb: "12px" }}>
                    <LocalShippingOutlined
                      sx={{
                        color: "#2d2d2d",
                        mr: "10px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#2d2d2d",
                        lineHeight: "24px",
                        fontFamily: "futura-pt",
                        letterSpacing: ".6px",
                      }}
                    >
                      Free Delivery
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Inventory2Outlined
                      sx={{
                        color: "#434040",
                        mr: "10px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "futura-pt",
                        fontSize: "14px",
                        color: "#434040",
                        lineHeight: "24px",
                        letterSpacing: ".6px",
                      }}
                    >
                      Free Returns
                    </Typography>
                  </Box>
                </Box>
                <ProductDescription data={data} />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: "40px" }} />
          <Box mt="24px" sx={{ px: { xs: "10px", md: "0" } }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                letterSpacing: ".8px",
                lineHeight: "24px",
                color: "#2d2d2d",
                mb: "20px",
              }}
            >
              YOU MIGHT ALSO LIKE
            </Typography>
            <Grid container spacing="12px" m={0}>
              {similarProducts?.products?.map((item) => (
                <ProductCard key={item?.id} product={item} xs={4} sm={2.4} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  }

  return <>{content}</>;
};

export default SingleProductPage;
