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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#A9907E",
        color: "#fff",
        borderRadius: "25px",
        padding: "10px 20px",
        textTransform: "none",
        margin: theme.spacing(1),
        "&:hover": {
        color: "#fff",
        backgroundColor: "#ABC4AA",
        },
    },
    selectedButton: {
        backgroundColor: "#ABC4AA",
        color: "#fff",
        "&:hover": {
        color: "#fff",
        backgroundColor: "#ABC4AA",
        },
    },
}));


function RotatingCard({ color, image, title, description, action, url, customColor }) {

  const classes = useStyles();
  

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
            rgba(customColor || (gradients[color] ? gradients[color].main : gradients.info.main), 0.25),
            rgba(customColor || (gradients[color] ? gradients[color].main : gradients.info.main), 0.25),
          )}, url(${image})`,
        // backgroundImage: `url(${image})`,
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        margin: "auto",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <MKBox pt={5} pb={2} px={2} textAlign="center" >
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
            <MKBox  mt={4} mb={2} mx="auto">
              {action.type === "external" ? (
                <MKButton
                  component={MuiLink}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.button}
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {action.label}
                </MKButton>
              ) : (
                <MKButton className={classes.button} component={Link} to={url} sx={{whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden',}}>
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
  customColor: PropTypes.string,
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
