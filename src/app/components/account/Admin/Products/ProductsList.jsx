
import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken } from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import ProductDeleteButton from "./ProductDeleteButton";
import ProductUpdateButton from "./ProductUpdateButton";
import ProductReadButton from "./ProductReadButton";
import Modal from "react-modal";

const ProductsList = () => {
  const token = useSelector(selectToken);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    Nom: "",
    Stock: "",
    Référence: "",
    Prix: "",
    Taxe: "",
    DescriptionCourte: "",
    DescriptionDétaillée: "",
    Conditionnement: "",
    product_type_id: "2",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:8000/api/admin/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données produit :",
          error
        );
      }
    };

    fetchData();
  }, [token, isAddModalOpen]);

  const handleProductDeleted = ({ productId }) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleProductRead = ({ productId }) => {
    // Ajoutez la logique nécessaire pour lire un produit
  };

  const handleProductUpdated = async ({ productId, updatedProductData }) => {
    try {
      await axios.put(
        `https://localhost:8000/api/products/${productId}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Le produit a été mis à jour avec succès.");
    } catch (error) {
      setMessage(
        
          );
    } finally {
      // Actualiser la liste des produits après chaque mise à jour
      const updatedData = await axios.get(
        "https://localhost:8000/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(updatedData.data);
    }
  };

  const handleNewProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "https://localhost:8000/api/product",
        newProductData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Nouveau produit créé avec succès. Response :", response.data);

      setProducts((prevProducts) => [...prevProducts, response.data]);
      setMessage("Nouveau produit créé avec succès.");

      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création du nouveau produit :", error);
      setMessage("Erreur lors de la création du nouveau produit.");
      setIsAddModalOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleDeleteSelected = async () => {
    try {
      await axios.delete(
        "https://localhost:8000/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productIds: selectedProducts },
        }
      );
  
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => !selectedProducts.includes(product.id)
        )
      );
  
      setMessage("Les produits sélectionnés ont été supprimés avec succès.");
      setSelectedProducts([]);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des produits sélectionnés :",
        error.response
      );
  
      // Vérifiez si error.response est défini et s'il a une propriété message
      const errorMessage = error.response
        ? error.response.data && error.response.data.message
        : "Une erreur inattendue s'est produite lors de la suppression des produits sélectionnés.";
  
      setMessage(errorMessage);
    }
  };
  

  return (
    <div className="md:col-span-3 p-4 overflow-scroll max-h-[100vh]">
      <h1 className="text-2xl mb-10 font-bold">
        Administration - Liste des produits
      </h1>

      <div className="mb-4">
        <button
          onClick={handleNewProduct}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Nouveau
        </button>
        <button
          onClick={handleDeleteSelected}
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
                    setSelectedProducts(products.map((product) => product.id));
                  } else {
                    setSelectedProducts([]);
                  }
                }}
              />
            </th>
            <th className="min-w-1/12 p-2 text-left">ID</th>
            <th className="min-w-1/3 p-2 text-left">Nom</th>
            <th className="min-w-1/3 p-2 text-left">Stock</th>
            <th className="min-w-1/2 p-2 text-left">Référence</th>
            <th className="min-w-1/2 p-2 text-left">Prix</th>
            <th className="min-w-1/2 p-2 text-left">Taxe</th>
            <th className="min-w-1/2 p-2 text-left">Description</th>
            <th className="min-w-1/2 p-2 text-left">Description détaillée</th>
            <th className="min-w-1/2 p-2 text-left">Conditionnement</th>
            <th className="min-w-1/2 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="p-2">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(product.id)}
                  checked={selectedProducts.includes(product.id)}
                />
              </td>
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.Nom}</td>
              <td className="p-2">{product.Stock}</td>
              <td className="p-2">{product.Référence} </td>
              <td className="p-2">{product.Prix}</td>
              <td className="p-2">{product.Taxe}</td>
              <td className="p-2">{product.DescriptionCourte}</td>
              <td className="p-2">{product.DescriptionDétaillée}</td>
              <td className="p-2">{product.Conditionnement}</td>

              <td className="align-middle text-center p-2">
                <div className="flex items-center space-x-2">
                  <ProductUpdateButton
                    key={product.id}
                    productId={product.id}
                    onProductUpdated={handleProductUpdated}
                  />
                  <ProductReadButton
                    key2={product.id}
                    productId={product.id}
                    onProductRead={handleProductRead}
                  />
                  <ProductDeleteButton
                    key3={product.id}
                    productId={product.id}
                    onProductDeleted={handleProductDeleted}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale pour ajouter un nouveau produit */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        contentLabel="Modal d'ajout d'un nouveau produit"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "900px",
            height: "500px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {/* ... (contenu de la modal) */}
      </Modal>
    </div>
  );
};

export default ProductsList;
