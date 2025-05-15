import {
  SidebarContent,
  CollapseButton,
  MenuButton
} from "./Sidebar.style";

import MenuItemButton from "../MenuButton/MenuButton";
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

export default function Sidebar({ collapsed, setCollapsed, setActiveSection }) {
  return (
    <SidebarContent collapsed={collapsed}>
        <CollapseButton 
          onClick={() => setCollapsed((prev) => !prev)}>
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </CollapseButton>
        <MenuItemButton 
          icon={FaUser}
          label="Paciente"
          collapsed={collapsed} 
          to="/pacientes"/> 
        <MenuItemButton
          icon={FaTooth}
          label="Dentista"
          collapsed={collapsed}
          to="/dentistas"
        />
    </SidebarContent>
  );
}

/*
<MenuButton collapsed={collapsed}><FaClipboard /> {!collapsed && "Consulta"}</MenuButton>
<MenuButton collapsed={collapsed}><FaTools /> {!collapsed && "Manutenção"}</MenuButton>
<MenuButton collapsed={collapsed}><FaMoneyBill /> {!collapsed && "Orçamento"}</MenuButton>
<MenuButton collapsed={collapsed}><FaProcedures /> {!collapsed && "Procedimento"}</MenuButton>

*/