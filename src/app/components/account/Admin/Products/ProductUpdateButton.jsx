import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useSelector } from "react-redux";

// Assurez-vous de remplacer '#root' par l'ID de l'élément racine de votre application
Modal.setAppElement("#root");

const ProductUpdateButton = ({ productId, onProductUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [types, setTypes] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get(
          "https://localhost:8000/api/types",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
          }
        );
        setAllTypes(typesResponse.data);
    
        const productResponse = await axios.get(
          `https://localhost:8000/api/admin/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
          }
        );
        setUpdatedProductData(productResponse.data);
  
        // Définir la valeur actuelle du type de produit dans l'état
        // const currentProductType = `${productResponse.data.product_type_id} - ${productResponse.data.product_type_name}`;
        setSelectedProductType(currentProductType);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };
  
    fetchData();
  }, [productId, token]);

  const openModal = async () => {
    try {
      // Effectuez une requête pour obtenir le type de produit au moment de l'ouverture de la modal
      const productResponse = await axios.get(
        `https://localhost:8000/api/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
  
      // Utilisez les données obtenues pour mettre à jour l'état de la modal
      setUpdatedProductData(productResponse.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des données du produit", error);
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const updateProduct = async () => {
    try {
      
      // Mettez à jour les autres données du produit
      const response = await axios.put(
        `https://localhost:8000/api/products/${productId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );
  
      // Vérifiez si une nouvelle image a été sélectionnée
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        // Envoyez l'image au serveur
        await axios.post(
          `https://localhost:8000/api/products/${productId}/upload-image`, // Mise à jour de l'URL
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }
  
      if (onProductUpdated) {
        onProductUpdated({ productId, updatedData: response.data });
      }
  
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit', error);
    }



    
    // Vérifier si un nouveau fichier a été sélectionné
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Envoyer le fichier au serveur
      await axios.post(
        `https://localhost:8000/api/products/${productId}/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',  // Assurez-vous que le type de contenu est correct
          },
        }
      );
    }

  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Mise à jour de l'état avec la nouvelle valeur
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <svg
        style={{ cursor: "pointer" }}
        onClick={openModal}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M4 20H8L18.5 9.5C18.7626 9.23741 18.971 8.92561 19.1131 8.58245C19.2553 8.23929 19.3284 7.87149 19.3284 7.5C19.3284 7.12856 19.2553 6.76077 19.1131 6.41761C18.971 6.07445 18.7626 5.76264 18.5 5.5C18.2374 5.23736 17.9256 5.02902 17.5824 4.88687C17.2392 4.74473 16.8714 4.67158 16.5 4.67158C16.1286 4.67158 15.7608 4.74473 15.4176 4.88687C15.0744 5.02902 14.7626 5.23736 14.5 5.5L4 16V20Z"
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
          <clipPath id="clip0">
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
            justifyContent: "center",
          },
          content: {
            width: "100%",
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "row", // Utilisez une disposition en ligne pour deux colonnes
            alignItems: "flex-start", // Alignez les éléments en haut
            justifyContent: "center",
            top: "51%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {/* Colonne gauche */}
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
              Mise à jour du type
            </p>

            <hr style={{ marginBottom: "20px", borderTop: "1px solid black" }} />

            {/* Nom du produit */}
            <div style={{ marginBottom: "7px" }}>
              <label>Nom du produit</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                value={updatedProductData.Nom || ""}
                type="text"
                name="Nom"
                style={{ width: "100%" }}
                onChange={handleInputChange}
              />
            </div>

            {/* Référence */}
            <div style={{ marginBottom: "7px" }}>
              <label>Référence</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                value={updatedProductData.Référence || ""}
                type="text"
                name="Référence"
                style={{ width: "100%" }}
                onChange={handleInputChange}
              />
            </div>

            {/* Prix */}
            <div style={{ marginBottom: "7px" }}>
              <label>Prix</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                value={updatedProductData.Prix || ""}
                type="number"
                name="Prix"
                style={{ width: "100%" }}
                onChange={handleInputChange}
              />
            </div>

            {/* Contenance */}
            <div style={{ marginBottom: "7px" }}>
              <label>Contenance</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                value={updatedProductData.Conditionnement || ""}
                type="text"
                name="Conditionnement"
                style={{ width: "100%" }}
                onChange={handleInputChange}
              />
            </div>

            {/* Stock */}
            <div style={{ marginBottom: "7px" }}>
              <label>Stock</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                value={updatedProductData.Stock || ""}
                type="number"
                name="Stock"
                style={{ width: "100%" }}
                onChange={handleInputChange}
              />
            </div>

            {/* Catégorie */}
            <div style={{ marginBottom: "7px" }}>
              <label>Catégorie</label>
            </div>

            <div style={{ marginBottom: "20px" }}>
            <select
              value={updatedProductData.product_type_id || ""}
              name="product_type_id"
              style={{ width: "100%" }}
              onChange={(e) => {
                const selectedTypeId = parseInt(e.target.value);
                const selectedTypeName = allTypes.find(type => type.idType === selectedTypeId)?.Nom || "";
                setUpdatedProductData((prevData) => ({
                  ...prevData,
                  product_type_id: selectedTypeId || "",
                  product_type_name: selectedTypeName,
                }));
              }}
            >
              {allTypes.map((type) => (
                <option key={type.idType} value={type.idType}>
                  {`${type.idType} - ${type.Nom}`}
                </option>
              ))}
            </select>



            </div>

            {/* Taxe */}
            <div style={{ marginBottom: "7px" }}>
              <label>Taxe</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                value={updatedProductData.Taxe || ""}
                type="number"
                name="Taxe"
                style={{ width: "100%" }}
                onChange={handleInputChange}
              />
            </div>

            {/* Description courte */}
            <div style={{ marginBottom: "7px" }}>
              <label>Description de l’article</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <textarea
                value={updatedProductData.DescriptionCourte || ""}
                name="DescriptionCourte"
                style={{ width: "100%", height: "120px" }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Description détaillée */}
            <div style={{ marginBottom: "7px" }}>
              <label>Description détaillée de l’article</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <textarea
                value={updatedProductData.DescriptionDétaillée || ""}
                name="DescriptionDétaillée"
                style={{ width: "100%", height: "120px" }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Ajoutez d'autres champs au besoin dans la colonne gauche */}
          </div>
        </div>

        {/* Colonne droite */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
            marginLeft: "90px",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            {selectedFile || updatedProductData.ImageUrl ? (
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : `https://localhost:8000${updatedProductData.ImageUrl}`
                }
                alt="Aperçu du produit"
                style={{
                  maxWidth: "90%",
                  maxHeight: "100%",
                  marginBottom: "20px",
                }}
                onError={() => console.log("Erreur lors du chargement de l'image")}
              />
            ) : null}

          
          </div>

          <form encType="multipart/form-data">
            {/* ... autres champs du formulaire ... */}
            <input
              type="file"
              name="ImageUrl"
              accept="image/*"
              onChange={handleFileChange}
              style={{ width: "auto", marginTop: "20px" }}
            />
            {/* ... autres champs du formulaire ... */}
          </form>


          {/* Boutons Annuler et Mettre à jour cet article */}
          <div
            className="flex mt-4 justify-center"
            style={{ width: "100%", marginTop: "150px" }}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFile(null);
              }}
              className="bg-gray-400 text-white p-2 rounded mr-2 hover:bg-gray-500"
            >
              Annuler
            </button>
            <button
              onClick={updateProduct}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Mettre à jour cet article
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductUpdateButton;
