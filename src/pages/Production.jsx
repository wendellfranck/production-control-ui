import { useEffect, useState } from "react";
import api from "../services/api";

export default function Production({ refreshKey }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadSuggestion();
  }, [refreshKey]);

  async function loadSuggestion() {
    try {
      const response = await api.get("/production/suggestion");
      setData(response.data);
    } catch (error) {
      console.error("Error loading production suggestion:", error);
    }
  }

  if (!data) return <p>Loading production suggestion...</p>;

  return (
    <div>
      <h2>Production Suggestion</h2>

      {data.suggestions.length === 0 ? (
        <p>No production possible with current stock.</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table border="1">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Value</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.suggestions.map(item => (
                    <tr key={item.productId}>
                      <td>{item.productName}</td>
                      <td>{item.quantityCanProduce}</td>
                      <td>{item.productValue}</td>
                      <td>{item.totalValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
          <h3>Total Production Value: {data.totalProductionValue}</h3>
        </>
      )}
    </div>
  );
}
