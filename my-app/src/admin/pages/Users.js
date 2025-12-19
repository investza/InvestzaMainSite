import React, { useEffect, useState } from "react";
import styles from "./Users.module.css";
import {getAllAdmins,deleteAdmin,addAdmin} from "../../api/flowApi";

function Users() {
  const emptyForm = {
    adminName: "",
    email: "",
    password: "",
    role: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(()=> {
    fetchAdminDetails();
    // console.log("fetchingDetails");
  },[])

  const fetchAdminDetails = async() => {
     const res = await getAllAdmins();
     setUsers(res.data);
    //  console.log(res.data);
  }
   

  /* ------------------------
        ADD USER
  ------------------------- */
  const addUser = async() => {
    if (!formData.adminName || !formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    } else {
      try{
        const payload = {
           // payload = { adminName, email, password,role}
           adminName:formData.adminName,
           email:formData.email,
           password:formData.password,
           role:formData.role
        };
        await addAdmin(payload);
        const newUser = {
        ...formData,
        id: Date.now().toString(),
        };

        setUsers([...users, newUser]);
        setFormData(emptyForm);
      } catch(err) {
        alert(err);
      }
    }

  };

  /* ------------------------
        UPDATE USER
  ------------------------- */
  const updateUser = () => {
    const updated = users.map((u) =>
      u.id === editUser.id ? editUser : u
    );
    setUsers(updated);
    setEditUser(null);
  };

  /* ------------------------
        DELETE USER
  ------------------------- */
  const deleteUser = async(id) => {
    try{
      if (window.confirm("Delete this user?")) {
      await deleteAdmin(id);
      // console.log(res);
      setUsers(users.filter((u) => u.id !== id));
    }
    }catch(err) {
      alert(err);
    }
   
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Admins</h1>

      <div className={styles.contentGrid}>
        {/* left: form */}
        <div className={styles.leftCol}>
          <div className={styles.formBox}>
            <h2>Add Admin</h2>

            <input
              type="text"
              placeholder="Admin name"
              className={styles.input}
              value={formData.adminName}
              onChange={(e) =>
                setFormData({ ...formData, adminName: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <select
  className={styles.input}
  value={formData.role}
  onChange={(e) =>
    setFormData({ ...formData, role: e.target.value })
  }
>
  <option value="">Select Admin Role</option>
  <option value="ADMIN">Admin</option>
  <option value="CALL_HANDLER">Call Handler</option>
  <option value="PORTFOLIO_HANDLER">Portfolio Handler</option>
</select>


            <button className={styles.addBtn} onClick={addUser}>
              Add Admin
            </button>
          </div>
        </div>

        {/* right: table */}
        <div className={styles.rightCol}>
          <div className={styles.tableWrapper}>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>Admin Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className={styles.noData}>
                      No users yet — add one from the form.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.adminName}</td>
                      <td>{u.email}</td>
                      <td>{(u.role).toLowerCase()}</td>

                      <td>
                        <div className={styles.actionGroup}>
                          {/* <button
                            className={styles.editBtn}
                            onClick={() => setEditUser({ ...u })}
                          >
                            Edit
                          </button> */}

                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteUser(u.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
