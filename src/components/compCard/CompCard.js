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


function CompCard({ color, image, icon, title, description, action, url }) {

  const getTextFontSize = (title) => {
    const containerWidth = 60; // Change this to the actual width of the container
    const textWidth = getTextWidth(title);
    const scaleFactor = containerWidth / textWidth;
    const maxFontSize = 32;
    const minFontSize = 10;
    const fontSize = Math.min(maxFontSize, Math.max(minFontSize, scaleFactor * maxFontSize));
    return `${fontSize}px`;
  };

  const getTextWidth = (title) => {
    const span = document.createElement("span");
    span.style.fontSize = "32px"; // Change this to the maximum font size
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.textContent = title;
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return width;
  };

  return (
    <MKBox
      height={140}
      width={100}
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
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          
      }}
    >
      <MKBox py={4}  textAlign="center">
        <MKBox>
          <MKTypography style={{ fontSize: getTextFontSize(title), lineHeight: 1, whiteSpace: 'nowrap',marginBottom:'15px' }} color="dark" >
            {title}
          </MKTypography>
        </MKBox>
        <MKBox>
          {icon && (
            <MKTypography variant="h4" color="dark">
              {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
            </MKTypography>
          )}
        </MKBox>
        <MKBox>
          <MKTypography className="glow" variant="h6" color="dark">
            {description}
          </MKTypography>
        </MKBox>
        
      {action && (
          <MKBox  mx="auto">
            {action.type === "external" ? (
              <MKButton
                height={25}
                component={MuiLink}
                href={url}
                target="_blank"
                rel="noreferrer"
                color="dark"
                size="small"
                fullWidth
              >
                {action.label}
              </MKButton>
            ) : (
              <MKButton component={Link} to={url} color="dark" size="large" fullWidth >
                {action.label}
              </MKButton>
            )}
          </MKBox>
        )}
      </MKBox>
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
