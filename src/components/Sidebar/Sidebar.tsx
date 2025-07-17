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
  FaTools,
  FaCalendar,
  FaNotesMedical, // Ícone para Consultas
} from "react-icons/fa";

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <SidebarContent collapsed={collapsed}>
        <CollapseButton 
          onClick={() => setCollapsed((prev) => !prev)}>
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </CollapseButton>
        <MenuItemButton 
          icon={FaCalendar}
          label="Agenda"
          collapsed={collapsed} 
          to="/agenda"/> 
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
        <MenuItemButton
          icon={FaTools}
          label="Manutenção"
          collapsed={collapsed}
          to="/manutencoes"
        />
        <MenuItemButton
          icon={FaNotesMedical}
          label="Consulta"
          collapsed={collapsed}
          to="/consultas"
        />
    </SidebarContent>
  );
}