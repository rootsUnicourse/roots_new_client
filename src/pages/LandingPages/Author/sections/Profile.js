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

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { makeStyles } from '@material-ui/core/styles';


// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import accountSVG from '../../../../assets/svg/account.svg';
// Images
import profilePicture from "assets/images/roots.webp";
import UserCoin from "./UserCoin";
import * as api from '../../../../api/index'
import { useState, useEffect, useRef  } from "react";
import RootsTable from './OffspringTable';
import CircleAvatars from '../../../../components/CircleAvatars/CircleAvatars'
import './styles.css';
import SouthIcon from '@mui/icons-material/South';
import { Box } from "@mui/system";



function Profile({ user }) {

  const useStyles = makeStyles(theme => ({
    wrapIcon: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
  }
  }));

  const startRef = useRef(null);
  const endRef = useRef(null);
  const classes = useStyles();

  const [offspring, setOffpring] = useState(false);
  const [childrens, setChildrens] = useState(false);
  const [grandChildren, setGrandChildren] = useState(false);
  const [offspringFetched, setOffspringFetched] = useState(false);
  const [numOfChildrens, setNumOfChildrens] = useState(false);
  const [gridSize, setGridSize] = useState(false);

  const getOffspring = async () => {
    const {data} = await api.getChildren(user.result.email);
    setOffspringFetched(true);
    setOffpring(data);
  }

  const filterOffpring = async () => {
    const childrenFiltered = offspring.filter(child => child.parantId == user.result.email);
    setNumOfChildrens(childrenFiltered.length);
    setChildrens(childrenFiltered);
    const grandChildrenFiltered = offspring.filter(child => child.parantId != user.result.email);
    setGrandChildren(grandChildrenFiltered);
  }

  const createGridSize = () =>{
    if(numOfChildrens == 1){
      setGridSize(12)
    }
    else if (numOfChildrens == 2){
      setGridSize(6)
    }
    else if (numOfChildrens == 3){
      setGridSize(4)
    }
    else if (numOfChildrens == 4){
      setGridSize(3)
    }
    else if (numOfChildrens == 5){
      setGridSize(2.4)
    }
  }

  useEffect(() => {
    if(!offspringFetched){
          getOffspring();
          
        }
    if(offspringFetched){
      filterOffpring();
    }
  },[offspring]);

  useEffect(() => {
    createGridSize();
  }, [numOfChildrens])
  
  
  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <MKBox mb={5} mt={-7} textAlign="center" >
            <MKTypography variant="h3" >
              Your Roots
            </MKTypography>
        </MKBox>
        <MKBox>

          <Grid container spacing={3}>
            <Grid item xs={12} >
              {user ? <UserCoin avatarSrc={user.result.imageUrl} avaterName={user.result.name} moneyEarned="$0" kind="dad"/> : null}
              <MKBox  style={{ textAlign: 'center' }} mt={2} >
                {user ? <SouthIcon style={{ transform: 'scale(2)' }}/> : null}
              </MKBox>
            </Grid>
            
            <Grid item xs={12}>
              <MKBox textAlign="center">
                <MKTypography variant="h4">
                    Childrens
                </MKTypography>
              </MKBox>
            </Grid>

            <Grid container item xs={gridSize ? gridSize : 0}>
              <Grid item xs={12}>
                {childrens[0]? <UserCoin avatarSrc={childrens[0].imageUrl ? childrens[0].imageUrl : accountSVG } avaterName={childrens[0].name}  moneyEarned="$2000" kind="chil"/> : null}
              </Grid>
              <Grid item xs={12}>
                {childrens[0] && grandChildren ?  <CircleAvatars users={grandChildren ? grandChildren : null} parantEmail={childrens[0].email}/> : null}
              </Grid>
            </Grid>

            <Grid container item xs={gridSize ? gridSize : 0}>
              <Grid item xs={12}>
                {childrens[1] ? <UserCoin avatarSrc={childrens[1].imageUrl ? childrens[1].imageUrl : accountSVG} avaterName={childrens[1].name} moneyEarned="$3000" kind="chil"/> : null}
              </Grid>
              <Grid item xs={12}>
                {/* <MKBox  style={{ textAlign: 'center' }} mt={2} mr={3}>
                {childrens[1] && grandChildren ? <SouthIcon style={{ transform: 'scale(1.5)' }}/> :null}
                </MKBox> */}
                {childrens[1] && grandChildren ?  <CircleAvatars users={grandChildren ? grandChildren : null} parantEmail={childrens[1].email}/> : null}
              </Grid>
            </Grid>

            <Grid container item xs={gridSize ? gridSize : 0}>
              <Grid item xs={12}>
              {childrens[2] ? <UserCoin avatarSrc={childrens[2].imageUrl ? childrens[2].imageUrl : accountSVG} avaterName={childrens[2].name} moneyEarned="$3000" kind="chil"/> : null}
              </Grid>
              <Grid item xs={12}>
                {/* <MKBox  style={{ textAlign: 'center' }} mt={2} mr={3}>
                {childrens[2] ? <SouthIcon style={{ transform: 'scale(1.5)' }}/> :null}
                </MKBox> */}
                {childrens[2] ?  <CircleAvatars users={grandChildren ? grandChildren : null} parantEmail={childrens[2].email}/> : null}
              </Grid>
            </Grid>
            
            <Grid container item xs={gridSize ? gridSize : 0}>
              <Grid item xs={12}>
              {childrens[3] ? <UserCoin avatarSrc={childrens[3].imageUrl ? childrens[3].imageUrl : accountSVG} avaterName={childrens[3].name} moneyEarned="$3000" kind="chil"/> : null}
              </Grid>
              <Grid item xs={12}>
                {/* <MKBox  style={{ textAlign: 'center' }} mt={2} mr={3}>
                {childrens[3] ? <SouthIcon style={{ transform: 'scale(1.5)' }}/> :null}
                </MKBox> */}
                {childrens[3] ?  <CircleAvatars users={grandChildren ? grandChildren : null} parantEmail={childrens[3].email}/> : null}
              </Grid>
            </Grid>
            <Grid container item xs={gridSize ? gridSize : 0}>
              <Grid item xs={12}>
              {childrens[4] ? <UserCoin avatarSrc={childrens[4].imageUrl ? childrens[4].imageUrl : accountSVG} avaterName={childrens[4].name} moneyEarned="$3000" kind="chil"/> : null}
              </Grid>
              <Grid item xs={12}>
                {/* <MKBox  style={{ textAlign: 'center' }} mt={2} mr={3}>
                {(childrens[4] && grandChildren) ? <SouthIcon style={{ transform: 'scale(1.5)' }}/> :null}
                </MKBox> */}
                {(childrens[4] && grandChildren) ?  <CircleAvatars users={grandChildren ? grandChildren : null} parantEmail={childrens[4].email}/> : null}
              </Grid>
            </Grid>

          </Grid> {/* big grid */}
          
        </MKBox>
      </Container>
      <hr style={{ marginTop: "100px" }}/>
      <MKBox mb={5} mt={15} textAlign="center">
          <RootsTable data={offspring ? offspring : null} user={user}/>
      </MKBox>
    </MKBox>
  );
}

export default Profile;
