import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken} from "../../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import ProductDeleteButton from "./ProductDeleteButton";

const ProductsList = () => {
  const token = useSelector(selectToken);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:8000/api/products",
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

  const handleProductDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `https://localhost:8000/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessage(response.data.message);
  
      // Supprime le produit supprimé de l'état
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId));
        
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      setMessage("Une erreur s'est produite lors de la suppression du produit.");
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
              <td className="p-2 md:flex gap-1">
                <ProductDeleteButton
                  productId={product.id}
                  token={token}
                  onDelete={handleProductDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
