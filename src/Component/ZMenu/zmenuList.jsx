import React, { useState } from "react";
import { Menu, MenuItem, Popover } from "@mui/material";

export default function ZMenuList({ trigger, options = [], row }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchor, setSubmenuAnchor] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubmenuAnchor(null);
    setSubmenuItems([]);
  };
  

  const openSubmenu = (e, children) => {
    e.stopPropagation();
    setSubmenuAnchor(e.currentTarget);
    setSubmenuItems(children);
  };

  const closeSubmenu = () => {
    setSubmenuAnchor(null);
    setSubmenuItems([]);
  };

  return (
    <>
      <span onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
        {trigger}
      </span>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        disableAutoFocusItem
        disableEnforceFocus
      >
        {options.map((opt, index) =>
          opt.children ? (
            <MenuItem
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                opt.onClick && opt.onClick();
                openSubmenu(e, opt.children);
              }}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {opt.label}
            </MenuItem>
          ) : (
            <MenuItem
              key={index}
              onClick={() => {
                opt.onClick && opt.onClick();
                handleMenuClose();
              }}
            >
              {opt.label}
            </MenuItem>
          )
        )}
      </Menu>

      <Menu
        anchorEl={submenuAnchor}
        open={Boolean(submenuAnchor)}
        onClose={closeSubmenu}
        disableAutoFocusItem
        disableEnforceFocus
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {submenuItems.map((child, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              child.onClick && child.onClick(row);
              //   handleMenuClose();
              closeSubmenu();
            }}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
