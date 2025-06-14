import {
  SidebarContent,
  CollapseButton,
} from "./Sidebar.style";
import MenuItemButton from "../MenuButton/MenuButton";
import {
  FaTooth,
  FaUser,
  FaProcedures,
  FaChevronLeft,
  FaChevronRight,
  FaTools // Importar ícone
} from "react-icons/fa";

export default function Sidebar({ collapsed, setCollapsed }) {
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
        <MenuItemButton
          icon={FaProcedures}
          label="Procedimento"
          collapsed={collapsed}
          to="/procedimentos"
        />
        {/* Novo botão de menu */}
        <MenuItemButton
          icon={FaTools}
          label="Manutenção"
          collapsed={collapsed}
          to="/manutencoes"
        />
    </SidebarContent>
  );
}