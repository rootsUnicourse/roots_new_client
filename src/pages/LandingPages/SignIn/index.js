
import { useState } from "react";
import * as api from '../../../api/index'
import { Link as RouterLink }  from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import { Link } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Checkbox from '@mui/material/Checkbox';
import Pdf from "./privacy.pdf";
import bgImage from "assets/images/rootz5.png";
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signin ,signup, googleLogin } from '../../../actions/auth'
import {GoogleLogin} from 'react-google-login'
import Icon from './Icon'
import routes from "routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";





function SignInBasic() {
  const queryParams = new URLSearchParams(window.location.search);
  const encodedEmail = queryParams.get('email');
  const email = window.atob(encodedEmail);
  const [isChecked, setIsChecked] = useState(false);
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '',parentId: email, imageUrl: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const label = user ? "Log Out" : "Sign In"
  const route = user ? "/" : "/pages/authentication/sign-in"


  const logout = () => {
      dispatch({ type: 'LOGOUT' })
      navigate('/')
      setUser(null)
  }

  const error = useSelector(state => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup){
        dispatch(signup(formData, navigate))
    }else {
        dispatch(signin(formData, navigate))
    }
  }

  const handleCheckbox = async(e) => {
    const {data} = await api.checkBox({isChecked: e.target.checked});
    setIsChecked(data.status);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    const googleData = {result: result, token: token, parentId : formData.parentId}
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

const handleGoogleClick = (renderProps) => {
  if (isSignup && !isChecked) {
      alert('Please agree to the terms first.');
      return;
  }
  renderProps.onClick();
}




  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DefaultNavbar
          routes={routes}
          action={{
          type: "internal",
          route: route,
          label: label,
          color: "info",
          }}
          
          handleLogout = {logout}
          user = {user}
      />
      <div style={{ height: isSignup ? '150px' : '40px' }}></div>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="136vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.1)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%" >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                sx={{backgroundColor: "#02D2A0"}}
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" sx={{color: "#1C1F4D"}} mt={1} >
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
                  <MKBox mb={2} >
                    <MKInput name="email" type="email" label="Email" fullWidth onChange={handleChange} error={error == "User doesn't exist." ? true : false} helperText={error == "User doesn't exist." ? error : null}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput name="password" type="password" label="Password" fullWidth onChange={handleChange} error={error == "Invalid credentials. please try again" ? true : false} helperText={error == "Invalid credentials. please try again" ? error : null}/>
                  </MKBox>
                  
                  { isSignup && 
                  <MKBox mb={2}> 
                    <MKInput name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" fullWidth/>
                  </MKBox>}
                  
                  {!isSignup && <MKBox>
                    <MKTypography variant="body2" style={{color: "#02D2A0"}}>
                      <RouterLink style={{color: "#1C1F4D"}} to="/forgotpassword">Forgot your password?</RouterLink>
                    </MKTypography>
                  </MKBox> }

                  {isSignup && <MKBox textAlign="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ReCAPTCHA sitekey="6LeGpwgoAAAAAPK8GiZ7AHRFOB5HEeHm49sv-G0r" />
                  </MKBox>}

                  {isSignup && <MKBox style={{ display: 'flex' }}>
                    <Checkbox onChange={handleCheckbox} style={{ marginTop: '14px', color: "#02D2A0" }}/>
                    <a 
                      href={Pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ marginTop: '20px', textDecoration: 'none', color: '#02D2A0', fontSize: '16px' }}
                    >
                      I Agree To The Terms And Conditions 
                    </a>
                  </MKBox>}

                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" style={{backgroundColor: "#02D2A0", color: "#1C1F4D"}} fullWidth onClick={handleSubmit} disabled = {(!isChecked && isSignup)}>
                      {isSignup ? 'Sign up' : 'Sign In'}
                    </MKButton>
                  </MKBox>

                  <MKBox mt={4} mb={1}>
                    <Grid align="center" justify="center">
                      <GoogleLogin
                          clientId="299163078742-7udqvrad5p2pc66g2im7q7bknb4pf6gh.apps.googleusercontent.com"
                          render={(renderProps) => (
                              <MKButton onClick={() => handleGoogleClick(renderProps)} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained" >
                                  Google Sign in
                              </MKButton>
                          )}
                          onSuccess={googleSuccess}
                          onFailure={googleFailure}
                          cookiePolicy="single_host_origin"
                      />
                    </Grid>
                  </MKBox>

                  <LoginSocialFacebook
                    appId="347530817682916"
                    onResolve={(response) => {
                      console.log(response);
                    }}
                    onReject={(error) => {
                      console.log(error);
                    }}
                  >
                    <FacebookLoginButton />
                  </LoginSocialFacebook>          

                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKButton
                      fontWeight="medium"
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
      {/* <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox> */}
    </div>
  );
}

export default SignInBasic;
