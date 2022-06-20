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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";


import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin ,signup, googleLogin } from '../../../actions/auth'
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'



function SignInBasic() {
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get('email');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '',parantId: email, imageUrl: ''})
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    if(isSignup){
        console.log(formData)
        dispatch(signup(formData, navigate))
    }else {
        console.log(formData)
        dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const googleSuccess = async (res) => {
    // console.log(process.env.BASE_IMAGE)
    const result = res?.profileObj
    const token = res?.tokenId
    // console.log(result)
    const googleData = {result: result, token: token, parantId : formData.parantId}
    // console.log(googleData)
    try {
        dispatch(googleLogin(googleData, navigate))
    } catch (error) {
        console.log(error)
    }
}

const googleFailure = (err) => {
    console.log("Google Sign In was unsuccessful. Try Again Later")
    console.log(err)
}

  return (
    <>
      <DefaultNavbar
        routes={routes}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  { isSignup && (
                    <>
                      <MKBox mb={2}>
                        <MKInput name="firstName" label="First Name" onChange={handleChange} autoFocus fullWidth/>
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput name="lastName" label="Last Name" onChange={handleChange} fullWidth/>
                      </MKBox>
                    </>
                  )}
                  <MKBox mb={2}>
                    <MKInput name="email" type="email" label="Email" fullWidth onChange={handleChange}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput name="password" type="password" label="Password" fullWidth onChange={handleChange}/>
                  </MKBox>
                  { isSignup && 
                  <MKBox mb={2}> 
                    <MKInput name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" fullWidth/>
                  </MKBox>}
                  {/* <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox> */}
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                      {isSignup ? 'Sign up' : 'Sign In'}
                    </MKButton>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" fullWidth>
                    <GoogleLogin
                                clientId="299163078742-7udqvrad5p2pc66g2im7q7bknb4pf6gh.apps.googleusercontent.com"
                                render={(renderProps)=>(
                                    <MKButton onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">Google Sign in</MKButton>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                          />
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKButton
                      fontWeight="medium"
                      textGradient
                      onClick={switchMode}
                    >
                      {isSignup ? 'Alredy have an account? Sign In' : "Don't have an account? Sign Up!"}
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
