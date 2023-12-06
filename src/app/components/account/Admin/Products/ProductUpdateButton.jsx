import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useSelector } from "react-redux";

// Assurez-vous de remplacer '#root' par l'ID de l'élément racine de votre application
Modal.setAppElement('#root');

const ProductUpdateButton = ({ productId, onProductUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({});
  const [originalProductData, setOriginalProductData] = useState({});
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:8000/api/admin/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 60000,
          }
        );

        // Initialise les données de la modale avec les données existantes
        setUpdatedProductData(response.data);
        // Sauvegarde les données d'origine
        setOriginalProductData(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du produit",
          error
        );
      }
    };

    // Appelle la fonction fetchData pour récupérer les données du produit
    fetchData();
  }, [productId, token]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateProduct = async () => {
    try {
      // Envoye une requête PUT avec toutes les données mises à jour
      const response = await axios.put(
        `https://localhost:8000/api/products/${productId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );
  
      // Appelle la fonction de rappel pour mettre à jour l'interface utilisateur
      if (onProductUpdated) {
        onProductUpdated({ productId, updatedData: response.data });
      }
      
      // Ferme la modale après la mise à jour réussie
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit", error);
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData({
      ...updatedProductData,
      [name]: value,
    });
  };

  return (
    <div id="root">
      <svg
        style={{ cursor: "pointer" }}
        onClick={openModal}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2704_1566)">
          <path
            d="M4 20.0001H8L18.5 9.50006C18.7626 9.23741 18.971 8.92561 19.1131 8.58245C19.2553 8.23929 19.3284 7.87149 19.3284 7.50006C19.3284 7.12862 19.2553 6.76083 19.1131 6.41767C18.971 6.07451 18.7626 5.7627 18.5 5.50006C18.2374 5.23741 17.9256 5.02907 17.5824 4.88693C17.2392 4.74479 16.8714 4.67163 16.5 4.67163C16.1286 4.67163 15.7608 4.74479 15.4176 4.88693C15.0744 5.02907 14.7626 5.23741 14.5 5.50006L4 16.0001V20.0001Z"
            stroke="#00819E"
            strokeWidth="1.8" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 6.5L17.5 10.5"
            stroke="#00819E"
            strokeWidth="1.8"  
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2704_1566">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de mise à jour du produit"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "900px", // Ajuste la largeur de la modale selon vos besoins
            height: "500px", // Ajuste la hauteur de la modale selon vos besoins
            overflow: "auto", // Ajoute un défilement si nécessaire
            display: "flex",
            flexDirection: "column", // Place les éléments en colonne
            alignItems: "center", // Centre les éléments horizontalement
            justifyContent: "center", // Centre les éléments verticalement
            top: "51%", // Ajuste la position verticale de la modale
            left: "50%", // Ajuste la position horizontale de la modale
            transform: "translate(-50%, -50%)", // Centre la modale précisément
          },
        }}
      >
        <div>
        <table>
              <tbody>
                {Object.keys(updatedProductData).map((fieldName) => (
                  <tr key={fieldName}>
                    <td width="250px">
                      <label>{fieldName}</label>
                    </td>
                    <td>
                      <textarea
                        type="text"
                        name={fieldName}
                        value={updatedProductData[fieldName]}
                        onChange={handleInputChange}
                        style={{ whiteSpace: "pre-wrap", width: "725px", height: "37px", resize: "none", border: "none"  }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
        </table>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={updateProduct}
              style={{
                backgroundColor: "#00819E",
                color: "#ffffff",
                padding: "10px",
                margin: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Mettre à jour le produit
            </button>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "#ff0000",
                color: "#ffffff",
                padding: "10px",
                margin: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductUpdateButton;
