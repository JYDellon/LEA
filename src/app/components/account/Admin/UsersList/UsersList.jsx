import React, { useEffect, useState } from "react";
import axios from "axios";
import UserBanButton from "./UserBanButton";
import UserDeleteButton from "./UserDeleteButton";
import {
  selectToken,
  selectUser,
} from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";

const UsersList = () => {
  const handleUserDeleted = ({ userId }) => {
    // Mettez à jour l'état des utilisateurs en excluant l'utilisateur supprimé
    setUsers((users) => users.filter((user) => user.id !== userId));
  };
  const handleUserBanned = ({ userId }) => {
    // Mettez à jour l'état des utilisateurs en modifiant le statut de l'utilisateur
    setUsers((users) =>
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              accountStatus:
                user.accountStatus === "active" ? "suspend" : "active",
            }
          : user
      )
    );
  };

  const currentUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://localhost:8000/api/users",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleChangeRole = async (userId, newRole) => {
    try {
      // Effectue une requête pour mettre à jour le rôle de l'utilisateur
      await axios.put(
        `https://localhost:8000/api/users/${userId}/change-role`,
        { newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Met à jour l'état des utilisateurs avec le nouveau rôle
      setUsers((users) =>
        users.map((user) =>
          user.id === userId ? { ...user, roles: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="md:col-span-3 p-4 overflow-scroll max-h-[100vh]">
      <h1 className="text-2xl mb-10 font-bold">
        Administration - Liste des comptes utilisateurs
      </h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-t-2 border-customDark">
            <th className="min-w-1/12 p-2 text-left">ID</th>
            <th className="min-w-1/3 p-2 text-left">Nom</th>
            <th className="min-w-1/3 p-2 text-left">Prénom</th>
            <th className="min-w-1/2 p-2 text-left">Roles</th>
            <th className="min-w-1/2 p-2 text-left">Email</th>
            <th className="min-w-1/2 p-2 text-left">Créé le</th>
            <th className="min-w-1/2 p-2 text-left">Statut</th>
            <th className="min-w-1/2 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={`border-b ${
                user.email == currentUser.username ? "text-red-500" : ""
              }`}
            >
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">
                {user.email == currentUser.username ? (
                  user.roles
                ) : (
                  <select
                    value={user.roles} // La valeur actuelle du rôle de l'utilisateur
                    onChange={(e) => handleChangeRole(user.id, e.target.value)}
                    className="rounded py-1"
                  >
                    <option value="ROLE_USER">Utilisateur</option>
                    <option value="ROLE_ADMIN">Administrateur</option>
                  </select>
                )}
              </td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.createdAt}</td>
              <td className="p-2">{user.accountStatus}</td>
              <td className="p-2 md:flex gap-1">
                {user.email == currentUser.username ||
                user.email == "admin@admin.fr" ? null : (
                  <>
                    <UserBanButton
                      userId={user.id}
                      onUserBanned={handleUserBanned}
                      accountStatus={user.accountStatus}
                    />
                    <UserDeleteButton
                      key={user.id}
                      userId={user.id}
                      onUserDeleted={handleUserDeleted}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
