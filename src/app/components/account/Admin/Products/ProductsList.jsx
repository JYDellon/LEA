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
  const [types, setTypes] = useState([]);
  const [message, setMessage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    stock: "",
    reference: "",
    price: "",
    taxe: "",
    description: "",
    detailedDescription: "",
    mesurement: "",
    slug:"kuyfkf",
    product_type_id: "",
    imagePath: "",
    created_at: new Date().toISOString().split('.')[0],
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "https://localhost:8000/api/admin/products",
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
      setMessage("Erreur lors de la mise à jour du produit.");
    } finally {
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
    resetFilePreview(); // Réinitialise l'aperçu du fichier lorsque la modal est ouverte
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "https://localhost:8000/api/product",
        JSON.stringify(newProductData),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

      const errorMessage = error.response
        ? error.response.data && error.response.data.message
        : "Une erreur inattendue s'est produite lors de la suppression des produits sélectionnés.";

      setMessage(errorMessage);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://localhost:8000/api/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewProductData((prevData) => ({
        ...prevData,
        imagePath: response.data.path,
      }));

      console.log("Fichier téléchargé avec succès. Réponse :", response.data);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier :", error);
    }
  };

  const resetFilePreview = () => {
    setSelectedFile(null);
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

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => {
          setIsAddModalOpen(false);
          resetFilePreview(); // Réinitialise l'aperçu du fichier lorsque la modal est fermée
        }}
        contentLabel="Modal d'ajout d'un nouveau produit"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            margin: "-45px",
          },
          content: {
            width: "96%",
            height: "92%",
            maxWidth: "96%",
            maxHeight: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          },
        }}
      >
        {/* Colonne gauche */}
        <div style={{ flex: 1, marginRight: "20px" }}>
          <div style={{ margin: "20px" }}>
          
            <a
              href="#"
              onClick={() => setIsAddModalOpen(false)}
              className="text-blue-500 underline mb-4"
            >
              
              Retour sur Administration - Liste des produits
            </a>

            <p className="text-xl font-bold mb-4" style={{ marginTop: "45px", marginBottom: "27px" }}>
              Ajouter un nouvel article
            </p>

            <hr style={{ marginBottom: "20px", borderTop: "2px solid #ccc" }} />

            {/* Nom du produit */}
            <div style={{ marginBottom: "7px" }}>
              <label>Nom du produit</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="name"
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
                type="text"
                name="reference"
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
                type="number"
                name="price"
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
                type="text"
                name="mesurement"
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
                type="number"
                name="stock"
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
                name="product_type_id"
                style={{ width: "50%" }}
                onChange={(e) => {
                  const selectedType = types.find((type) => type.idType === parseInt(e.target.value));
                  setNewProductData((prevData) => ({
                    ...prevData,
                    product_type_id: selectedType ? selectedType.idType : "",
                  }));
                }}
              >
                {types.map((type) => (
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
                name="Description"
                style={{ width: "100%", height:"120px" }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Description détaillée */}
            <div style={{ marginBottom: "7px" }}>
              <label>Description détaillée de l’article</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <textarea
                name="detailed_description"
                style={{ width: "100%", height:"120px" }}
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
        }}
      >
        <div
            style={{
              width: "500px",
              height: "550px",
              border: "2px solid #ccc",
              position: "relative",
            }}
          >
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Aperçu de l'image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        <input
          type="file"
          name="productImage"
          accept="image/*"
          onChange={handleFileChange}
          style={{ width: "auto", marginTop: "20px" }}
        />

        {/* Boutons Annuler et Créer cet article */}
        <div className="flex mt-4 justify-center" style={{ width: "100%", marginTop: "150px" }}>
          <button
            onClick={() => {
              setIsAddModalOpen(false);
              setselectedFile(null);
            }}
            className="bg-gray-400 text-white p-2 rounded mr-2 hover:bg-gray-500"
          >
            Annuler
          </button>
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Créer cet article
          </button>
        </div>
      </div>
    </Modal>


    </div>
  );
};

export default ProductsList;
