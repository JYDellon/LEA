import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux-store/authenticationSlice";
import UserBanButton from "./Admin/UserBanButton";
import UserDeleteButton from "./Admin/UserDeleteButton";

const UserList = () => {
  const token = useSelector(selectToken);
  const [users, setUsers] = useState([]); // Supposons que vous avez un état pour stocker les utilisateurs

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Partie gauche */}
      <div className="md:col-span-1 p-8 bg-customLightGrey border space-y-1">
        <p className="font-bold mb-5 text-center">Bonjour Admin,</p>
        <h2 className="text-size16 pb-5 flex items-center gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_821_8395)">
              <path
                d="M10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13Z"
                stroke="#4E4E4E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.45 11.55L15.5 9.5"
                stroke="#4E4E4E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.4 19.9999C4.93815 18.838 3.87391 17.2501 3.35478 15.4564C2.83564 13.6626 2.88732 11.7518 3.50265 9.98872C4.11797 8.22564 5.26647 6.69762 6.78899 5.61641C8.3115 4.5352 10.1326 3.95435 12 3.95435C13.8674 3.95435 15.6885 4.5352 17.211 5.61641C18.7335 6.69762 19.882 8.22564 20.4974 9.98872C21.1127 11.7518 21.1644 13.6626 20.6452 15.4564C20.1261 17.2501 19.0619 18.838 17.6 19.9999H6.4Z"
                stroke="#4E4E4E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_821_8395">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Tableau de bord
        </h2>
        <hr />
        <h3 className="text-size16 flex items-center gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1838_3778)">
              <path
                d="M20.5 16.008V7.99001C20.4994 7.64108 20.4066 7.29851 20.231 6.99699C20.0554 6.69547 19.8032 6.44571 19.5 6.27301L12.5 2.26501C12.1954 2.09103 11.8508 1.99951 11.5 1.99951C11.1492 1.99951 10.8046 2.09103 10.5 2.26501L3.5 6.27301C2.881 6.62801 2.5 7.28301 2.5 7.99101V16.009C2.5 16.718 2.881 17.372 3.5 17.726L10.5 21.734C10.8046 21.908 11.1492 21.9995 11.5 21.9995C11.8508 21.9995 12.1954 21.908 12.5 21.734L19.5 17.726C20.119 17.371 20.5 16.716 20.5 16.008Z"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 22V12"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5 12L20.23 6.95996"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.77002 6.95996L11.5 12"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1838_3778">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(-0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          Gestion de produits
        </h3>
        <ul>
          <li>Liste des produits</li>
          <li>Type de produit</li>
        </ul>
        <h3 className="text-size16 flex items-center gap-3">
          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1838_2134)">
              <path
                d="M4 17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19C6.53043 19 7.03914 18.7893 7.41421 18.4142C7.78929 18.0391 8 17.5304 8 17C8 16.4696 7.78929 15.9609 7.41421 15.5858C7.03914 15.2107 6.53043 15 6 15C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17Z"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 17C14 17.5304 14.2107 18.0391 14.5858 18.4142C14.9609 18.7893 15.4696 19 16 19C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17C18 16.4696 17.7893 15.9609 17.4142 15.5858C17.0391 15.2107 16.5304 15 16 15C15.4696 15 14.9609 15.2107 14.5858 15.5858C14.2107 15.9609 14 16.4696 14 17Z"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 17H2V13M1 5H12V17M8 17H14M18 17H20V11M20 11H12M20 11L17 6H12"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 9H6"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1838_2134">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(-1)"
                />
              </clipPath>
            </defs>
          </svg>
          Gestion des achats
        </h3>
        <p>Liste des commandes</p>
        <h3 className="text-size16 flex items-center gap-3">
          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1838_2091)">
              <path
                d="M4 21V5C4 4.46957 4.21071 3.96086 4.58579 3.58579C4.96086 3.21071 5.46957 3 6 3H16C16.5304 3 17.0391 3.21071 17.4142 3.58579C17.7893 3.96086 18 4.46957 18 5V21L15 19L13 21L11 19L9 21L7 19L4 21Z"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14V12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10H8M8 10L10 8M8 10L10 12"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1838_2091">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(-1)"
                />
              </clipPath>
            </defs>
          </svg>
          Gestion des retours
        </h3>
        <p>Liste des retours</p>
        <h3 className="text-size16 flex items-center gap-3">
          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1838_3025)">
              <path
                d="M3.5 8C3.5 9.06087 3.92143 10.0783 4.67157 10.8284C5.42172 11.5786 6.43913 12 7.5 12C8.56087 12 9.57828 11.5786 10.3284 10.8284C11.0786 10.0783 11.5 9.06087 11.5 8C11.5 6.93913 11.0786 5.92172 10.3284 5.17157C9.57828 4.42143 8.56087 4 7.5 4C6.43913 4 5.42172 4.42143 4.67157 5.17157C3.92143 5.92172 3.5 6.93913 3.5 8Z"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.5 21V19C1.5 17.9391 1.92143 16.9217 2.67157 16.1716C3.42172 15.4214 4.43913 15 5.5 15H9.5C10.5609 15 11.5783 15.4214 12.3284 16.1716C13.0786 16.9217 13.5 17.9391 13.5 19V21"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5 4.12988C15.3604 4.35018 16.123 4.85058 16.6676 5.55219C17.2122 6.2538 17.5078 7.11671 17.5078 8.00488C17.5078 8.89305 17.2122 9.75596 16.6676 10.4576C16.123 11.1592 15.3604 11.6596 14.5 11.8799"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5 20.9999V18.9999C19.4949 18.1171 19.1979 17.2607 18.6553 16.5643C18.1126 15.8679 17.3548 15.3706 16.5 15.1499"
                stroke="#4E4E4E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1838_3025">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(-1.5)"
                />
              </clipPath>
            </defs>
          </svg>
          Gestion des comptes
        </h3>
        <p>Liste des comptes utilisateurs</p>
        <h3 className="text-size16 flex items-center gap-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_821_8392)">
              <path
                d="M3 20L4.3 16.1C1.976 12.663 2.874 8.22797 6.4 5.72597C9.926 3.22497 14.99 3.42997 18.245 6.20597C21.5 8.98297 21.94 13.472 19.274 16.707C16.608 19.942 11.659 20.922 7.7 19L3 20Z"
                stroke="#4E4E4E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_821_8392">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Gestion des avis signalés
        </h3>
      </div>

      {/* Partie droite (tableau) */}
      <div className="md:col-span-3 p-4">
        <h1 className="text-2xl mb-10 font-bold">
          Administration - Liste des comptes utilisateurs
        </h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-t-2 border-customDark">
              <th className="min-w-1/12 p-2 text-left">ID</th>
              <th className="min-w-1/3 p-2 text-left">Nom</th>
              <th className="min-w-1/3 p-2 text-left">Prénom</th>
              <th className="min-w-1/2 p-2 text-left">Email</th>
              <th className="min-w-1/2 p-2 text-left">Créé le</th>
              <th className="min-w-1/2 p-2 text-left">Statut</th>
              <th className="min-w-1/2 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.createdAt}</td>
                <td className="p-2">{user.accountStatus}</td>
                <td className="p-2 flex gap-1">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
