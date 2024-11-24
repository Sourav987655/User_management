import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Modal,
  Paper,
  Switch,
  Alert,
} from "@mui/material";
import "./RoleManagement.css";

const initialRoles = [
  { id: 1, roleName: "Admin", permissions: { Read: true, Write: true, Delete: true } },
  { id: 2, roleName: "Editor", permissions: { Read: true, Write: true, Delete: false } },
  { id: 3, roleName: "Viewer", permissions: { Read: true, Write: false, Delete: false } },
];

function RoleManagement() {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ roleName: "", permissions: { Read: false, Write: false, Delete: false } });
  const [openAddRole, setOpenAddRole] = useState(false);
  const [error, setError] = useState("");

  const handleAddRole = () => {
    // Validate that at least one permission is selected
    const hasPermission = Object.values(newRole.permissions).some((perm) => perm === true);

    if (!newRole.roleName.trim()) {
      setError("Role name cannot be empty.");
      return;
    }

    if (!hasPermission) {
      setError("At least one permission must be selected.");
      return;
    }

    const newRoleId = roles.length + 1;
    setRoles([...roles, { id: newRoleId, ...newRole }]);
    setNewRole({ roleName: "", permissions: { Read: false, Write: false, Delete: false } });
    setOpenAddRole(false);
    setError(""); // Clear error after successful addition
  };

  const handleDeleteRole = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const handlePermissionToggle = (roleId, permission) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [permission]: !role.permissions[permission],
              },
            }
          : role
      )
    );
  };
  const handleCancel = () => {
    setOpenAddRole(false);
    setNewRole({ roleName: "", permissions: { Read: false, Write: false, Delete: false } });
    setError("");
  };

  return (
    <div className="role-management">
      <h2 className="title">Role Management</h2>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddRole(true)}
        style={{ marginBottom: "20px" }}
      >
        Add New Role
      </Button>

      {/* Role Table */}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.roleName}</TableCell>
                <TableCell>
                  {["Read", "Write", "Delete"].map((permission) => (
                    <div key={permission} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span>{permission}</span>
                      <Switch
                        checked={role.permissions[permission]}
                        onChange={() => handlePermissionToggle(role.id, permission)}
                      />
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Role Modal */}
      <Modal open={openAddRole} onClose={() => setOpenAddRole(false)}>
        <Box className="modal-box">
          <h3>Add New Role</h3>
          {error && (
            <Alert severity="error" style={{ marginBottom: "10px" }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Role Name"
            fullWidth
            margin="normal"
            value={newRole.roleName}
            onChange={(e) =>
              setNewRole({ ...newRole, roleName: e.target.value })
            }
          />
          <div style={{ marginTop: "10px" }}>
            {["Read", "Write", "Delete"].map((permission) => (
              <div
                key={permission}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span>{permission}</span>
                <Switch
                  checked={newRole.permissions[permission] || false}
                  onChange={(e) =>
                    setNewRole({
                      ...newRole,
                      permissions: {
                        ...newRole.permissions,
                        [permission]: e.target.checked,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
          <div className="modal-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRole}
            >
              Add Role
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default RoleManagement;
