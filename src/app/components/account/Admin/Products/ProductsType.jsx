import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken } from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import TypeDeleteButton from "./TypeDeleteButton";
import TypeUpdateButton from "./TypeUpdateButton";
import Modal from "react-modal";

const ProductsList = () => {
  const token = useSelector(selectToken);
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [, forceUpdate] = React.useState();
  const [newProductData, setNewProductData] = useState({
    idType: "",
    typeName: "",
  });
const [newTypeData, setNewTypeData] = useState({
  typeName: "",
});

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "https://localhost:8000/api/types",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const typesResponse = await axios.get(
          "https://localhost:8000/api/types",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(productsResponse.data);
        setTypes(typesResponse.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données produit :",
          error
        );
      }
    };

    fetchData();
  }, [token, isAddModalOpen]);

  const handleTypeDeleted = ({ productId }) => {
    setProducts((prevProducts) =>
      prevProducts.filter((type) => type.idType !== productId)
    );
  };

  const handleTypeUpdated = async ({ productId, updatedProductData }) => {
    try {
      await axios.put(
        `https://localhost:8000/api/types/${productId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessage("Le type a été mis à jour avec succès.");
    } catch (error) {
      setMessage("Erreur lors de la mise à jour du produit.");
    } finally {
      setIsAddModalOpen(false); // Fermer la modal
      handleReloadTypes(); // Recharger la liste des types
    }
  };



const handleTypeAdded = () => {
  setIsAddModalOpen(false); // Fermer la modal
  refreshTypes(); // Recharger la liste des types
};

  const handleNewProduct = () => {
    setIsAddModalOpen(true);
    resetFilePreview(); // Réinitialise l'aperçu du fichier lorsque la modal est ouverte
  };

  
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTypeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddType = async () => {
    try {
      const response = await axios.post(
        "https://localhost:8000/api/types",
        JSON.stringify(newTypeData),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setTypes((prevTypes) => [...prevTypes, response.data]);
      setMessage("Nouveau type créé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création du nouveau type :", error);
      setMessage("Erreur lors de la création du nouveau type.");
    } finally {
      setIsAddModalOpen(false); // Fermer la modal
    }
  };

const handleTypesReload = (reloadedTypes) => {
  setTypes(reloadedTypes);
};

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const refreshTypes = async () => {
    try {
      const typesResponse = await axios.get(
        "https://localhost:8000/api/types",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTypes(typesResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données produit :", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const resetFilePreview = () => {
    setSelectedFile(null);
  };

  return (
    <div className="md:col-span-3 p-4 overflow-scroll max-h-[100vh]">
      <h1 className="text-2xl mb-10 font-bold">
        Administration - Liste des types
      </h1>

      <div className="mb-4">
        
        <button
  onClick={() => {
    setIsAddModalOpen(true);
    resetFilePreview(); // Réinitialise l'aperçu du fichier lorsque la modal est ouverte
  }}
  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
>
  Nouveau
</button>

      </div>

      {message && <p>{message}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-t-2 border-customDark">
            <th className="min-w-1/12 p-2 text-left">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProducts(products.map((type) => type.idType));
                  } else {
                    setSelectedProducts([]);
                  }
                }}
              />
            </th>
            <th className="min-w-1/12 p-2 text-left">ID</th>
            <th className="min-w-1/3 p-2 text-left">Nom</th>
            <th className="min-w-1/2 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.idType}>
              <td className="p-2">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(type.idType)}
                  checked={selectedProducts.includes(type.idType)}
                />
              </td>
              <td className="p-2">{type.idType}</td>
              <td className="p-2">{type.Nom}</td>

              <td className="align-middle text-center p-2">
                <div className="flex items-center space-x-2">
                <TypeUpdateButton
        productId={type.idType}
        onTypeUpdated={handleTypeUpdated}
        refreshTypes={refreshTypes} 
      />
                  
                  <TypeDeleteButton
                    key3={type.idType}
                    productId={type.idType}
                    onTypeDeleted={handleTypeDeleted}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => {
          setIsAddModalOpen(false);
          resetFilePreview(); // Réinitialise l'aperçu du fichier lorsque la modal est fermée
          handleReloadTypes(); // Recharge les types lors de la fermeture de la modal
        }}
        contentLabel="Modal d'ajout d'un nouveau type"
        style={{
          // ... (styles de la modal)
        }}
      >
        {/* Colonne gauche */}
        <div style={{ flex: 1, marginRight: "20px", width: "33%", margin: "0 auto" }}>
          <div style={{ margin: "20px" }}>
          
            <a
              href="#"
              onClick={() => setIsAddModalOpen(false)}
              className="text-blue-500 underline mb-4"
            >
              
              Retour sur Administration - Liste des types
            </a>

            <p className="text-xl font-bold mb-4" style={{ marginTop: "45px", marginBottom: "27px" }}>
              Ajouter un nouveau type
            </p>

            <hr style={{ marginBottom: "20px", borderTop: "2px solid #ccc" }} />

            <div style={{ marginBottom: "7px" }}>
  <label>Nom du type</label>
</div>
<div style={{ marginBottom: "20px" }}>
<input
  type="text"
  name="typeName" // Assurez-vous que le nom correspond au champ attendu par le backend
  style={{ width: "100%" }}
  onChange={handleInputChange}
/>
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
        }}
      >
        

        {/* Boutons Annuler et Créer ce type */}
<div
  className="flex mt-4 justify-center"
  style={{ width: "100%", marginTop: "00px" }}
>
<button
              onClick={() => {
                setIsAddModalOpen(false);
                resetFilePreview();
              }}
              className="bg-gray-400 text-white p-2 rounded mr-2 hover:bg-gray-500"
            >
              Annuler
            </button>
            <button
              onClick={() => handleAddType(handleTypeAdded)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Créer ce type
            </button>
        </div>
      </div>
    </Modal>


    </div>
  );
};

export default ProductsList;