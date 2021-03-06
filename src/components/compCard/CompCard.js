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
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import MuiLink from "@mui/material/Link";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

import MKButton from "components/MKButton";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import './comp.css'
import {useStyles} from './styles'

function CompCard({ color, image, icon, title, description, action, url }) {



  return (
    <MKBox
      display="grid"
      justifyContent="center"
      alignContent="center"
      borderRadius="lg"
      coloredShadow={color}
      width="100%"
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.45),
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.45)
          )}, url(${image})`,
          backfaceVisibility: "hidden",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "initial"
      }}
    >
      <MKBox py={4} textAlign="center">
        <MKTypography variant="h2" color="white" >
          {title}
        </MKTypography>
        {icon && (
          <MKTypography variant="h2" color="white">
            {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
          </MKTypography>
        )}
        <MKTypography className="glow" variant="h3" color="white">
          {description}
        </MKTypography>
        
      </MKBox>
      {action && (
          <MKBox fullWidth mx="auto">
            {action.type === "external" ? (
              <MKButton
                component={MuiLink}
                href={url}
                target="_blank"
                rel="noreferrer"
                color="white"
                size="small"
                fullWidth
              >
                {action.label}
              </MKButton>
            ) : (
              <MKButton component={Link} to={url} color="white" size="large" fullWidth >
                {action.label}
              </MKButton>
            )}
          </MKBox>
        )}
    </MKBox>
  );
}

// Setting default props for the CompCard
CompCard.defaultProps = {
  color: "info",
  icon: "",
};

// Typechecking props for the CompCard
CompCard.propTypes = {
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
  description: PropTypes.node.isRequired,
};

export default CompCard;
