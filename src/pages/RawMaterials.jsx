import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

export default function RawMaterials({ onChange }) {
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    code: "",
    name: "",
    stockQuantity: ""
  });

  useEffect(() => {
    loadMaterials();
  }, []);

  async function loadMaterials() {
    const response = await api.get("/raw-materials");
    setMaterials(response.data);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const payload = {
      ...form,
      stockQuantity: parseFloat(form.stockQuantity)
    };
  
    if (editingId) {
      await api.put(`/raw-materials/${editingId}`, payload);
    } else {
      await api.post("/raw-materials", payload);
    }
  
    setForm({ code: "", name: "", stockQuantity: "" });
    setEditingId(null);
    setIsModalOpen(false);
  
    loadMaterials();
    if (onChange) onChange();
  }

  function handleEdit(material) {
    setForm({
      code: material.code,
      name: material.name,
      stockQuantity: material.stockQuantity
    });
  
    setEditingId(material.id);
    setIsModalOpen(true);
  }

  return (
    <div>
      <h2>Raw Materials</h2>

      <button onClick={() => setIsModalOpen(true)}>
        Add Raw Material
      </button>
      <div className="table-wrapper">
        <table border="1">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => (
              <tr key={material.id}>
                <td>{material.code}</td>
                <td>{material.name}</td>
                <td>{material.stockQuantity}</td>
                <td>
                  <button onClick={() => handleEdit(material)}>Edit</button>
                  <button
                    className="delete"
                    onClick={async () => {
                      await api.delete(`/raw-materials/${material.id}`);
                      loadMaterials();
                      if (onChange) onChange();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isModalOpen && (
        <Modal
          title={editingId ? "Edit Raw Material" : "Add Raw Material"}
          onClose={() => {
            setIsModalOpen(false);
            setEditingId(null);
            setForm({ code: "", name: "", stockQuantity: "" });
          }}
        >
          <form onSubmit={handleSubmit}>
            <input
              name="code"
              placeholder="Code"
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value })
              }
            />

            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              name="stockQuantity"
              type="number"
              placeholder="Stock Quantity"
              value={form.stockQuantity}
              onChange={(e) =>
                setForm({ ...form, stockQuantity: e.target.value })
              }
            />

            <button type="submit">
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
