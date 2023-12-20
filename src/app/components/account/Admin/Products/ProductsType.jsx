
import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken } from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import TypeDeleteButton from "./TypeDeleteButton";
import TypeUpdateButton from "./TypeUpdateButton";
import Modal from "react-modal";

const ProductsType = () => {

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
      }
    };

    fetchData();
  }, [token, isAddModalOpen]);



  const handleTypeDeleted = async ({ productId }) => {
    try {
      await axios.delete(`https://localhost:8000/api/types/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      // Mettez à jour l'état local pour refléter la suppression du type
      setTypes((prevTypes) => prevTypes.filter((type) => type.idType !== productId));
      setMessage(`Type ${productId} supprimé avec succès.`);
    } catch (error) {
    }finally {
      handleReloadTypes(); // Recharger la liste des types
    }
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
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const resetFilePreview = () => {
    setSelectedFile(null);
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await axios.delete(
        "https://localhost:8000/api/types",
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: { selectedProducts },
        }
      );
  
      // Mettez à jour l'état ou effectuez d'autres actions si nécessaire
      console.log(response.data);
    } catch (error) {
    }finally {
      handleReloadTypes(); // Recharge la liste des types
    }



  };
 
  const handleReloadTypes = async () => {
    try {
      console.log('Reloading types...');
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
    }
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
      resetFilePreview();
    }}
    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mr-2"
  >
    Nouveau
  </button>

  <button
    onClick={handleDeleteButtonClick}
    className={`ml-4 p-2 rounded ${
      selectedProducts.length > 0
        ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
    disabled={selectedProducts.length === 0}
  >
    Supprimer
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
  style={{ width: "100%", marginTop: "0px" }}
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
              onClick={() => handleAddType()}
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

export default ProductsType;
