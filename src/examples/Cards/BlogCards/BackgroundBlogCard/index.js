/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function BackgroundBlogCard({ image, title, description }) {

  return (
    <MKBox component="section">
      <Card
        sx={{
          backgroundImage: ({ palette: { black }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(rgba(black.main, 0.5), rgba(black.main, 0.5))}, url(${image})`,
          backgroundSize: "cover",
        }}
      >
        <MKBox p={3}>
          <MKBox minHeight="20.625rem" my="auto" py={3}>
            <MKTypography
              variant="h2"
              color="white"
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              {title}
            </MKTypography>
            <MKTypography variant="body2" color="white" my={3}>
              {description}
            </MKTypography>
          </MKBox>
        </MKBox>
      </Card>
    </MKBox>
  );
}

// Typechecking props for the BackgroundBlogCard
BackgroundBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default BackgroundBlogCard;
