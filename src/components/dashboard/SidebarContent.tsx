import React from "react";
import {
  Sidebar,
  Header,
  CollapseButton,
  MenuButton
} from "./Dashboard.style";
import {
  FaTooth,
  FaUser,
  FaClipboard,
  FaTools,
  FaMoneyBill,
  FaProcedures,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

export default function SidebarContent({ collapsed, setCollapsed, setActiveSection }) {
  return (
    <Sidebar collapsed={collapsed}>
        <CollapseButton onClick={() => setCollapsed((prev) => !prev)}>
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </CollapseButton>
        <MenuButton collapsed={collapsed} onClick={() => setActiveSection("paciente")}><FaUser /> {!collapsed && "Paciente"}</MenuButton>
        <MenuButton collapsed={collapsed}><FaClipboard /> {!collapsed && "Consulta"}</MenuButton>
        <MenuButton collapsed={collapsed}><FaTools /> {!collapsed && "Manutenção"}</MenuButton>
        <MenuButton collapsed={collapsed}><FaMoneyBill /> {!collapsed && "Orçamento"}</MenuButton>
        <MenuButton collapsed={collapsed}><FaProcedures /> {!collapsed && "Procedimento"}</MenuButton>
        <MenuButton collapsed={collapsed}><FaTooth /> {!collapsed && "Dentista"}</MenuButton>
    </Sidebar>
  );
}
