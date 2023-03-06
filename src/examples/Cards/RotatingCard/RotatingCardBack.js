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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import MuiLink from "@mui/material/Link";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import {useState} from 'react';



function RotatingCard({ color, image, title, description, action, url }) {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function Popup() {
    return (
        <div className="popup">
            <p>sorry, you need to login first</p>
            <button onClick={() => setIsPopupOpen(false)}>close</button>
        </div>
    );
  }

  const popUp = () => {
    if (url == null) {
      setIsPopupOpen(true);
    }
    else{
      setIsPopupOpen(false);
    }
  }
  // console.log('url:', url)
  return (
    <MKBox
      height={350}
      width={300}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      coloredShadow={color}
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      zIndex={5}
      sx={{
        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.45),
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.45)
          )}, url(${image})`,
        // backgroundImage: `url(${image})`,
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        margin: "auto",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backfaceVisibility: "hidden"
      }}
    >
      <MKBox pt={5} pb={2} px={2} textAlign="center" lineHeight={1}>
        <MKBox>
          <MKTypography variant="h3" color="white" gutterBottom>
            {title}
          </MKTypography>
        </MKBox>
        <MKBox>
          <MKTypography variant="body1" color="white" sx={{ fontWeight: 'bold' }}>
            {description}
          </MKTypography>
        </MKBox>
        <MKBox>
          {action && (
            <MKBox width="50%" mt={4} mb={2} mx="auto">
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
                <MKButton component={Link} to={url} color="white" size="small" fullWidth onClick={popUp}>
                  {action.label}
                </MKButton>
              )}
          </MKBox>
        )}
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the RotatingCard
RotatingCard.defaultProps = {
  color: "info",
};

// Typechecking props for the RotatingCard
RotatingCard.propTypes = {
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
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default RotatingCard;
