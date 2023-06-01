/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import useMediaQuery from "@mui/material/useMediaQuery";

function RotatingCardFront({ discount,color, image, icon, title, customColor}) {

  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <MKBox
      height={{ xs: 200, sm: 350 }}
      width="100%"
      display="flex"
      justifyContent="center"
      alignContent="center"
      borderRadius="lg"
      coloredShadow={color}
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba(customColor || (gradients[color] ? gradients[color].main : gradients.info.main), 0.1),
            rgba(customColor || (gradients[color] ? gradients[color].main : gradients.info.main), 0.1),
          )}, url(${image})`,
        // backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backfaceVisibility: "hidden"
      }}
    >
      <MKBox py={13} textAlign="center" >
        {!matches && <MKBox>
          <MKTypography  color="dark" gutterBottom pb={6} sx={{ fontWeight: 'bold',letterSpacing: '0.05em'}}>
            {title}
          </MKTypography>
        </MKBox>}
        <MKBox>
          {icon && (
            <MKTypography variant={matches ? "body" : "h2"} color="dark">
              {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
            </MKTypography>
          )}
        </MKBox>
        <MKBox>
          <MKTypography variant="h5" color="dark" gutterBottom pb={matches ? null : 6} sx={{ fontWeight: 'bold',letterSpacing: '0.05em'}}>
            {discount}
          </MKTypography>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the RotatingCardFront
RotatingCardFront.defaultProps = {
  color: "info",
  icon: "",
};

// Typechecking props for the RotatingCardFront
RotatingCardFront.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  customColor: PropTypes.string,
};

export default RotatingCardFront;
