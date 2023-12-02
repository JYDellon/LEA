import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLogged,
  selectUser,
  signOut,
} from "../../redux-store/authenticationSlice";
import * as URL from "../../constants/urls/urlFrontEnd";
import Logo from "./../../assets/images/logo.svg";
import SubMenu from "./SubMenu";

const Navbar = () => {
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const loginMenuRef = useRef(null);
  const user = useSelector(selectUser);

  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);

  const toggleLoginMenu = (event) => {
    event.stopPropagation();
    setIsLoginMenuOpen(!isLoginMenuOpen);
  };

  const handleLoginMenuItemClick = () => {
    setIsLoginMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginMenuRef.current &&
        !loginMenuRef.current.contains(event.target)
      ) {
        setIsLoginMenuOpen(false);
      }
    };

    // Ajoute un écouteur d'événements pour détecter les clics à l'extérieur du menu
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Retire l'écouteur d'événements lors du démontage du composant
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    handleLoginMenuItemClick();
    dispatch(signOut());
    navigate(URL.URL_AUTHFORM);
  };

  const toggleSubMenu = (menuId) => {
    if (visibleMenus[menuId]) {
      closeSubMenu(menuId);
    } else {
      setVisibleMenus((prevVisibleMenus) => ({
        ...Object.keys(prevVisibleMenus).reduce((acc, key) => {
          acc[key] = key === menuId.toString();
          return acc;
        }, {}),
      }));
    }
  };

  const closeSubMenu = (menuId) => {
    setVisibleMenus((prevVisibleMenus) => ({
      ...prevVisibleMenus,
      [menuId]: false,
    }));
  };

  const isLoggued = useSelector(selectIsLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems1 = {
    id: 1,
    label: "Soin",
    items: [
      {
        label: "Soin du visage",
        url: URL.URL_HOME,
        subItems: [
          { label: "Anti-âge", url: URL.URL_HOME },
          { label: "Peau sensible", url: URL.URL_HOME },
        ],
      },
      {
        label: "Soin corporel",
        url: URL.URL_HOME,
        subItems: [
          { label: "Nettoyant", url: URL.URL_HOME },
          { label: "Bain", url: URL.URL_HOME },
          { label: "Coffret cadeau", url: URL.URL_HOME },
        ],
      },
      {
        label: "Soin capillaire",
        url: URL.URL_HOME,
        subItems: [
          { label: "Shampoing et après-shampoing", url: URL.URL_HOME },
          { label: "Cuir chevelu sensible", url: URL.URL_HOME },
          { label: "Masque et coiffant", url: URL.URL_HOME },
        ],
      },
    ],
  };

  const menuItems2 = {
    id: 2,
    label: "Parapharmacie",
    items: [
      {
        label: "Compléments alimentaires",
        url: URL.URL_HOME,
        subItems: [
          { label: "Peau, cheveux et ongles", url: URL.URL_HOME },
          { label: "Tisane, thé et infusion", url: URL.URL_HOME },
          { label: "Digestion et transit", url: URL.URL_HOME },
        ],
      },
      {
        label: "Santé & bien-être",
        url: URL.URL_HOME,
        subItems: [
          { label: "Peau et cheveux", url: URL.URL_HOME },
          { label: "Immunité", url: URL.URL_HOME },
          { label: "Protection solaire", url: URL.URL_HOME },
        ],
      },
    ],
  };

  const [visibleMenus, setVisibleMenus] = useState({
    [menuItems1.id]: false,
    [menuItems2.id]: false,
  });

  const generateIds = (menu, baseId = 1) => {
    let currentId = baseId;

    const generateIdRecursive = (item) => {
      item.id = currentId++;

      if (item.subItems && item.subItems.length > 0) {
        item.subItems.forEach(generateIdRecursive);
      }
    };

    menu.items.forEach(generateIdRecursive);
  };

  // Usage
  generateIds(menuItems1);
  generateIds(menuItems2);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (event) => {
    event.stopPropagation();

    setIsMobileMenuOpen((prev) => {
      return !prev;
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Vérifier si le clic est à l'intérieur ou à l'extérieur du menu mobile
      if (
        menuButtonRef.current &&
        menuRef.current &&
        !menuButtonRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        // Clic à l'extérieur du menu ou du bouton, fermer le menu mobile
        closeMobileMenu();
      }
    };

    // Ajouter l'écouteur d'événements au montage du composant
    document.addEventListener("click", handleOutsideClick);

    // Supprimer l'écouteur d'événements lorsque le composant est démonté
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [closeMobileMenu]);

  return (
    <nav className="top-0 bg-white sticky font-satoshiMedium z-50 h-[80px]">
      <div className="mx-auto max-w-screen-xl px-4 h-[80px]">
        <div
          className={`flex items-center justify-between  ${
            isMobileMenuOpen ? "show-menu" : null
          } `}
        >
          {/* Mobile Menu Icon */}
          <div
            id="mobileMenuButton"
            ref={menuButtonRef}
            className="md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {!isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1343_24241)">
                  <path
                    d="M4 6H20"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H20"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 18H20"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1343_24241">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
          </div>

          {/* Mobile Menu */}
          <div
            id="mobileMenu"
            ref={menuRef}
            className="md:hidden fixed top-[70px] border h-full w-full max-w-[400px] bg-white z-999 overflow-auto"
          >
            <div className="flex flex-col items-start space-y-4 p-4">
              <Link
                to={URL.URL_HOME}
                onClick={closeMobileMenu}
                className="mt-8 md:mt-0 w-full hover:text-customBlue"
              >
                Nouveautés
              </Link>
              <SubMenu
                isVisible={visibleMenus[menuItems1.id]}
                toggleSubMenu={toggleSubMenu}
                closeSubMenu={closeSubMenu}
                menuItems={menuItems1}
                closeMenu={closeMobileMenu}
              />
              <SubMenu
                isVisible={visibleMenus[menuItems2.id]}
                toggleSubMenu={toggleSubMenu}
                closeSubMenu={closeSubMenu}
                menuItems={menuItems2}
                closeMenu={closeMobileMenu}
              />
              {/* Condition pour afficher le bouton supplémentaire pour ROLE_ADMIN */}
              {user?.roles.includes("ROLE_ADMIN") ? (
                <Link
                  to={URL.URL_ADMIN}
                  className="w-full hover:text-customBlue"
                >
                  Tableau de bord admin
                </Link>
              ) : (
                <>
                  <Link
                    to={URL.URL_HOME}
                    onClick={closeMobileMenu}
                    className="w-full hover:text-customBlue"
                  >
                    À propos
                  </Link>
                  <Link
                    to={URL.URL_CONTACT}
                    onClick={closeMobileMenu}
                    className="w-full hover:text-customBlue"
                  >
                    Contact
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="w-full md:w-fit flex justify-center md:block">
            <Link to={URL.URL_HOME} className="inline-block">
              <img
                className="cursor-pointer"
                src={Logo}
                alt="logo"
                width={180}
                height={60}
              />
            </Link>
          </div>

          {/* Desktop Menu */}

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-5 lg:space-x-10 justify-center">
              <Link to={URL.URL_HOME} className="link inline-block">
                Nouveautés
              </Link>
              <SubMenu
                isVisible={visibleMenus[menuItems1.id]}
                toggleSubMenu={toggleSubMenu}
                closeSubMenu={closeSubMenu}
                menuItems={menuItems1}
              />
              <SubMenu
                isVisible={visibleMenus[menuItems2.id]}
                toggleSubMenu={toggleSubMenu}
                closeSubMenu={closeSubMenu}
                menuItems={menuItems2}
              />
              <Link
                to={URL.URL_HOME}
                onClick={closeMobileMenu}
                className="hover:text-customBlue"
              >
                À propos
              </Link>
              <Link
                to={URL.URL_CONTACT}
                onClick={closeMobileMenu}
                className="hover:text-customBlue"
              >
                Contact
              </Link>
            </div>
          </div>
          <div>
            <div className="flex space-x-4">
              <Link to={URL.URL_AUTHFORM}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_823_9643)">
                    <path
                      d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L15 15"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_823_9643">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              {/* SOUS-MENU LOGIN */}
              <div className="relative">
                {!isLoggued ? (
                  <Link to={URL.URL_AUTHFORM}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_823_9638)">
                        <path
                          d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.16797 18.849C6.41548 18.0252 6.92194 17.3032 7.61222 16.79C8.30249 16.2768 9.13982 15.9997 9.99997 16H14C14.8612 15.9997 15.6996 16.2774 16.3904 16.7918C17.0811 17.3062 17.5874 18.0298 17.834 18.855"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_823_9638">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                ) : (
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      onClick={toggleLoginMenu}
                      style={{ cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_823_9638)">
                        <path
                          d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.16797 18.849C6.41548 18.0252 6.92194 17.3032 7.61222 16.79C8.30249 16.2768 9.13982 15.9997 9.99997 16H14C14.8612 15.9997 15.6996 16.2774 16.3904 16.7918C17.0811 17.3062 17.5874 18.0298 17.834 18.855"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_823_9638">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    {/* Sous-menu du bouton de connexion à afficher lors du clic sur le bouton */}
                    {isLoginMenuOpen && (
                      <div
                        id="loginMenu"
                        ref={loginMenuRef}
                        className="absolute border rounded-[15px] -right-[50px] top-8 p-5 w-[165px] bg-white"
                      >
                        {/* Contenu de votre sous-menu du bouton de connexion */}
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to={URL.URL_MY_ORDERS}
                              className="hover:text-customBlue"
                              onClick={handleLoginMenuItemClick}
                            >
                              Mes commandes
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={URL.URL_MY_ACCOUNT}
                              className="hover:text-customBlue"
                              onClick={handleLoginMenuItemClick}
                            >
                              Mon compte
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={URL.URL_RETURN_ITEM}
                              className="hover:text-customBlue"
                              onClick={handleLoginMenuItemClick}
                            >
                              Retour d'article
                            </Link>
                          </li>
                          <li
                            onClick={handleSignOut}
                            className="hover:text-customBlue cursor-pointer"
                          >
                            Déconnexion
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Link to={URL.URL_AUTHFORM}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_823_9634)">
                    <path
                      d="M6.33105 8H17.67C17.9584 7.99997 18.2434 8.06229 18.5054 8.1827C18.7674 8.30311 19.0003 8.47876 19.1881 8.6976C19.3759 8.91645 19.5141 9.17331 19.5933 9.45059C19.6726 9.72786 19.6909 10.019 19.647 10.304L18.392 18.456C18.2831 19.1644 17.9241 19.8105 17.38 20.2771C16.836 20.7438 16.1428 21.0002 15.426 21H8.57405C7.85745 21 7.16453 20.7434 6.62068 20.2768C6.07683 19.8102 5.71797 19.1643 5.60905 18.456L4.35405 10.304C4.31022 10.019 4.32854 9.72786 4.40775 9.45059C4.48697 9.17331 4.62521 8.91645 4.81299 8.6976C5.00078 8.47876 5.23367 8.30311 5.49569 8.1827C5.75772 8.06229 6.04268 7.99997 6.33105 8Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11V6C9 5.20435 9.31607 4.44129 9.87868 3.87868C10.4413 3.31607 11.2044 3 12 3C12.7956 3 13.5587 3.31607 14.1213 3.87868C14.6839 4.44129 15 5.20435 15 6V11"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_823_9634">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
