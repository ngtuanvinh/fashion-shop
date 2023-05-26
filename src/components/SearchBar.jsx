import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

import React from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
    setSearchTerm("");
  };
  return (
    <Box className="searchbar" sx={{}}>
      <FormControl
        variant="standard"
        component="form"
        onSubmit={onHandleSubmit}
        sx={{
          boxShadow: "none",
          borderRadius: 0,
        }}
      >
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: { sm: "50vh", xs: "100%" },
            caretColor: "#3d4246",
            color: "#3d4246",
            "&.MuiInput-root:hover:not(.Mui-disabled):before": {
              borderBottom: "2px solid #d1cfcf",
            },
            "&.MuiInput-root:before": {
              borderBottom: "1px solid #d1cfcf",
            },
            "&.MuiInput-root:after": {
              borderBottom: "2px solid gray",
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onHandleSubmit}>
                <SearchOutlined sx={{ fontSize: "30px" }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
