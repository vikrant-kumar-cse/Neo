import React, { useEffect, useState } from "react";

const styles = {
  container: {
    marginLeft: "70px",
    padding: "30px",
    backgroundColor: "blue",
    minHeight: "100vh",
  },
  title: { fontSize: "32px", fontWeight: "bold", marginBottom: "10px" },
  subtitle: { fontSize: "24px", fontWeight: "600", marginBottom: "20px" },
  searchInput: {
    padding: "10px",
    width: "300px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  table: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    padding: "12px 16px",
    backgroundColor: "#e2e8f0",
    fontWeight: "bold",
    border: "1px solid #cbd5e0",
    textAlign: "left",
  },
  td: { padding: "12px 16px", border: "1px solid #e2e8f0" },
  deleteButton: {
    backgroundColor: "#e53e3e",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  select: {
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#edf2f7",
  },
  noUser: { textAlign: "center", padding: "20px", color: "#718096" },
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8080/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const changeRole = async (userId, newRole) => {
    try {
      const res = await fetch(`http://localhost:8080/auth/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        fetchUsers();
      } else {
        console.error("Failed to change role");
      }
    } catch (err) {
      console.error("Error changing role:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, Admin!</h1>
      <h2 style={styles.subtitle}>Manage Users</h2>

      <input
        type="text"
        placeholder="Search by email..."
        style={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Change Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4" style={styles.noUser}>
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user._id, e.target.value)}
                    style={styles.select}
                  >
                    <option value="user">User</option>
                    <option value="subadmin">Sub Admin</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
