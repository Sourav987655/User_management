import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete, Edit, Search, PhotoCamera } from "@mui/icons-material";
import "./UserManagement.css";

<div className="background">
  <div className="shape shape1"></div>
  <div className="shape shape2"></div>
  <div className="shape shape3"></div>
</div>


const initialUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/50?img=1" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Editor", status: "Inactive", avatar: "https://i.pravatar.cc/50?img=2" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Viewer", status: "Active", avatar: "https://i.pravatar.cc/50?img=3" },
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [editUser, setEditUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "Active",
    avatar: "https://i.pravatar.cc/50",
  });
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [backupEditUser, setBackupEditUser] = useState(null);


  const [errors, setErrors] = useState({
    name: false,
    email: false,
    role: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [editErrors, setEditErrors] = useState({
    name: false,
    email: false,
    role: false,
  });
  
  const [editErrorMessages, setEditErrorMessages] = useState({
    name: "",
    email: "",
    role: "",
  });
  const validateEditFields = () => {
    const newErrors = { name: false, email: false, role: false };
    const newErrorMessages = { name: "", email: "", role: "" };
  
    if (editUser.name.trim().length < 3) {
      newErrors.name = true;
      newErrorMessages.name = "Name must be at least 3 characters long.";
    }
  
    if (!isValidEmail(editUser.email)) {
      newErrors.email = true;
      newErrorMessages.email = "Invalid email format.";
    }
  
    if (!editUser.role.trim()) {
      newErrors.role = true;
      newErrorMessages.role = "Role must be selected.";
    }
  
    setEditErrors(newErrors);
    setEditErrorMessages(newErrorMessages);
  
    // Return whether the form is valid
    return !newErrors.name && !newErrors.email && !newErrors.role;
  };
  
  const handleSaveUser = () => {
    if (!validateEditFields()) return;
  
    setUsers((prev) =>
      prev.map((u) => (u.id === editUser.id ? editUser : u))
    );
    setOpenEdit(false);
  
    // Reset errors
    setEditErrors({ name: false, email: false, role: false });
    setEditErrorMessages({ name: "", email: "", role: "" });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = () => {
    const newErrors = { name: false, email: false, role: false };
    const newErrorMessages = { name: "", email: "", role: "" };

    if (newUser.name.trim().length < 3) {
      newErrors.name = true;
      newErrorMessages.name = "Name must be at least 3 characters long.";
    }

    if (!isValidEmail(newUser.email)) {
      newErrors.email = true;
      newErrorMessages.email = "Invalid email format.";
    }

    if (!newUser.role.trim()) {
      newErrors.role = true;
      newErrorMessages.role = "Role must be selected.";
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    // Return whether the form is valid
    return !newErrors.name && !newErrors.email && !newErrors.role;
  };

  const handleAddUser = () => {
    if (!validateFields()) return;

    const maxId = users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
    const newUserWithId = { ...newUser, id: maxId + 1 };
    setUsers((prev) => [...prev, newUserWithId]);
    setOpenAdd(false);
    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "",
      status: "Active",
      avatar: "https://i.pravatar.cc/50",
    });

    // Reset errors
    setErrors({ name: false, email: false, role: false });
    setErrorMessages({ name: "", email: "", role: "" });
  };

  const handleAvatarChange = (event, userId) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, avatar: reader.result } : user
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditUser = (user) => {
    setEditUser(user);
    setBackupEditUser({ ...user });
    setOpenEdit(true);
  };
  const handleCancelEdit = () => {
    setEditUser(backupEditUser); // Restore the previous user details
    setOpenEdit(false);
  };
  const handleCancelAddUser = () => {
    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "",
      status: "Active",
      avatar: "https://i.pravatar.cc/50",
    });
    setErrors({ name: false, email: false, role: false });
    setErrorMessages({ name: "", email: "", role: "" });
    setOpenAdd(false);
  };
  // const handleSaveUser = () => {
  //   setUsers((prev) =>
  //     prev.map((u) => (u.id === editUser.id ? editUser : u))
  //   );
  //   setOpenEdit(false);
  // };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="user-management">
      <h2 className="title">User Management</h2>

      {/* Search, Filter, and Add User Section */}
      <div className="toolbar">
        <TextField
          label="Search by name or email"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: <Search />,
          }}
        />
        <FormControl size="small" className="filter">
          <InputLabel>Filter by Role</InputLabel>
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAdd(true)}
        >
          Add User
        </Button>
      </div>


       {/* Edit User Modal */}
       <Modal open={openEdit} onClose={handleCancelEdit}>
  <Box className="modal-box">
    <h3>Edit User</h3>
    <TextField
      label="Name"
      fullWidth
      margin="normal"
      value={editUser?.name || ""}
      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
      error={editErrors.name}
      helperText={editErrorMessages.name}
    />
    <TextField
      label="Email"
      fullWidth
      margin="normal"
      value={editUser?.email || ""}
      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
      error={editErrors.email}
      helperText={editErrorMessages.email}
    />
    <FormControl fullWidth margin="normal" error={editErrors.role}>
      <InputLabel>Role</InputLabel>
      <Select
        value={editUser?.role || ""}
        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Editor">Editor</MenuItem>
        <MenuItem value="Viewer">Viewer</MenuItem>
      </Select>
      {editErrors.role && <p className="error-text">{editErrorMessages.role}</p>}
    </FormControl>
    <FormControl fullWidth margin="normal">
      <InputLabel>Status</InputLabel>
      <Select
        value={editUser?.status || ""}
        onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>
    </FormControl>
    <div className="modal-actions">
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveUser}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleCancelEdit}
      >
        Cancel
      </Button>
    </div>
  </Box>
</Modal>




      {/* Add User Modal */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <Box className="modal-box">
          <h3>Add User</h3>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            error={errors.name}
            helperText={errorMessages.name}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            error={errors.email}
            helperText={errorMessages.email}
          />
          <FormControl fullWidth margin="normal" error={errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
            <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={editUser?.status || ""}
              onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
            {errors.role && <p className="error-text">{errorMessages.role}</p>}
          </FormControl>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
              Add
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancelAddUser}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* User Table */}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="avatar-container">
                    <img src={user.avatar} alt={user.name} className="avatar" />
                    <IconButton
                      size="small"
                      component="label"
                      className="edit-avatar-button"
                    >
                      <PhotoCamera />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => handleAvatarChange(event, user.id)}
                      />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
