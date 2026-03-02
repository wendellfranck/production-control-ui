import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [form, setForm] = useState({
    code: "",
    name: "",
    value: ""
  });

  const [selectedRawMaterialId, setSelectedRawMaterialId] = useState("");
  const [quantityRequired, setQuantityRequired] = useState("");
  const [productRawMaterials, setProductRawMaterials] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
    loadRawMaterials();
  }, []);

  async function loadProducts() {
    const response = await api.get("/products");
    setProducts(response.data);
  }

  async function loadRawMaterials() {
    const response = await api.get("/raw-materials");
    setRawMaterials(response.data);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleAddRawMaterial() {
    if (!selectedRawMaterialId || !quantityRequired) return;

    setProductRawMaterials([
      ...productRawMaterials,
      {
        rawMaterialId: parseInt(selectedRawMaterialId),
        quantityRequired: parseFloat(quantityRequired)
      }
    ]);

    setSelectedRawMaterialId("");
    setQuantityRequired("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const payload = {
      ...form,
      value: parseFloat(form.value),
      rawMaterials: productRawMaterials
    };
  
    if (editingId) {
      await api.put(`/products/${editingId}`, payload);
    } else {
      await api.post("/products", payload);
    }
  
    setForm({ code: "", name: "", value: "" });
    setProductRawMaterials([]);
    setEditingId(null);

    setIsModalOpen(false);
  
    loadProducts();
  }

  async function handleDelete(id) {
    await api.delete(`/products/${id}`);
    loadProducts();
  }

  function handleEdit(product) {
    setForm({
      code: product.code,
      name: product.name,
      value: product.value
    });
  
    setProductRawMaterials(product.rawMaterials || []);
    setEditingId(product.id);
    setIsModalOpen(true);
  }
  

  return (
    <div>
      <h2>Products</h2>
  
      <button onClick={() => setIsModalOpen(true)}>
        Add Product
      </button>
  
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Value</th>
            <th>Raw Materials</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.value}</td>
              <td>
                {product.rawMaterials?.map(rm => (
                  <div key={rm.rawMaterialId}>
                    {rm.rawMaterialName} ({rm.quantityRequired})
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button
                  className="delete"
                  onClick={async () => {
                    await api.delete(`/products/${product.id}`);
                    loadProducts();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {isModalOpen && (
        <Modal
          title={editingId ? "Edit Product" : "Add Product"}
          onClose={() => {
            setIsModalOpen(false);
            setEditingId(null);
            setForm({ code: "", name: "", value: "" });
            setProductRawMaterials([]);
          }}
        >
          <form onSubmit={handleSubmit}>
            <input
              name="code"
              placeholder="Code"
              value={form.code}
              onChange={handleChange}
            />
  
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
  
            <input
              name="value"
              type="number"
              placeholder="Value"
              value={form.value}
              onChange={handleChange}
            />
  
            <h4>Raw Materials</h4>
  
            <select
              value={selectedRawMaterialId}
              onChange={(e) => setSelectedRawMaterialId(e.target.value)}
            >
              <option value="">Select raw material</option>
              {rawMaterials.map(rm => (
                <option key={rm.id} value={rm.id}>
                  {rm.name}
                </option>
              ))}
            </select>
  
            <input
              type="number"
              placeholder="Quantity required"
              value={quantityRequired}
              onChange={(e) => setQuantityRequired(e.target.value)}
            />
  
            <button type="button" onClick={handleAddRawMaterial}>
              Add Material
            </button>
  
            <ul>
              {productRawMaterials.map((rm, index) => (
                <li key={index}>
                  {rm.rawMaterialId} - Qty: {rm.quantityRequired}
                </li>
              ))}
            </ul>
  
            <button type="submit">
              {editingId ? "Update Product" : "Create Product"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
