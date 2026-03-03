# 🏭 Production Control System - Frontend

Frontend application developed to manage products, raw materials and production suggestions.

This application consumes the Production Control API and provides a modern, responsive user interface for interacting with the system.

---

## 🚀 Tech Stack

- React 18
- Vite
- JavaScript (ES6+)
- Axios
- Custom CSS (responsive layout)
- REST API integration

---

## 📌 Features

### 📦 Products
- Create product
- Edit product
- Delete product
- Associate raw materials with quantity required
- Modal-based UI for better UX

### 🧱 Raw Materials
- Create raw material
- Edit raw material
- Delete raw material
- Manage stock quantity

### 🏭 Production Suggestion
- Calculates possible production based on available stock
- Automatically updates when products or stock change
- Displays:
  - Product name
  - Quantity possible
  - Unit value
  - Total production value
  - Total production value summary

---

## 🧠 Business Rule

The system calculates production suggestions using the following logic:

1. Products are sorted by unit value (descending).
2. For each product:
   - The system checks available raw material stock.
   - Calculates maximum possible production.
   - Simulates stock consumption.
3. The final result maximizes total production value.

---

## 🖥️ UI Highlights

- Modern modal-based forms
- Responsive layout (mobile friendly)
- Scrollable tables on small screens
- Clean SaaS-style interface
- Automatic reactivity without page reload

---

## 🔧 Running the Project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/wendellfranck/production-control-ui.git
cd production-control-ui
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

The application will be available at:

http://localhost:5173


## 🔗 Backend Requirement

This frontend requires the Production Control API running locally.

Default backend URL:

http://localhost:8080


## 📁 Project Structure

src/
 ├── components/
 │    └── Modal.jsx
 ├── pages/
 │    ├── Products.jsx
 │    ├── RawMaterials.jsx
 │    └── Production.jsx
 ├── services/
 │    └── api.js
 ├── App.jsx
 └── main.jsx

## 🎯 Design Decisions

State lifting in App.jsx to synchronize production suggestion updates.

Controlled form components for predictable behavior.

Clear separation of concerns (pages vs services vs components).

Minimal external dependencies for simplicity and maintainability.

---

## 🧪 End-to-End Testing

This project includes Cypress E2E tests.

To run Cypress:

```bash
npx cypress open
```

## 📌 Author

Wendell Lavor
Full Stack Developer