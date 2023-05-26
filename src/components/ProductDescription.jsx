import { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DOMPurify from "dompurify";

const ProductDescription = ({ data }) => {
  const [descriptionOpenState, setDescriptionOpenState] = useState({
    brand: false,
    productDetails: false,
    sizeAndFit: false,
    lookAfterMe: false,
    aboutMe: false,
  });

  const modifyWord = (word) => {
    let newWord = "";
    for (let i = 0; i < word.length; i++) {
      if (i === 0) {
        newWord += word[i].toUpperCase();
      } else {
        if (word[i] === word[i].toUpperCase()) {
          newWord = newWord + " " + word[i];
        } else {
          newWord += word[i];
        }
      }
    }
    return newWord;
  };

  const descriptionInfo = { ...data?.info };

  const handleDescriptionItemClick = (description) => {
    setDescriptionOpenState((prevState) => ({
      ...prevState,
      [description]: !prevState[description],
    }));
  };
  return (
    <Box mt="20px">
      <List sx={{ width: "100%" }} component="ul">
        {data?.description && (
          <>
            <ListItemButton
              className={
                descriptionOpenState.productDetails ? "activeDescription" : ""
              }
              disableRipple
              onClick={() => handleDescriptionItemClick("productDetails")}
              sx={{
                p: "8px 16px 8px 0",
                borderTop: "1px solid #eee",
                "& .MuiTypography-root": {
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#2d2d2d",
                },
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "#fff",
                },
                "&.Mui-focused .MuiButtonBase-root": {
                  boxShadow: "0 0 3px 1px #0770cf",
                },
              }}
            >
              <ListItemText primary="Product Details" />
              {descriptionOpenState.productDetails ? (
                <ExpandMore />
              ) : (
                <ExpandLess />
              )}
            </ListItemButton>
            <Collapse
              in={descriptionOpenState.productDetails}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {
                  <Box
                    className="productDescription"
                    sx={{
                      fontSize: "15px",
                      fontFamily: "futura-pt",
                      color: "#2d2d2d",
                      letterSpacing: ".6px",
                      lineHeight: "1.8",
                      m: "10px 20px 10px 0",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(data?.description),
                    }}
                  />
                }
              </List>
            </Collapse>
          </>
        )}
        {data?.brand?.description && (
          <>
            <ListItemButton
              className={descriptionOpenState.brand ? "activeDescription" : ""}
              disableRipple
              onClick={() => handleDescriptionItemClick("brand")}
              sx={{
                p: "8px 16px 8px 0",
                borderTop: "1px solid #eee",
                "& .MuiTypography-root": {
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#2d2d2d",
                },
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "#fff",
                },
                "&.Mui-focused .MuiButtonBase-root": {
                  boxShadow: "0 0 3px 1px #0770cf",
                },
              }}
            >
              <ListItemText primary="Brand" />
              {descriptionOpenState.brand ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse
              in={descriptionOpenState.brand}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {
                  <Box
                    sx={{
                      fontSize: "15px",
                      fontFamily: "futura-pt",
                      color: "#2d2d2d",
                      letterSpacing: ".6px",
                      lineHeight: "1.8",
                      m: "10px 20px 10px 0",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(data?.brand?.description),
                    }}
                  />
                }
              </List>
            </Collapse>
          </>
        )}
        {Object.keys(descriptionInfo)?.length &&
          Object.keys(descriptionInfo)?.map((key, index) => (
            <Box key={index}>
              <ListItemButton
                className={descriptionOpenState[key] ? "activeDescription" : ""}
                disableRipple
                onClick={() => handleDescriptionItemClick(`${key}`)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: "8px 16px 8px 0",
                  borderTop: "1px solid #eee",
                  borderBottom:
                    index === Object.keys(descriptionInfo).length - 1
                      ? "1px solid #eee"
                      : "",
                  "& .MuiTypography-root": {
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#2d2d2d",
                  },
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#fff",
                  },
                  "&.Mui-focused .MuiButtonBase-root": {
                    boxShadow: "0 0 3px 1px #0770cf",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#2d2d2d",
                  }}
                >
                  {modifyWord(key)}
                </Typography>
                {descriptionOpenState[key] ? <ExpandMore /> : <ExpandLess />}
              </ListItemButton>
              <Collapse
                in={descriptionOpenState[key]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {
                    <Box
                      sx={{
                        fontSize: "15px",
                        fontFamily: "futura-pt",
                        color: "#2d2d2d",
                        letterSpacing: ".6px",
                        lineHeight: "1.8",
                        m: "10px 20px 10px 0",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.info?.[key]),
                      }}
                    />
                  }
                </List>
              </Collapse>
            </Box>
          ))}
      </List>
    </Box>
  );
};

export default ProductDescription;
