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


// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import accountSVG from '../../../../assets/svg/account.svg';
// Images
import UserCoin from "./UserCoin";
import * as api from '../../../../api/index'
import { useState, useEffect } from "react";
import RootsTable from './OffspringTable';
// import CircleAvatars from '../../../../components/CircleAvatars/CircleAvatars'
import './styles.css';
// import SouthIcon from '@mui/icons-material/South';
import BigLink from "components/BigLinkText/BigLinkText";
import * as go from "gojs";
import UserDetailsPopup from '../../../../components/UserDetailsPopup/UserDetailsPopup';





function Profile({ user }) {


  const [offspring, setOffpring] = useState(false);
  // const [childrens, setChildrens] = useState(false);
  // const [grandChildren, setGrandChildren] = useState(false);
  const [offspringFetched, setOffspringFetched] = useState(false);
  // const [numOfChildrens, setNumOfChildrens] = useState(false);
  // const [gridSize, setGridSize] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});


  const getOffspring = async () => {
    const {data} = await api.getAllDescendants(user.result.email);
    setOffspringFetched(true);
    setOffpring(data);
  }
  

  // const filterOffpring = async () => {
  //   const childrenFiltered = offspring.filter(child => child.parantId == user.result.email);
  //   // setNumOfChildrens(childrenFiltered.length);
  //   setChildrens(childrenFiltered);
  //   const grandChildrenFiltered = offspring.filter(child => child.parantId != user.result.email);
  //   setGrandChildren(grandChildrenFiltered);
  // }

  // const createGridSize = () =>{
  //   if(numOfChildrens == 1){
  //     setGridSize(12)
  //   }
  //   else if (numOfChildrens == 2){
  //     setGridSize(6)
  //   }
  //   else if (numOfChildrens == 3){
  //     setGridSize(4)
  //   }
  //   else if (numOfChildrens == 4){
  //     setGridSize(3)
  //   }
  //   else if (numOfChildrens == 5){
  //     setGridSize(2.4)
  //   }
  // }

  useEffect(() => {
    if(!offspringFetched){
          getOffspring();
          
        }
    // if(offspringFetched){
    //   filterOffpring();
    // }
  },[offspring]);

  // useEffect(() => {
  //   createGridSize();
  // }, [numOfChildrens])

  function initDiagram() {
    const $ = go.GraphObject.make;
  
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 }),
      initialContentAlignment: go.Spot.Center, 
      initialScale: 0.9,
    });
  
    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        selectionAdornmentTemplate: $(
          go.Adornment,
          "Auto",
          $(go.Shape, "Circle", {
            fill: null,
            stroke: "#675D50",
            strokeWidth: 4,
          },
          new go.Binding("width", "", function(_, target) {
            const node = target.part.adornedPart;
            if (node) {
              return node.actualBounds.width; // Add some padding to the width
            }
            return 0;
          }).ofObject(),
          new go.Binding("height", "", function(_, target) {
            const node = target.part.adornedPart;
            if (node) {
              return node.actualBounds.height; // Add some padding to the height
            }
            return 0;
          }).ofObject()
          ),
          $(go.Placeholder)
        ),
        click: (e, obj) => {
          const userData = obj.data;
          setSelectedUser(userData);
          setPopupOpen(true);
        },
      },
      $(
        go.Shape,
        "Circle",
        {
          fill: "#ABC4AA",
          strokeWidth: 2,
          stroke: "#555",
        }
      ),
      $(
        go.Panel,
        "Table",
        {
          margin: new go.Margin(0, 0, 0, 0),
          alignment: go.Spot.Center,
        },
        $(
          go.Picture,
          { width: 50, height: 50, background: "transparent" },
          new go.Binding("source")
        ),
        $(
          go.TextBlock,
          "Default Text",
          { row: 1, font: "bold 16px sans-serif" },
          new go.Binding("text", "name")
        )
      )
    );
  
    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      $(go.Shape, { strokeWidth: 3, stroke: "#555" })
    );
  
    return diagram;
  }
  
  
  
  
  
  
  function generateModel(user, offspring) {
    const nodeDataArray = [
      { key: user.result.email, name: user.result.name, source: user.result.imageUrl },
    ];
  
    const linkDataArray = [];
  
    const addDescendants = (parentId) => {
      if (Array.isArray(offspring)) {
        offspring.forEach((descendant) => {
          if (descendant.parantId === parentId) {
            nodeDataArray.push({
              key: descendant.email,
              name: descendant.name,
              source: descendant.imageUrl ? descendant.imageUrl : accountSVG,
            });
    
            linkDataArray.push({ from: parentId, to: descendant.email });
    
            addDescendants(descendant.email);
          }
        });
      } else {
        console.error("offspring is not an array:", offspring);
      }
    };
    
  
    addDescendants(user.result.email);
  
    return new go.GraphLinksModel(nodeDataArray, linkDataArray);
  }
  
  

  useEffect(() => {
    if (offspringFetched) {
      const diagram = initDiagram();
      diagram.model = generateModel(user, offspring);
      diagram.div = document.getElementById("gojs-diagram");
    }
  }, [offspringFetched, offspring]);
  
  
  
  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <MKBox>
          <Grid container spacing={3}>
              <Grid item xs={12} >
                {user ? <UserCoin avatarSrc={user.result.imageUrl} avaterName={user.result.name} moneyEarned="$0" kind="dad"/> : null}
              </Grid>
            </Grid>
          {offspring ? (<MKBox  textAlign="center" >
            <MKTypography variant="h3" >
                Your Roots
            </MKTypography>
            <Container id="gojs-diagram" className="gojs-diagram" style={{ width: "100vw", height: "800px" }} />
          </MKBox>) : null}
        </MKBox>
          {offspring ? <hr style={{ marginTop: "100px" }}/> : null}
          <MKBox mb={5} mt={offspring ? 15 : null} textAlign="center">
              {offspring ? <RootsTable data={offspring ? offspring : null} user={user}/> : <BigLink/>}
          </MKBox>
          <UserDetailsPopup
            open={popupOpen}
            handleClose={() => setPopupOpen(false)}
            avatarSrc={selectedUser.source}
            avaterName={selectedUser.name}
            moneyEarned={selectedUser.moneyEarned}
            lastActivity={selectedUser.lastActivity}
            registeredFrom={selectedUser.registeredFrom}
        />
      </Container>
      
    </MKBox>
  );
}

export default Profile;
