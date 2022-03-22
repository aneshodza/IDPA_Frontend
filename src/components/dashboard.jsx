import { Dashboard as Dashboardicon, Person } from "@mui/icons-material";
import { Container, Paper, Tab, Tabs, Box } from "@mui/material";
import { useState } from "react";
import "../styles/dashboard.css"
import Game from "./game";

export default function Dashboard(){
    const [tab, setTab] = useState("dashboard")
    return(
        <>
            {window.innerWidth > 600?<NonMobileLayout tab={tab} setTab={setTab}/>:"mobile"}
            <Container className="colorContainer" maxWidth="lg">
                <Game />
            </Container>
        </>
    )
}

function NonMobileLayout(props){
    return(
        <Container maxWidth="lg">
            <Tabs value={props.tab} onChange={(e, newVal) => props.setTab(newVal)}>
                <Tab value="dashboard" label="Dashboard" icon={<Dashboardicon />}/>
                <Tab value="account"  label="Account" icon={<Person />}/>
            </Tabs>
            </Container>
        
    )
}