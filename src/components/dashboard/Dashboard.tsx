import { useState } from "react";
import { motion } from "framer-motion";
import SidebarContent from "./SidebarContent";
import {
  Container,
  Main,
  UserArea,
  Header,
  BodyArea,
  Sidebar
} from "./Dashboard.style";
import {
  FaBell,
} from "react-icons/fa";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

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
            <Sidebar
                collapsed={collapsed}
                animate={{ width: collapsed ? 80 : 230 }}
                transition={{ duration: 0.3 }}
                >
                <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
            </Sidebar>

            <Main>
                
                <div className="welcome">
                <h2>Olá, Seja Bem-Vindo [Nome Usuário]</h2>
                <p>Selecione uma opção no menu para começar</p>
                </div>
            </Main>


        </BodyArea>
        
    </Container>
  );
}
