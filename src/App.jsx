import { useState } from "react";
import Products from "./pages/Products";
import RawMaterials from "./pages/RawMaterials";
import Production from "./pages/Production";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container">
      <h1>Production Control System</h1>

      <Products onChange={() => setRefreshKey(prev => prev + 1)}/>
      <hr />
      <RawMaterials onChange={() => setRefreshKey(prev => prev + 1)} />
      <hr />
      <Production refreshKey={refreshKey} />
    </div>
  );
}

export default App;
