import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar/Sidebar";

import {
  Container,
  Main,
  UserArea,
  Header,
  BodyArea,
  SidebarArea
} from "./MainLayout.style";
import {
  FaBell,
} from "react-icons/fa";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  return (
    <Container>
        <Header>
            <img src="src/assets/logo.png" alt="Espaço Sorriso" />
            <UserArea>
                <FaBell />
                <span>Usuário ▼</span>
            </UserArea>
        </Header>
        <BodyArea>
            <SidebarArea
                collapsed={collapsed}
                animate={{ width: collapsed ? 80 : 230 }}
                transition={{ duration: 0.3 }}
                >
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} setActiveSection={setActiveSection}/>
            </SidebarArea>

            <Main>
                <Outlet />
            </Main>


        </BodyArea>
        
    </Container>
  );
}
