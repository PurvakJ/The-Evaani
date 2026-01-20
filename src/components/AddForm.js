import { useState } from "react";
import { api } from "../api/api";

export default function AddForm({ sheetName, onAdded, fields = null, loading = false }) {
  const [row, setRow] = useState(() => {
    // Initialize based on sheet type
    if (sheetName === "menu") {
      return ["", "", "", "veg"]; // category, name, price, type (ID will be auto-generated)
    } else if (sheetName === "images") {
      return ["", ""]; // imageurl, title (ID will be auto-generated)
    } else if (sheetName === "offers") {
      return ["", "", "active"]; // title, description, status (ID will be auto-generated)
    } else if (sheetName === "reviews") {
      return ["", "", "", ""]; // name, email, rating, message (ID and date will be auto-generated)
    } else if (sheetName === "rooms") {
      return ["", "", ""]; // name, description, price (ID will be auto-generated)
    } else if (sheetName === "roomImages") {
      return ["", ""]; // roomId, imageurl (ID will be auto-generated)
    }
    return [""];
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Auto-generate ID and current date where needed
    const finalRow = [...row];
    
    if (sheetName === "menu") {
      finalRow.unshift(Date.now()); // Add ID at beginning
      // Ensure proper order: [id, category, name, price, type]
      // row array should be: [category, name, price, type]
      // finalRow becomes: [id, category, name, price, type]
    } else if (sheetName === "images") {
      finalRow.unshift(Date.now()); // Add ID
      // Ensure proper order: [id, imageURL, title]
      const imageURL = finalRow[1] || "";
      const title = finalRow[2] || "";
      finalRow[1] = imageURL;
      finalRow[2] = title;
    } else if (sheetName === "offers") {
      finalRow.unshift(Date.now()); // Add ID
    } else if (sheetName === "reviews") {
      finalRow.unshift(Date.now()); // Add ID
      finalRow[5] = new Date().toISOString().split('T')[0]; // Add date at the end
    } else if (sheetName === "rooms") {
      finalRow.unshift(Date.now()); // Add ID
    } else if (sheetName === "roomImages") {
      finalRow.unshift(Date.now()); // Add ID
    } else {
      finalRow.unshift(Date.now()); // Add ID for other sheets
    }

    console.log("Adding row to", sheetName, ":", finalRow); // Debug log
    
    await api({
      action: "add",
      sheet: sheetName,
      row: finalRow,
    });
    
    // Reset form
    if (sheetName === "menu") {
      setRow(["", "", "", "veg"]); // Reset to default "veg"
    } else if (sheetName === "images") {
      setRow(["", ""]);
    } else if (sheetName === "offers") {
      setRow(["", "", "active"]);
    } else if (sheetName === "reviews") {
      setRow(["", "", "", ""]);
    } else if (sheetName === "rooms") {
      setRow(["", "", ""]);
    } else if (sheetName === "roomImages") {
      setRow(["", ""]);
    } else {
      setRow([""]);
    }
    
    onAdded?.(); // Refresh data
  };

  const getFieldLabels = () => {
    if (fields) return fields;
    
    switch (sheetName) {
      case "menu": return ["Category", "Name", "Price", "Type"];
      case "images": return ["Image URL", "Title"];
      case "offers": return ["Title", "Description", "Status"];
      case "reviews": return ["Name", "Email", "Rating", "Message"];
      case "rooms": return ["Name", "Description", "Price"];
      case "roomImages": return ["Room ID", "Image URL"];
      default: return ["Value"];
    }
  };

  const fieldLabels = getFieldLabels();

  return (
    <div className="add-form-section">
      <h3>Add New to {sheetName}</h3>
      
      <form onSubmit={handleAdd} className={`${sheetName}-add-form`}>
        <div className="form-grid">
          {fieldLabels.map((label, idx) => (
            <div key={idx} className="form-group">
              <label>{label}:</label>
              
              {sheetName === "offers" && label === "Status" ? (
                <select
                  value={row[idx] || "active"}
                  onChange={(e) => {
                    const newRow = [...row];
                    newRow[idx] = e.target.value;
                    setRow(newRow);
                  }}
                  className="status-select"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              ) : sheetName === "menu" && label === "Type" ? (
                <div className="type-select-container">
                  <select
                    value={row[idx] || "veg"}
                    onChange={(e) => {
                      const newRow = [...row];
                      newRow[idx] = e.target.value;
                      setRow(newRow);
                    }}
                    className="type-select"
                    required
                  >
                    <option value="veg">🟢 Vegetarian</option>
                    <option value="nonveg">🔴 Non-Vegetarian</option>
                  </select>
                  <div className="type-indicator">
                    {row[idx] === "veg" ? "🟢" : "🔴"}
                  </div>
                </div>
              ) : label.toLowerCase() === "description" || 
                 label.toLowerCase() === "message" || 
                 (sheetName === "rooms" && label.toLowerCase() === "description") ? (
                <textarea
                  value={row[idx] || ""}
                  onChange={(e) => {
                    const newRow = [...row];
                    newRow[idx] = e.target.value;
                    setRow(newRow);
                  }}
                  className="add-form-input"
                  style={{ minHeight: '120px' }}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required
                />
              ) : (
                <input
                  type={label.toLowerCase() === "price" || 
                        label.toLowerCase() === "rating" ? "number" : "text"}
                  value={row[idx] || ""}
                  onChange={(e) => {
                    const newRow = [...row];
                    newRow[idx] = e.target.value;
                    setRow(newRow);
                  }}
                  className="add-form-input"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required={label !== "Status"}
                  min={label.toLowerCase() === "rating" ? "1" : undefined}
                  max={label.toLowerCase() === "rating" ? "5" : undefined}
                  step={label.toLowerCase() === "price" ? "0.01" : undefined}
                  pattern={label.toLowerCase() === "email" ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" : undefined}
                />
              )}
            </div>
          ))}
        </div>
        
        <button 
          type="submit" 
          className="add-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Adding...
            </>
          ) : (
            'Add'
          )}
        </button>
      </form>
    </div>
  );
}