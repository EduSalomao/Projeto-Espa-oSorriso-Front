import React from "react";
import { MenuButton } from "./MenuButton.style"; // onde está o styled-component
import { IconType } from "react-icons";
import { Navigate, useNavigate } from "react-router-dom";

interface MenuItemButtonProps {
  icon: IconType;
  label: string;
  collapsed?: boolean;
  to: string;
}

const MenuItemButton: React.FC<MenuItemButtonProps> = ({
  icon: Icon,
  label,
  collapsed = false,
  to,
}) => {
    const navigate = useNavigate();
    return (
        <MenuButton collapsed={collapsed} onClick={() => navigate(to)}>
        <Icon />
        {!collapsed && label}
        </MenuButton>
    );
};

export default MenuItemButton;