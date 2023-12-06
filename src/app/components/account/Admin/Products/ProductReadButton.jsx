import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const ProductReadButton = ({ productId, onProductRead }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState({});
  const token = useSelector((state) => state.auth.token);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const readProduct = async () => {
    try {
      const response = await axios.get(
        `https://localhost:8000/api/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProductData(response.data);
      openModal();

      // Appeler la fonction de rappel pour mettre à jour l'interface utilisateur
      if (onProductRead) {
        onProductRead({ productId });
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération du produit",
        error
      );
    }
  };

  return (
    <div>
      <svg
        style={{ cursor: "pointer" }}
        onClick={readProduct}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <div>
  <h2>Informations du produit</h2>
  <table>
    <tbody>
      {Object.keys(productData).map((fieldName) => (
        <tr key={fieldName}>
          <td>
            <label>{fieldName}</label>
          </td>
          <td> 
            <input
              type="text"
              name={fieldName}
              value={productData[fieldName]}
              readOnly
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button onClick={closeModal}>Fermer</button>
</div>
<g id="Frame" clip-path="url(#clip0_2787_56)">
<path id="Vector" d="M10 12.0002C10 12.5307 10.2107 13.0394 10.5858 13.4145C10.9609 13.7895 11.4696 14.0002 12 14.0002C12.5304 14.0002 13.0391 13.7895 13.4142 13.4145C13.7893 13.0394 14 12.5307 14 12.0002C14 11.4698 13.7893 10.9611 13.4142 10.586C13.0391 10.211 12.5304 10.0002 12 10.0002C11.4696 10.0002 10.9609 10.211 10.5858 10.586C10.2107 10.9611 10 11.4698 10 12.0002Z" stroke="#00819E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector_2" d="M21 12.0002C18.6 16.0002 15.6 18.0002 12 18.0002C8.4 18.0002 5.4 16.0002 3 12.0002C5.4 8.00024 8.4 6.00024 12 6.00024C15.6 6.00024 18.6 8.00024 21 12.0002Z" stroke="#00819E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
        <defs>
          <clipPath id="clip0_2787_56">
            <rect width="24" height="24" fill="white" transform="translate(0 0.000244141)" />
          </clipPath>
        </defs>
      </svg>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Modal de lecture du produit"
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      width: "900px", // Ajuste la largeur de la modale selon vos besoins
      height: "750px", // Ajuste la hauteur de la modale selon vos besoins
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
  <div >
    <table style={{ margin: "auto" }}>
      <tbody>
        {Object.keys(productData).map((fieldName) => (
          <tr key={fieldName}>
            <td width='250px'>
              <label>{fieldName}</label>
            </td>
            <td>
              <textarea
                type="text"
                name={fieldName}
                value={productData[fieldName]}
                readOnly
                style={{ whiteSpace: "pre-wrap", width: "725px" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div style={{ textAlign: "center" }}>
  <button
    style={{
      backgroundColor: "#00819E",
      color: "#ffffff",
      padding: "10px",
      margin: "5px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
    onClick={closeModal}
  >
    Fermer
  </button>
</div>

  </div>
</Modal>

    </div>
  );
};

export default ProductReadButton;
