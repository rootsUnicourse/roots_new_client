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
import CircularProgress from "@mui/material/CircularProgress";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MKAvatar from "components/MKAvatar";





function Profile({ user }) {

  const [offspring, setOffpring] = useState([]);
  const [offspringFetched, setOffspringFetched] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  async function fetchUserByEmail(email) {
    const user = await api.getUserByEmail(email);
    return user;
  }


  const getOffspring = async () => {
    const {data} = await api.getAllDescendants(user.result.email);
    setOffspringFetched(true);
    setOffpring(data);
  }
  

  useEffect(() => {
    if(!offspringFetched){
          getOffspring();
        }
  },[offspring]);


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
          if(!(userData.key == user.result.email)){
            setSelectedUser(userData);
            setPopupOpen(true);
          }
        },
      },
      $(
        go.Shape,
        "Circle",
        {
          fill: "#FFFFFF",
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
  
  
  
  
  
  
  async function generateModel(user, offspring) {
    const nodeDataArray = [
        { key: user.result.email, name: user.result.name, source: user.result.imageUrl },
    ];

    const linkDataArray = [];

    const addDescendants = async (parentId) => {
        if (Array.isArray(offspring)) {
            const descendants = offspring.filter(descendant => descendant.parentId === parentId);

            for (let descendant of descendants) {
                const parentUser = await fetchUserByEmail(parentId);
                let moneyEarnedFromOffspring = 0;

                if (parentUser) {
                    const earningRecord = parentUser.data.descendantsEarnings.find(record => record.descendant === descendant._id);
                    if (earningRecord) {
                        moneyEarnedFromOffspring = earningRecord.earnings;
                    }
                }

                nodeDataArray.push({
                    key: descendant.email,
                    name: descendant.name,
                    source: descendant.imageUrl ? descendant.imageUrl : accountSVG,
                    createdAt: descendant.createdAt ? descendant.createdAt.split('T')[0] : null,
                    lastActivity: descendant.lastActivity? descendant.lastActivity.split('T')[0] : null,
                    moneyEarnedFromOffspring: moneyEarnedFromOffspring,
                    email: descendant.email
                });

                linkDataArray.push({ from: parentId, to: descendant.email });

                await addDescendants(descendant.email);
            }
        } else {
            console.error("offspring is not an array:", offspring);
        }
    }

    await addDescendants(user.result.email);

    return new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

  

  useEffect(() => {
    if (offspringFetched) {
      const diagram = initDiagram();
      generateModel(user, offspring).then((model) => {
        diagram.model = model;
        diagram.div = document.getElementById("gojs-diagram");
      });
    }
  }, [offspringFetched, offspring]);


  const UserTreeView = ({ user, offspring, theKey, topFatherEmail }) => {
    const childUsers = offspring.filter((item) => item.parentId === theKey);
  
    const [open, setOpen] = useState(false);
  
    const handleMouseDown = (event) => {
      // Check if the click came from the avatar
      if (event.target.closest('.avatar')) {
        event.stopPropagation(); // Stop event propagation
        if (theKey !== topFatherEmail) {
          setOpen(true);
        }
      }
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <TreeItem nodeId={theKey} label={
        <Grid container alignItems="center">
          <Grid item>
            <MKAvatar 
              className="avatar" // Added className to the avatar
              alt={user.name} 
              src={user.imageUrl}
              style={{ marginRight: "10px", width: "75px", height: "75px" }}
            />
          </Grid>
          <Grid item>
            {user.name}
          </Grid>
        </Grid>
      }
       onMouseDown={handleMouseDown}> {/* Use onMouseDown event here */}
        {childUsers.map((childUser) => {
          const earningsRecord = user.descendantsEarnings.find(record => record.descendant === childUser._id);
          const earningsFromChild = earningsRecord ? earningsRecord.earnings : 0;
  
          return (
            <UserTreeView 
              key={childUser.email} 
              theKey={childUser.email} 
              user={{...childUser, earningsFromFather: earningsFromChild}} 
              offspring={offspring} 
              topFatherEmail={topFatherEmail}
            />
          );
        })}
        <UserDetailsPopup
          open={open}
          handleClose={handleClose}
          avatarSrc={user.imageUrl}
          avaterName={user.name}
          moneyEarned={user.earningsFromFather}
          lastActivity={user.lastActivity ? user.lastActivity.split('T')[0] : null}
          createdAt={user.createdAt ? user.createdAt.split('T')[0] : null}
          email={user.email}
        />
      </TreeItem>
    );
  };
  

 
  
  return (
    <MKBox component="section" >
      <Container>
        <MKBox>
          <Grid container spacing={3}>
              <Grid item xs={12} >
                {user ? <UserCoin avatarSrc={user.result.imageUrl} avaterName={user.result.name} moneyEarned={user.result.moneyEarned} moneyWaiting={user.result.moneyWaiting} moneyApproved={user.result.moneyApproved} cashWithdrawn={user.result.cashWithdrawn} lastActivity={user.result.lastActivity} registeredFrom={user.result.createdAt} kind="dad"/> : null}
              </Grid>
            </Grid>
          {offspring ? (<MKBox  textAlign="center" >
            <MKTypography variant="h3" sx={{marginTop: "-50px"}}>
                Your Rootz
            </MKTypography>
          {/* {offspringFetched ? 
            <Container id="gojs-diagram" className="gojs-diagram" style={{ width: "100vw", height: "800px" }} /> 
              : 
            <CircularProgress />
          } */}
          </MKBox>) : null}
        </MKBox>
          {offspringFetched ?
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx= {{ marginTop: "50px" }}
            >
              <UserTreeView topFatherEmail={user.result.email} theKey={user.result.email} user={{name: user.result.name, imageUrl: user.result.imageUrl, descendantsEarnings: user.result.descendantsEarnings }} offspring={offspring} />
            </TreeView>
            : 
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh', 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              marginTop: "90px"
            }}>
              <CircularProgress />
            </div>
            
          }
          {offspring ? <hr style={{ marginTop: "100px" }}/> : null}
          <MKBox mb={5} mt={offspring ? 15 : null} textAlign="center">
              {offspring ? <RootsTable data={offspring ? offspring : null} user={user}/> : <BigLink/>}
          </MKBox>
          <hr style={{ marginTop: "100px" }}/>
          <UserDetailsPopup
            open={popupOpen}
            handleClose={() => setPopupOpen(false)}
            avatarSrc={selectedUser.source}
            avaterName={selectedUser.name}
            moneyEarned={selectedUser.moneyEarnedFromOffspring}
            lastActivity={selectedUser.lastActivity}
            createdAt={selectedUser.createdAt}
            email={selectedUser.email}
        />
      </Container>
    </MKBox>
  );
}

export default Profile;
