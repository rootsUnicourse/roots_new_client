import React from 'react';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

// @mui icons
import SearchIcon from "@mui/icons-material/Search";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";



function SearchBar(props) {

    

    return (
        <MKBox component="section" pt={10} pb={3} sx={{marginBottom: "0px", marginTop: "-60px"}}>
        <Container>
            <Grid container item xs={12} lg={4}  mx="auto">
            <MKInput
                sx={{
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#03CF9D", // this changes the line beneath the input
                    },
                    "& .MuiInput-underline.Mui-focused:after": {
                      borderBottomColor: "#03CF9D", // this changes the color of the line beneath the input when focused
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "#03CF9D", // this changes the color of the label when focused
                    },
                }}
                onChange={(e)=>props.change(e)} 
                variant="standard"
                placeholder="Search"
                fullWidth
                InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
                }}
            />
            </Grid>
        </Container>
        </MKBox>
    );
}

export default SearchBar;