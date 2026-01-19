import { useState } from "react";
import { api } from "../api/api";

export default function AddForm({ sheetName, onAdded, fields = null, loading = false }) {
  const [row, setRow] = useState(() => {
    // Initialize based on sheet type
    if (sheetName === "menu") {
      return ["", "", ""]; // category, name, price (ID will be auto-generated)
    } else if (sheetName === "images") {
      return ["", ""]; // imageurl, title (ID will be auto-generated)
    } else if (sheetName === "offers") {
      return ["", "", "active"]; // title, description, status (ID will be auto-generated)
    } else if (sheetName === "reviews") {
      return ["", "", "", ""]; // name, email, rating, message (ID and date will be auto-generated)
    }
    return [""];
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Auto-generate ID and current date where needed
    const finalRow = [...row];
    
    if (sheetName === "menu") {
      finalRow.unshift(Date.now()); // Add ID at beginning
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
    } else {
      finalRow.unshift(Date.now()); // Add ID for other sheets
    }

    await api({
      action: "add",
      sheet: sheetName,
      row: finalRow,
    });
    
    // Reset form
    if (sheetName === "menu") {
      setRow(["", "", ""]);
    } else if (sheetName === "images") {
      setRow(["", ""]);
    } else if (sheetName === "offers") {
      setRow(["", "", "active"]);
    } else if (sheetName === "reviews") {
      setRow(["", "", "", ""]);
    } else {
      setRow([""]);
    }
    
    onAdded?.(); // Refresh data
  };

  const getFieldLabels = () => {
    if (fields) return fields;
    
    switch (sheetName) {
      case "menu": return ["Category", "Name", "Price"];
      case "images": return ["Image URL", "Title"];
      case "offers": return ["Title", "Description", "Status"];
      case "reviews": return ["Name", "Email", "Rating", "Message"];
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