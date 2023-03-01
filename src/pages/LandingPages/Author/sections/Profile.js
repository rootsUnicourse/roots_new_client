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
import { useState, useEffect } from "react";
import RootsTable from './OffspringTable';

function Profile({ user }) {

  const [offspring, setOffpring] = useState(false);
  const [childrens, setChildrens] = useState(false);
  const [grandChildren, setGrandChildren] = useState(false);
  const [offspringFetched, setOffspringFetched] = useState(false);

  const getOffspring = async () => {
    const {data} = await api.getChildren(user.result.email);
    setOffspringFetched(true);
    setOffpring(data);
  }

  const filterOffpring = async () => {
    const childrenFiltered = offspring.filter(child => child.parantId == user.result.email);
    setChildrens(childrenFiltered);
    const grandChildrenFiltered = offspring.filter(child => child.parantId != user.result.email);
    setGrandChildren(grandChildrenFiltered);
  }

  useEffect(() => {
    if(!offspringFetched){
          getOffspring();
          
        }
    if(offspringFetched){
      filterOffpring();
    }
  },[offspring]);
  
  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <MKBox mb={5} mt={-7} textAlign="center" >
            <MKTypography variant="h3" >
              Your Tree
            </MKTypography>
        </MKBox>
        <MKBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            {user ? <UserCoin avatarSrc={user.result.imageUrl} avaterName={user.result.name} moneyEarned="$1000" /> : null}
            </Grid>
            <Grid item xs={6}>
            {childrens[0]? <UserCoin avatarSrc={childrens[0].imageUrl ? childrens[0].imageUrl : accountSVG } avaterName={childrens[0].name}  moneyEarned="$2000" /> : null}
            </Grid>
            <Grid item xs={6}>
            {childrens[1] ? <UserCoin avatarSrc={childrens[1].imageUrl ? childrens[1].imageUrl : accountSVG} avaterName={childrens[1].name} moneyEarned="$3000" /> : null}
            </Grid>
            <Grid item xs={3}>
              {grandChildren[0] ? <UserCoin avatarSrc={grandChildren[0].imageUrl? grandChildren[0].imageUrl : accountSVG} avaterName={grandChildren[0].name} moneyEarned="$4000" /> : null}
            </Grid>
            <Grid item xs={3}>
              {grandChildren[2] ? <UserCoin avatarSrc={grandChildren[2].imageUrl ? grandChildren[2].imageUrl : accountSVG} avaterName={grandChildren[2].name} moneyEarned="$5000" /> : null}
            </Grid>
            <Grid item xs={3}>
              {grandChildren[1] ? <UserCoin avatarSrc={grandChildren[1].imageUrl ? grandChildren[1].imageUrl : accountSVG} avaterName={grandChildren[1].name} moneyEarned="$6000" /> : null}
            </Grid>
            <Grid item xs={3}>
              {grandChildren[3] ? <UserCoin avatarSrc={grandChildren[3].imageUrl ? grandChildren[3].imageUrl : accountSVG} avaterName={grandChildren[4].name} moneyEarned="$7000" /> : null}
            </Grid>
          </Grid>
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
