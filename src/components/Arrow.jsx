import { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";

const Arrow = ({
  right,
  pl,
  pr,
  children,
  imagesGallery,
  currentImg,
  setCurrentImg,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);
  const handleClick = () => {
    setIsClicked(true);
    const currentImgIndex = currentImg ? imagesGallery?.indexOf(currentImg) : 0;
    if (pl) {
      if (currentImgIndex !== imagesGallery.length - 1) {
        setCurrentImg(imagesGallery?.[currentImgIndex + 1]);
      } else {
        setCurrentImg(imagesGallery?.[0]);
      }
    } else {
      if (currentImgIndex !== 0) {
        setCurrentImg(imagesGallery?.[currentImgIndex - 1]);
      } else {
        setCurrentImg(imagesGallery?.[imagesGallery?.length - 1]);
      }
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <Box
      className={isClicked ? "img-arrow" : ""}
      sx={{
        position: "absolute",
        top: "45%",
        right: right,
        cursor: "pointer",
        pl: pl,
        pr: pr,
      }}
      onClick={handleClick}
      ref={ref}
    >
      {children}
    </Box>
  );
};

export default Arrow;
