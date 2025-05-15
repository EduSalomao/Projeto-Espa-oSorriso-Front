import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar/Sidebar";

import {
  Container,
  Main,
  UserArea,
  Header,
  BodyArea,
  SidebarArea,
  HeaderArea
} from "./MainLayout.style";
import {
  FaBell,
} from "react-icons/fa";
import { useNavigate, Outlet } from "react-router-dom";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  return (
    <Container>
        <HeaderArea>
            <Header>
                <img onClick={() => navigate("/")} src="/src/assets/logo.png" alt="Espaço Teste" style={{cursor: "pointer"}}/>
                <UserArea>
                    <FaBell />
                    <span>Usuário ▼</span>
                </UserArea>
            </Header>
        </HeaderArea>
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
