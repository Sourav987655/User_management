const users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Editor", status: "Inactive" },
];

const roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
  { id: 3, name: "View", permissions: ["Read"] },S
];

export const getUsers = () => Promise.resolve(users);
export const deleteUser = (id) => Promise.resolve();
export const getRoles = () => Promise.resolve(roles);
export const updateRolePermissions = (id, permissions) =>
  Promise.resolve({ id, permissions });