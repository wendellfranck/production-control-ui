import { useState } from "react";
import Products from "./pages/Products";
import RawMaterials from "./pages/RawMaterials";
import Production from "./pages/Production";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app-container">
      <h1>Production Control System</h1>

      <div className="card">
        <Products onChange={() => setRefreshKey(prev => prev + 1)}/>
      </div>
      <div className="card">
        <RawMaterials onChange={() => setRefreshKey(prev => prev + 1)} />
      </div>
      <div className="card">
        <Production refreshKey={refreshKey} />
      </div>  
    </div>
  );
}

export default App;
