import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SubMenu = ({
  menuItems,
  styles,
  toggleSubMenu,
  closeMenu,
  closeSubMenu,
  isVisible,
  topLevelMenu,
}) => {
  const subMenuRef = useRef();

  const handleOutsideClick = (e) => {
    if (e.target.id === `afficherSousMenuButton${menuItems.id}`) return;

    if (subMenuRef.current && !subMenuRef.current.contains(e.target)) {
      // Clic à l'extérieur du sous-menu, fermer le sous-menu
      closeSubMenu(menuItems.id);

      // Appeler la fonction pour fermer le menu principal si nécessaire
      if (closeMenu) {
        closeMenu();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleBackButtonClick = () => {
    if (topLevelMenu) {
      closeSubMenu(menuItems.id);
    } else {
      closeSubMenu(menuItems.parentId);
    }
  };

  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <button
        id={`afficherSousMenuButton${menuItems.id}`}
        onClick={(e) => {
          e.stopPropagation(); // Ajoutez cette ligne
          toggleSubMenu(menuItems.id);
        }}
        className="hover:text-customBlue flex justify-between items-center w-full md:w-auto relative"
      >
        {menuItems.label}
        {!isResponsive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15"
            viewBox="0 -960 960 960"
            width="15"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[100%] top-[30%] lg:ml-1"
          >
            <g clipPath="url(#clip0_1795_585)">
              <path
                d="M4 6L8 10L12 6"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1795_585">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
      {isVisible && (
        <ul
          className={`absolute bg-white md:border w-full flex flex-wrap flex-col md:flex-row justify-evenly px-4 py-8 md:top-20 z-40`}
          style={{
            left: "0",
            margin: "0",
            ...styles,
          }}
          id={`sousMenu${menuItems.id}`}
          ref={subMenuRef}
        >
          <li
            key="back"
            className="justify-center max-w-full md:hidden focus:outline-none absolute top-0 left-0 ml-4"
          >
            <button
              onClick={handleBackButtonClick}
              className="link inline-block font-extrabold mb-3"
            >
              Retour
            </button>
          </li>
          {menuItems.items.map((subItem) => (
            <li key={subItem.id} className="justify-center max-w-full">
              <div className="sm:col-span-1 flex flex-col pb-5 md:pb-0">
                <Link
                  to={subItem.url}
                  onClick={() => {
                    closeSubMenu(menuItems.id);
                  }}
                  className="link inline-block md:font-extrabold mb-3"
                >
                  {subItem.label}
                </Link>
                {subItem.subItems && subItem.subItems.length > 0 && (
                  <ul key={subItem.id} className="pl-5 md:p-0">
                    {subItem.subItems.map((nestedItem) => (
                      <li key={nestedItem.id}>
                        <Link
                          to={nestedItem.url}
                          onClick={() => {
                            closeSubMenu(menuItems.id);
                          }}
                          className="link inline-block mb-3 md:mb-1"
                        >
                          {nestedItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

SubMenu.propTypes = {
  menuItems: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        subItems: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          })
        ),
      })
    ),
    parentId: PropTypes.number, // Ajoutez cette ligne
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  toggleSubMenu: PropTypes.func.isRequired,
  closeSubMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func,
  styles: PropTypes.object,
  topLevelMenu: PropTypes.bool,
};

export default SubMenu;
