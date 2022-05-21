import { Autocomplete, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createFilterOptions } from "@mui/material/Autocomplete";

export const SearchBar = () => {
  const [val, setVal] = useState(null);
  const [computerModels, setComputerModels] = useState([]);
  let currentURL = window.location.href;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/computerModels")
      .then((res) => res.json())
      .then((data) => setComputerModels(data));
  }, [currentURL]);

  const OPTIONS_LIMIT = 7;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    if (state.inputValue.trim() === "") return false;
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  const sortModelByClick = (e, value) => {
    if (e.key === "Enter") {
      const ArrayObject = computerModels.find((t) => t.title === value);
      return navigate("/ComputerListPage/All/" + ArrayObject.id);
    }
    if (value === "" || value === null) return null;
    const ArrayObject = computerModels.find(
      (t) => t.title.trim() === e.target.innerText.trim()
    );
    setVal(value);
    navigate("/ComputerListPage/All/" + ArrayObject.id);
  };

  return (
    <Autocomplete
      sx={{ margin: "1em", width: "400px" }}
      // noOptionsText={"No options"}
      freeSolo 
      popupIcon={null}
      filterOptions={filterOptions}
      value={currentURL.includes("ComputerListPage/All/") ? val : null}
      onInputChange={(event, value, reason) =>
        reason === "clear" ? setVal(null) : null
      }
      onChange={(e, value) => sortModelByClick(e, value)}
      options={computerModels.map((option) => option.title)}
      renderInput={(params) => <TextField {...params} label="Search computer model" />}
    />
  );
};
