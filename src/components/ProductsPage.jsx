import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Unstable_Grid2";
import { sortOptions } from "../utils/constant";
import ProductsMenu from "./ProductsMenu";
import { options } from "../utils/useFetch";
import Spinner from "./Spinner";

const ProductsPage = () => {
  const { catId } = useParams();
  const [pageOffset, setPageOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState(
    `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${pageOffset}&categoryId=${catId}&limit=48&country=US&currency=USD&sizeSchema=US&lang=en-US&sort=""`
  );
  const totalProducts =
    pageOffset + 48 >= items.itemCount ? items.itemCount : pageOffset + 48;
  const progressValue = (totalProducts / items.itemCount) * 100;

  const handleLoadMore = async () => {
    setIsFetching(true);
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
    const newOffset = pageOffset + 48;
    params.delete("offset");
    params.append("offset", newOffset);
    const newUrl = `https://asos2.p.rapidapi.com/products/v2/list?${params}`;
    try {
      const response = await fetch(newUrl, options);
      const data = await response.json();
      setItems({ ...items, products: [...items.products, ...data.products] });
      setPageOffset(newOffset);
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  const generateFilteredURL = (facetId, facetSelectionRef) => {
    setPageOffset(0);
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
    if (facetSelectionRef.current[facetId].length > 0) {
      params.delete(facetId);
      params.append(facetId, facetSelectionRef.current[facetId].join(","));
    } else {
      params.delete(facetId);
    }
    setBaseUrl(`https://asos2.p.rapidapi.com/products/v2/list?&${params}`);
  };
  const handleFacetSelection = (facetId, facetValuesId, facetSelectionRef) => {
    if (!facetSelectionRef.current[facetId]) {
      facetSelectionRef.current[facetId] = [facetValuesId];
    } else {
      if (facetSelectionRef.current[facetId].includes(facetValuesId)) {
        const result = facetSelectionRef.current[facetId].filter(
          (item) => item !== facetValuesId
        );
        facetSelectionRef.current = { ...facetSelectionRef, [facetId]: result };
      } else {
        facetSelectionRef.current[facetId] = [
          ...facetSelectionRef.current[facetId],
          facetValuesId,
        ];
      }
    }
    generateFilteredURL(facetId, facetSelectionRef);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        if (items?.products?.length > 0) {
          setIsFetchingProducts(true);
        } else {
          setIsLoading(true);
        }
        const response = await fetch(baseUrl, {
          ...options,
          signal: abortController.signal,
        });
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingProducts(false);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [baseUrl, setIsLoading, setIsFetchingProducts]);

  useEffect(() => {
    setIsLoading(true);
    setBaseUrl(
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${catId}&limit=48&country=US&currency=USD&sizeSchema=US&lang=en-US&sort=""`
    );
    return () => {
      setPageOffset(0);
    };
  }, [catId]);

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
      <Box sx={{ mt: "4rem" }}>
        <Typography
          variant="h6"
          color="#3d4246"
          fontWeight={600}
          textAlign="center"
          textTransform="uppercase"
          sx={{ mb: "2rem" }}
        >
          {items?.categoryName}
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ bgcolor: "#eee", px: { lg: "32px", sm: "24px" }, m: "0" }}
        >
          <Grid lg={2.4} sm={3} xs={6}>
            <ProductsMenu
              key={items.categoryName}
              setPageOffset={setPageOffset}
              sortOptions={sortOptions}
              setBaseUrl={setBaseUrl}
              baseUrl={baseUrl}
            />
          </Grid>
          {items?.facets?.slice(0, 11).map((item) => (
            <Grid key={item.id} lg={2.4} sm={3} xs={6}>
              <ProductsMenu
                key={items.categoryName}
                setPageOffset={setPageOffset}
                options={item}
                baseUrl={baseUrl}
                handleFacetSelection={handleFacetSelection}
                setBaseUrl={setBaseUrl}
                sortOptions={item?.facetValues}
              />
            </Grid>
          ))}
        </Grid>
        <Typography
          color="#666"
          fontSize="14px"
          letterSpacing="0.5px"
          lineHeight="20px"
          m="0 0 4px"
          p="16px 0 0"
          textAlign="center"
        >
          {items.itemCount} styles found
        </Typography>

        {isFetchingProducts ? (
          <Spinner />
        ) : (
          <Grid
            container
            spacing="12px"
            my="12px"
            sx={{
              px: { lg: "32px", sm: "24px", xs: "12px" },
              width: "100%",
              mx: "0",
            }}
          >
            {items?.products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </Grid>
        )}
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: "1rem",
            gap: "16px",
          }}
        >
          <Typography
            color="#666"
            fontSize="14px"
            fontFamily="futura-pt"
            letterSpacing=".5px"
            lineHeight="20px"
          >
            You've viewed {totalProducts} of {items.itemCount} products
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{ width: "200px", height: "2px", bgcolor: "#ddd" }}
          />
          {isFetching ? (
            <Spinner />
          ) : (
            <Button
              variant="outlined"
              sx={{
                width: "300px",
                borderRadius: 0,
                p: "15px",
                border: "2px solid #DDDDDD",
                "&:hover": {
                  border: "2px solid #DDDDDD",
                  color: "#DDDDDD",
                },
                display: items.itemCount <= pageOffset + 48 ? "none" : "block",
              }}
              onClick={handleLoadMore}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#2d2d2d",
                  fontSize: "16px",
                  letterSpacing: "2px",
                }}
              >
                LOAD MORE
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
    );
  }

  return <>{content}</>;
};

export default ProductsPage;
