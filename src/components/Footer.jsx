import React from "react";
import { Box, Typography } from "@mui/material";
import fb from "../assets/facebook.svg";
import ins from "../assets/instagram.svg";
import visa from "../assets/visa.webp";
import paypal from "../assets/paypal.webp";
import afterpay from "../assets/afterpaynew.webp";
import americanexpress from "../assets/americanexpress.webp";
import applepay from "../assets/applepay.webp";
import mastercard from "../assets/mastercard.webp";
import klarnagb from "../assets/klarnagb.webp";

const Footer = () => {
  const payment = [
    visa,
    paypal,
    afterpay,
    americanexpress,
    applepay,
    mastercard,
    klarnagb,
  ];

  return (
    <Box
      sx={{
        borderTop: "1px solid #eee",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          px: { sm: "32px", md: "40px" },
          maxWidth: "960px",
          m: "0 auto",
          gap: "50px",
          py: "15px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "30px",
            height: "30px",
          }}
        >
          <img src={fb} alt="facebook" />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "30px",
            height: "30px",
            borderRight: "1px solid #2d2d2d",
            pr: "75px",
          }}
        >
          <img src={ins} alt="instagram" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {payment.map((item, index) => (
            <Box
              key={index}
              component="img"
              src={item}
              alt="payment method"
              sx={{ width: "32px", height: "20px" }}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          px: {
            xs: "16px",
            sm: "24px",
            lg: "32px",
          },
          bgcolor: "#ddd",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#2d2d2d",
            lineHeight: "50px",
            fontSize: { md: "14px", xs: "11px" },
            fontFamily: "futura-pt",
          }}
        >
          © 2023, Conquista-Fashion
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              color: "#2d2d2d",
              fontSize: { md: "14px", xs: "11px" },
              fontFamily: "futura-pt",
              pr: " 10px",
              height: "20px",
              borderRight: "1px solid #525050",
            }}
          >
            Privacy & Cookies
          </Typography>

          <Typography
            sx={{
              color: "#2d2d2d",
              fontSize: { md: "14px", xs: "11px" },
              fontFamily: "futura-pt",
              height: "20px",
              pl: "10px",
            }}
          >
            Accessibility
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
