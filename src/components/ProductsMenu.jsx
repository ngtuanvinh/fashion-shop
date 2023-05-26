import { useState, useRef } from "react";
import {
  Button,
  Menu,
  Typography,
  Divider,
  Box,
  InputAdornment,
  Input,
} from "@mui/material";
import {
  SearchOutlined,
  CheckOutlined,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";

const ProductsMenu = ({
  sortOptions,
  options,
  baseUrl,
  setBaseUrl,
  setPageOffset,
  handleFacetSelection,
}) => {
  const [optionSelected, setOptionSelected] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const facetSelectionRef = useRef({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setFilterTerm("");
  };

  const handleSortSelection = (id) => {
    setPageOffset(0);
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
    if (params.has("sort")) {
      params.delete("sort");
      params.append("sort", id);
    }
    setOptionSelected(id);
    setBaseUrl(
      (prev) => `https://asos2.p.rapidapi.com/products/v2/list?${params}`
    );
  };

  const handleFacetSelectionBtn = () => {
    setPageOffset(0);
    const allFacetValues = sortOptions.map((item) => item.id);
    const url = new URL(baseUrl);
    const params = new URLSearchParams(url.search);
    params.delete(options?.id);
    if (facetSelectionRef.current[options?.id]?.length) {
      facetSelectionRef.current[options?.id] = [];
    } else {
      facetSelectionRef.current[options?.id] = allFacetValues;
      params.append(options?.id, allFacetValues.join(","));
    }
    setBaseUrl(`https://asos2.p.rapidapi.com/products/v2/list?${params}`);
  };

  const filterFacets = (filterTerm) => {
    if (!filterTerm) return sortOptions;

    return sortOptions.filter((item) =>
      item?.name?.toLowerCase().includes(filterTerm.toLowerCase())
    );
  };

  const filteredFacets = filterFacets(filterTerm);

  return (
    <>
      <Button
        className={
          facetSelectionRef.current[options?.id]?.length > 0
            ? "active_menu"
            : ""
        }
        sx={{
          bgcolor: "transparent",
          border: "none",
          borderTop: open
            ? "3px solid #0770cf"
            : optionSelected
            ? "3px solid #0770cf"
            : "1px solid #ddd",
          borderBottom: "1px solid #ddd",
          borderRadius: "0",
          fontFamily: "futura-pt",
          width: "100%",
          fontSize: "16px",
          fontWeight: "400",
          height: "42px",
          letterSpacing: ".3px",
          lineHeight: "1.12",
          p: "3px 20px 3px 6px",
          textTransform: "none",
          justifyContent: "space-between",
          color: "#666",
          "&:hover": {
            color: "#0770cf",
            bgcolor: "transparent",
          },
        }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownOutlined />}
      >
        {options?.name ?? "Sort"}
      </Button>
      <Menu
        className="products_menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ height: "450px" }}
      >
        {options && (
          <Box
            width="100%"
            sx={{
              bgcolor: "#f8f8f8",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: "10px 10px 10px 10px",
              }}
            >
              <Typography
                sx={{
                  color: "#2d2d2d",
                  fontSize: "14px",
                  letterSpacing: ".4px",
                  lineHeight: "1.57",
                  fontFamily: "futura-pt",
                }}
              >
                {facetSelectionRef.current[options?.id]?.length || 0} selected
              </Typography>
              <Button
                sx={{
                  height: "35px",
                  px: "10px",
                  mr: "5px",
                  border: "2px solid #767676",
                  textTransform: "uppercase",
                  letterSpacing: "1.9",
                  fontWeight: "900",
                  fontSize: "13px",
                  fontFamily: "futura-pt",
                  color: "#666",
                  borderRadius: 0,
                  "&:hover": {
                    color: "#0770cf",
                    border: "2px solid #0770cf",
                  },
                }}
                onClick={handleFacetSelectionBtn}
              >
                {!facetSelectionRef.current[options?.id]?.length && (
                  <CheckOutlined />
                )}
                {facetSelectionRef.current[options?.id]?.length
                  ? "clear"
                  : "all"}
              </Button>
            </Box>
            {options?.facetValues?.length >= 20 ? (
              <Input
                placeholder="Search"
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                sx={{
                  m: "6px 10px 16px 10px",
                  border: "1px solid #ddd",
                  borderRadius: "18px",
                  px: "14px",
                  width: "94%",
                  fontFamily: "futura-pt",
                  fontSize: "16px",
                  fontWeight: "400",
                  height: "36px",
                  bgcolor: "#fff",
                  letterSpacing: ".4px",
                  lineHeight: "22px",
                  "&.MuiInput-root:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                  "&.MuiInput-root:before": {
                    border: "none",
                  },
                  "&.MuiInput-root:after": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    boxShadow: "inset 0 0 4px 0 #0770cf",
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchOutlined />
                  </InputAdornment>
                }
              />
            ) : null}
          </Box>
        )}
        <Divider />
        {filteredFacets.map((facetValue, index) => (
          <li
            key={facetValue.id}
            className={`option ${
              facetSelectionRef.current[options?.id]?.includes(facetValue.id) ||
              optionSelected === facetValue.id
                ? "selected"
                : ""
            }`}
            onClick={
              options
                ? () =>
                    handleFacetSelection(
                      options.id,
                      facetValue.id,
                      facetSelectionRef
                    )
                : () => handleSortSelection(facetValue.id)
            }
          >
            <Typography
              sx={{
                color: optionSelected === facetValue.id ? "#fff" : "#2d2d2d",
                mr: "10px",
                fontWeight: optionSelected === facetValue.id ? "700" : "400",
                fontFamily: "futura-pt",
              }}
            >
              {facetValue?.name ?? facetValue.label}
            </Typography>
            {options && (
              <Typography sx={{ color: "#666", fontFamily: "futura-pt" }}>
                ({facetValue?.count})
              </Typography>
            )}
          </li>
        ))}
      </Menu>
    </>
  );
};

export default ProductsMenu;
