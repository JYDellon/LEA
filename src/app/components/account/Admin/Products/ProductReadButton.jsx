import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
};

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
          timeout: 60000,
        }
      );

      setProductData(response.data);
      openModal();

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
        <g id="Frame" clipPath="url(#clip0_2787_56)">
          <path
            id="Vector"
            d="M10 12.0002C10 12.5307 10.2107 13.0394 10.5858 13.4145C10.9609 13.7895 11.4696 14.0002 12 14.0002C12.5304 14.0002 13.0391 13.7895 13.4142 13.4145C13.7893 13.0394 14 12.5307 14 12.0002C14 11.4698 13.7893 10.9611 13.4142 10.586C13.0391 10.211 12.5304 10.0002 12 10.0002C11.4696 10.0002 10.9609 10.211 10.5858 10.586C10.2107 10.9611 10 11.4698 10 12.0002Z"
            stroke="#00819E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_2"
            d="M21 12.0002C18.6 16.0002 15.6 18.0002 12 18.0002C8.4 18.0002 5.4 16.0002 3 12.0002C5.4 8.00024 8.4 6.00024 12 6.00024C15.6 6.00024 18.6 8.00024 21 12.0002Z"
            stroke="#00819E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2787_56">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0 0.000244141)"
            />
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
            width: "100%", 
            height: "100%", 
            overflow: "auto", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
          <div style={{ flex: 1, marginRight: "20px" }}>
            <div style={{ margin: "20px" }}>
              <a
                href="#"
                onClick={() => setIsModalOpen(false)}
                className="text-blue-500 underline mb-4"
              >
                Retour sur Administration - Liste des produits
              </a>

              <p className="text-xl font-bold mb-4" style={{ marginTop: "45px", marginBottom: "27px" }}>
                Informations du produit
              </p>

              <hr style={{ marginBottom: "20px", borderTop: "1px solid black" }} />


              <div>
              <div style={{ marginBottom: "7px" }}>
                  <label>Nom du produit</label>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <input
                  type="text"
                  name="name"
                  value={productData.Nom}
                  readOnly
                  style={inputStyle}
                  />
                </div>
                
                <div style={{ marginBottom: "7px" }}>
                  <label>Référence</label>
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                  <input
                  type="text"
                  name="reference"
                  value={productData.Référence}
                  readOnly
                  style={inputStyle}
                  />
                </div>
                
                <div style={{ marginBottom: "7px" }}>
                  <label>Prix</label>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <input
                    type="text"
                    name="price"
                    value={productData.Prix}
                    readOnly
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: "7px" }}>
                  <label>Contenance</label>
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                  <input
                  type="text"
                  name="mesurement"
                  value={productData.Conditionnement}
                  readOnly
                  style={inputStyle}
                />
                </div>
                
                <div style={{ marginBottom: "7px" }}>
                  <label>Stock</label>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <input
                  type="text"
                  name="stock"
                  value={productData.Stock}
                  readOnly
                  style={inputStyle}
                  />
                </div>
                
                <div style={{ marginBottom: "7px" }}>
  <label>Catégorie</label>
</div>  

<div style={{ marginBottom: "20px" }}>  
  <input
    type="text"
    name="productType"
    value={productData.TypeName}
    readOnly
    style={{ width: "35%" }} 
  />
</div>
                
                <div style={{ marginBottom: "7px" }}>
                  <label>Taxe</label>
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                  <input
                  type="text"
                  name="taxe"
                  value={productData.Taxe}
                  readOnly
                  style={inputStyle}
                  />
                </div>
                

                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={productData.DescriptionCourte}
                  readOnly
                  style={inputStyle}
                />

                <label>Description détaillée</label>
                <textarea
                  name="detailedDescription"
                  value={productData.DescriptionDétaillée}
                  readOnly
                  style={{
                    ...inputStyle,
                    whiteSpace: "pre-wrap",
                    height: "120px",
                    resize: "none",
                    border: "1px solid black" , 
                    borderRadius: "2px", 
                  }}
                />



                
              </div>
            </div>
          </div>
          


          
          <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "130px",
        }}
      >
           
           
           {/* Aperçu de la photo du produit */}
           

           <img
                src={`https://localhost:8000${productData.ImageUrl}`}
                alt="Aperçu du produit"
                style={{ maxWidth: "100%", maxHeight: "100%", marginBottom: "5px" }}
                onError={() => console.log("Erreur lors du chargement de l'image")}
          />
            {/* Bouton Fermer */}
            <button
              style={{
                backgroundColor: "#00819E",
                color: "#fff",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
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
