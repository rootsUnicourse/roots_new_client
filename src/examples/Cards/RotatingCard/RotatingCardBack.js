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
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#F1F1F1",
        color: "#3B3A3B",
        borderRadius: "25px",
        padding: "10px 20px",
        textTransform: "none",
        margin: theme.spacing(1),
        "&:hover": {
        color: "#3B3A3B",
        backgroundColor: "#53AD57",
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


function RotatingCard({ color, image, title, description, action, url }) {

  const classes = useStyles();
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <MKBox
      height={matchesXS ? 50 : 350}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      coloredShadow={color}
      position="absolute"
      
      top={0}
      left={0}
      zIndex={5}
      sx={{
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
        {image && (
          <MKBox mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src={image} alt="company logo" style={{ width: '130px', height: '50px' }}/>
          </MKBox>
        )}
        <MKBox>
          <MKTypography variant="body1" color="dark" sx={{ fontWeight: 'bold',lineHeight: '1.5',letterSpacing: '0.05em', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: "13px" }}>
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
