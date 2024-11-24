import React from "react";
import { Checkbox, Grid } from "@mui/material";

const permissionsList = ["Read", "Write", "Delete"];

function PermissionGrid({ role, onChange }) {
  const handleCheckboxChange = (permission) => {
    const updatedPermissions = role.permissions.includes(permission)
      ? role.permissions.filter((perm) => perm !== permission)
      : [...role.permissions, permission];
    onChange(updatedPermissions);
  };

  return (
    <div>
      <h4>{role.name}</h4>
      <Grid container>
        {permissionsList.map((permission) => (
          <Grid item key={permission}>
            <Checkbox
              checked={role.permissions.includes(permission)}
              onChange={() => handleCheckboxChange(permission)}
            />
            {permission}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PermissionGrid;