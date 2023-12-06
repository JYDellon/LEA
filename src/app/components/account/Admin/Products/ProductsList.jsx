import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken} from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import ProductDeleteButton from "./ProductDeleteButton";
import ProductUpdateButton from "./ProductUpdateButton";
import ProductReadButton from "./ProductReadButton";

const ProductsList = () => {
  const token = useSelector(selectToken);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);

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
        console.error("Erreur lors de la récupération des données produit :", error);
      }
    };

    fetchData();
  }, [token]);

  const handleProductDeleted = ({productId}) => {
     // Mettez à jour l'état des produits en excluant le produit supprimé
     setProducts((products) => products.filter((product) => product.id !== productId));
  };


  const handleProductRead = ({productId}) => {
    
 };

 const handleProductUpdated = async ({ productId, updatedProductData }) => {
  try {
    const response = await axios.put(
      `https://localhost:8000/api/products/${productId}`,
      updatedProductData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Mettre à jour l'état des produits avec les données mises à jour
    setProducts((products) =>
      products.map((product) =>
        product.id === productId ? response.data : product
      )
    );

    // Afficher un message de succès ou faire d'autres actions nécessaires
    setMessage("Le produit a été mis à jour avec succès.");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
  }
};

  

  
  return (
    <div className="md:col-span-3 p-4 overflow-scroll max-h-[100vh]">
      <h1 className="text-2xl mb-10 font-bold">
        Administration - Liste des produits
      </h1>
      {message && <p>{message}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-t-2 border-customDark">
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
    </div>
  );
};

export default ProductsList;