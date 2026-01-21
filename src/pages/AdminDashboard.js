import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useData } from "../App";
import AddForm from "../components/AddForm";
import "../styles/AdminDashboard.css"

export default function AdminDashboard() {
  const navigate = useNavigate();

  /* ================= AUTH ================= */
  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  /* ================= USE CONTEXT DATA ================= */
  const { 
    menu = [], 
    rooms = [], 
    images = [], 
    offers = [], 
    reviews = [], 
    imagesByRoomId = {},
    refreshData 
  } = useData();

  /* ================= STATE ================= */
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [tab, setTab] = useState("menu");
  const [editData, setEditData] = useState(null);
  const [editSheet, setEditSheet] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  // Filter states
  const [menuFilter, setMenuFilter] = useState({ name: "", category: "", minPrice: "", maxPrice: "" });
  const [roomFilter, setRoomFilter] = useState({ name: "", minPrice: "", maxPrice: "" });
  // Fixed: Remove unused setImageFilter - only use imageFilter value
  const [imageFilter, setImageFilter] = useState({ title: "" });
  const [offerFilter, setOfferFilter] = useState("all");
  
  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    add: { sheet: "", loading: false },
    update: { id: "", loading: false },
    delete: { id: "", loading: false },
    upload: false
  });

  // State for adding new room images
  const [newRoomImages, setNewRoomImages] = useState([]);
  const [newRoomImageInputs, setNewRoomImageInputs] = useState([""]);
  
  // State for room operations
  const [addRoomLoading, setAddRoomLoading] = useState(false);
  
  /* ================= FILTERED DATA ================= */
  const filteredMenu = useMemo(() => {
    if (!menu || menu.length === 0) return [];
    return menu.filter(item => {
      const name = item[2] || "";
      const category = item[1] || "";
      const price = parseFloat(item[3]) || 0;
      
      if (menuFilter.name && !name.toLowerCase().includes(menuFilter.name.toLowerCase())) {
        return false;
      }
      
      if (menuFilter.category && !category.toLowerCase().includes(menuFilter.category.toLowerCase())) {
        return false;
      }
      
      if (menuFilter.minPrice && price < parseFloat(menuFilter.minPrice)) {
        return false;
      }
      
      if (menuFilter.maxPrice && price > parseFloat(menuFilter.maxPrice)) {
        return false;
      }
      
      return true;
    });
  }, [menu, menuFilter]);

  const filteredRooms = useMemo(() => {
    if (!rooms || rooms.length === 0) return [];
    return rooms.filter(room => {
      const name = room[1] || "";
      const price = parseFloat(room[3]) || 0;
      
      if (roomFilter.name && !name.toLowerCase().includes(roomFilter.name.toLowerCase())) {
        return false;
      }
      
      if (roomFilter.minPrice && price < parseFloat(roomFilter.minPrice)) {
        return false;
      }
      
      if (roomFilter.maxPrice && price > parseFloat(roomFilter.maxPrice)) {
        return false;
      }
      
      return true;
    });
  }, [rooms, roomFilter]);

  // Fixed: Remove filteredImages if not used, or add it to JSX
  const filteredImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.filter(img => {
      const title = img[2] || "";
      
      if (imageFilter.title && !title.toLowerCase().includes(imageFilter.title.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [images, imageFilter]);

  const filteredOffers = useMemo(() => {
    if (!offers || offers.length === 0) return [];
    if (offerFilter === "all") return offers;
    return offers.filter(offer => {
      const status = (offer[3] || "").toLowerCase();
      return offerFilter === "active" ? status === "active" : status !== "active";
    });
  }, [offers, offerFilter]);

  // Group menu by category
  const groupedMenu = useMemo(() => {
    if (!filteredMenu) return {};
    const grouped = {};
    filteredMenu.forEach((item, idx) => {
      const cat = item[1] || "Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      const sheetRow = menu.findIndex(m => m[0] === item[0]) + 2;
      grouped[cat].push({ row: item, sheetRow });
    });
    return grouped;
  }, [filteredMenu, menu]);

  /* ================= LOADING HELPERS ================= */
  const setLoading = (type, id, loading) => {
    setLoadingStates(prev => ({
      ...prev,
      [type]: type === "add" ? { sheet: id, loading } : { id, loading }
    }));
  };

  const isLoading = (type, id = "") => {
    if (type === "add") {
      return loadingStates.add.loading && loadingStates.add.sheet === id;
    }
    if (type === "update") {
      return loadingStates.update.loading && loadingStates.update.id === id;
    }
    if (type === "delete") {
      return loadingStates.delete.loading && loadingStates.delete.id === id;
    }
    return false;
  };

  /* ================= NEW ROOM IMAGE HANDLING ================= */
  const handleNewRoomImageDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRoomImages(prev => [...prev, reader.result]);
        setNewRoomImageInputs(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Fixed: Add handleNewRoomImageUpload or remove if not needed
  const handleNewRoomImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRoomImages(prev => [...prev, reader.result]);
        setNewRoomImageInputs(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addNewRoomImageInput = () => {
    setNewRoomImageInputs([...newRoomImageInputs, ""]);
  };

  const updateNewRoomImageInput = (index, value) => {
    const newInputs = [...newRoomImageInputs];
    newInputs[index] = value;
    setNewRoomImageInputs(newInputs);
  };

  const removeNewRoomImageInput = (index) => {
    const newInputs = newRoomImageInputs.filter((_, i) => i !== index);
    setNewRoomImageInputs(newInputs);
  };

  /* ================= ROOM MULTI-IMAGE UPLOAD ================= */
  const handleRoomImagesUpload = async (files, roomId) => {
    setLoading("add", `room-images-${roomId}`, true);
    const uploads = Array.from(files).map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await api({
          action: "add",
          sheet: "roomImages",
          row: [Date.now(), roomId, reader.result],
        });
        resolve();
      };
      reader.readAsDataURL(file);
    }));
    await Promise.all(uploads);
    setLoading("add", `room-images-${roomId}`, false);
    refreshData();
  };

  /* ================= ADD NEW ROOM ================= */
  const handleAddRoom = async (e) => {
    e.preventDefault();
    const form = e.target;
    const id = Date.now();
    const name = form.name.value;
    const description = form.description.value;
    const price = form.price.value;
    
    const validImages = [];
    
    newRoomImages.forEach(img => validImages.push(img));
    
    newRoomImageInputs.forEach(url => {
      if (url.trim() && !newRoomImages.includes(url)) {
        validImages.push(url);
      }
    });
    
    if (validImages.length === 0) {
      alert("Please add at least one image for the room");
      return;
    }
    
    setAddRoomLoading(true);
    
    try {
      await api({
        action: "add",
        sheet: "rooms",
        row: [id, name, description, price]
      });
      
      for (const image of validImages) {
        await api({
          action: "add",
          sheet: "roomImages",
          row: [Date.now() + Math.random(), id, image]
        });
      }
      
      form.reset();
      setNewRoomImages([]);
      setNewRoomImageInputs([""]);
      refreshData();
      alert("Room added successfully!");
    } catch (error) {
      alert("Error adding room: " + error.message);
    } finally {
      setAddRoomLoading(false);
    }
  };

  // Fixed: Remove uploadLoading state if not used, or use it
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleImageUpload = async (file, title = "", url = "") => {
    if (!file && !url) {
      alert("Please select an image or enter an image URL");
      return;
    }
  
    setUploadLoading(true);
  
    try {
      // ✅ CASE 1: Image URL
      if (url) {
        await api({
          action: "add",
          sheet: "images",
          row: [
            Date.now(),
            url.trim(), // image URL
            title
          ],
        });
  
        refreshData();
        alert("Image added successfully");
        return;
      }
  
      // ✅ CASE 2: File upload
      if (!file.type.startsWith("image/")) {
        alert("Invalid image file");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = async () => {
        await api({
          action: "add",
          sheet: "images",
          row: [
            Date.now(),
            reader.result, // base64
            title
          ],
        });
  
        refreshData();
        alert("Image uploaded successfully");
      };
  
      reader.readAsDataURL(file);
  
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const submitEdit = async () => {
    setLoading("update", editData.rowIndex, true);
    await api({
      action: "update",
      sheet: editSheet,
      rowIndex: editData.rowIndex,
      row: editData.values,
    });
    setEditData(null);
    setLoading("update", editData.rowIndex, false);
    refreshData();
  };

  /* ================= DELETE ================= */
  const deleteRow = async (sheet, rowIndex, id = "") => {
    if (!window.confirm("Delete this item?")) return;
    setLoading("delete", rowIndex, true);
    await api({ action: "delete", sheet, rowIndex });
    setLoading("delete", rowIndex, false);
    refreshData();
  };

  /* ================= TOGGLE OFFER STATUS ================= */
  const toggleOfferStatus = async (offer, rowIndex) => {
    setLoading("update", `offer-${rowIndex}`, true);
    const newStatus = offer[3] === "active" ? "inactive" : "active";
    await api({
      action: "update",
      sheet: "offers",
      rowIndex,
      row: [offer[0], offer[1], offer[2], newStatus]
    });
    setLoading("update", `offer-${rowIndex}`, false);
    refreshData();
  };

  /* ================= PASSWORD ================= */
  const changeAdminPassword = async () => {
    if (!adminPassword) {
      alert("Please enter a new password");
      return;
    }
    
    setLoading("update", "password", true);
    await api({
      action: "updatePassword",
      email: "admin@evaani.com",
      newPassword: adminPassword,
    });
    setLoading("update", "password", false);
    alert("Password updated");
    setAdminPassword("");
    refreshData();
  };

  /* ================= MENU WITH CATEGORY ================= */
  const renderMenu = () => {
    return (
      <>
        <div className="filter-section">
          <h4>Filter Menu Items</h4>
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by name"
              value={menuFilter.name}
              onChange={(e) => setMenuFilter({...menuFilter, name: e.target.value})}
              className="filter-input"
            />
            <input
              type="text"
              placeholder="Filter by category"
              value={menuFilter.category}
              onChange={(e) => setMenuFilter({...menuFilter, category: e.target.value})}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Min price"
              value={menuFilter.minPrice}
              onChange={(e) => setMenuFilter({...menuFilter, minPrice: e.target.value})}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Max price"
              value={menuFilter.maxPrice}
              onChange={(e) => setMenuFilter({...menuFilter, maxPrice: e.target.value})}
              className="filter-input"
            />
            <button 
              className="clear-filter-btn"
              onClick={() => setMenuFilter({ name: "", category: "", minPrice: "", maxPrice: "" })}
            >
              Clear Filters
            </button>
          </div>
          <p className="filter-results">
            {menu.length === 0 
              ? "No menu items available" 
              : filteredMenu.length === 0 
                ? `No items found (${menu.length} total items)` 
                : `Showing ${filteredMenu.length} of ${menu.length} items`
            }
          </p>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="no-data-message">
            <p>No menu items found matching your filters.</p>
            <button 
              className="clear-filter-btn"
              onClick={() => setMenuFilter({ name: "", category: "", minPrice: "", maxPrice: "" })}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {Object.keys(groupedMenu).map((cat) => (
              <div key={cat} className="category-section">
                <h3>{cat} ({groupedMenu[cat].length} items)</h3>
                <table border="1" cellPadding="6" width="100%">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Veg/Non-Veg</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedMenu[cat].map(({ row, sheetRow }, i) => (
                      <tr key={i}>
                        {row.map((c, j) => <td key={j}>{c}</td>)}
                        <td>
                          <button
                            onClick={() => {
                              setEditData({ 
                                rowIndex: sheetRow, 
                                values: [...row] 
                              });
                              setEditSheet("menu");
                            }}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteRow("menu", sheetRow, row[0])}
                            className="delete-btn"
                            disabled={isLoading("delete", sheetRow)}
                          >
                            {isLoading("delete", sheetRow) ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </>
        )}
      </>
    );
  };

  /* ================= ROOMS ================= */
  const renderRooms = () => {
    return (
      <div>
        <div className="filter-section">
          <h4>Filter Rooms</h4>
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by room name"
              value={roomFilter.name}
              onChange={(e) => setRoomFilter({...roomFilter, name: e.target.value})}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Min price"
              value={roomFilter.minPrice}
              onChange={(e) => setRoomFilter({...roomFilter, minPrice: e.target.value})}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Max price"
              value={roomFilter.maxPrice}
              onChange={(e) => setRoomFilter({...roomFilter, maxPrice: e.target.value})}
              className="filter-input"
            />
            <button 
              className="clear-filter-btn"
              onClick={() => setRoomFilter({ name: "", minPrice: "", maxPrice: "" })}
            >
              Clear Filters
            </button>
          </div>
          <p className="filter-results">
            {rooms.length === 0 
              ? "No rooms available" 
              : filteredRooms.length === 0 
                ? `No rooms found (${rooms.length} total rooms)` 
                : `Showing ${filteredRooms.length} of ${rooms.length} rooms`
            }
          </p>
        </div>

        <div className="add-room-section">
          <h3>Add New Room</h3>
          
          <div className="image-upload-section">
            <h4>Room Images</h4>
            
            {/* Drag and Drop Area */}
            <div
              onDrop={handleNewRoomImageDrop}
              onDragOver={(e) => e.preventDefault()}
              className="drop-area"
              style={{
                border: "2px dashed #6f4647",
                padding: "40px",
                textAlign: "center",
                marginBottom: "20px",
                cursor: "pointer"
              }}
            >
              <p>Drag & Drop Images Here</p>
              <p>or</p>
              <div className="browse-btn-container">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewRoomImageUpload}
                  id="new-room-images"
                  className="hidden-file-input"
                />
                <label htmlFor="new-room-images" className="browse-btn">
                  Browse Files
                </label>
              </div>
            </div>

            {newRoomImages.length > 0 && (
              <div className="image-previews">
                <h5>Image Previews:</h5>
                <div className="preview-grid">
                  {newRoomImages.map((img, index) => (
                    <div key={index} className="preview-item">
                      <img src={img} alt={`Preview ${index + 1}`} />
                      <button
                        onClick={() => {
                          setNewRoomImages(prev => prev.filter((_, i) => i !== index));
                          setNewRoomImageInputs(prev => prev.filter((_, i) => i !== index));
                        }}
                        className="remove-preview-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="url-inputs-section">
              <h5>Or Enter Image URLs:</h5>
              {newRoomImageInputs.map((url, index) => (
                <div key={index} className="url-input-row">
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    value={url}
                    onChange={(e) => updateNewRoomImageInput(index, e.target.value)}
                    className="url-input"
                  />
                  <button
                    onClick={() => removeNewRoomImageInput(index)}
                    className="remove-url-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addNewRoomImageInput}
                className="add-url-btn"
              >
                + Add Another URL
              </button>
            </div>
          </div>

          <form
            onSubmit={handleAddRoom}
            className="room-form"
          >
            <input
              type="text"
              name="name"
              placeholder="Room Name"
              required
              className="form-input"
            />
            <textarea
              name="description"
              placeholder="Room Description"
              required
              className="form-textarea"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              className="form-input"
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={addRoomLoading}
            >
              {addRoomLoading ? "Adding Room..." : "Add Room"}
            </button>
          </form>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="no-data-message">
            <p>No rooms found matching your filters.</p>
            <button 
              className="clear-filter-btn"
              onClick={() => setRoomFilter({ name: "", minPrice: "", maxPrice: "" })}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <h3>Existing Rooms</h3>
            {filteredRooms.map((room, idx) => {
              const roomId = room[0];
              const roomRow = rooms.findIndex(r => r[0] === room[0]) + 2;
              const roomImages = imagesByRoomId[roomId] || [];

              return (
                <div key={roomId} className="room-details-card">
                  <div className="room-header">
                    <h3 style={{ margin: 0 }}>{room[1]}</h3>
                    <div>
                      <button
                        onClick={() => {
                          setEditData({ 
                            rowIndex: roomRow, 
                            values: [...room] 
                          });
                          setEditSheet("rooms");
                        }}
                        className="edit-room-btn"
                      >
                        Edit Room Details
                      </button>
                      <button 
                        onClick={() => deleteRow("rooms", roomRow, roomId)}
                        className="delete-room-btn"
                        disabled={isLoading("delete", roomRow)}
                      >
                        {isLoading("delete", roomRow) ? "Deleting..." : "Delete Room"}
                      </button>
                    </div>
                  </div>

                  <table border="1" cellPadding="6" width="100%" style={{ marginBottom: 20 }}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {room.map((c, j) => <td key={j}>{c}</td>)}
                      </tr>
                    </tbody>
                  </table>

                  <div className="room-images-section">
                    <h4>Room Images</h4>
                    {roomImages.length === 0 ? (
                      <p>No images uploaded yet.</p>
                    ) : (
                      <div className="room-images-grid">
                        {roomImages.map((img, index) => (
                          <div key={index} className="room-image-item">
                            <img src={img} alt="" />
                            <button
                              className="remove-image-btn"
                              onClick={async () => {
                                if (!window.confirm("Delete this image?")) return;
                                const allRoomImages = roomImages || [];
                                const imgData = allRoomImages.find(r => r[2] === img);
                                if (imgData) {
                                  const imgIndex = allRoomImages.indexOf(imgData);
                                  await deleteRow("roomImages", imgIndex + 2, `image-${imgIndex}`);
                                }
                              }}
                              disabled={isLoading("delete", `image-${index}`)}
                            >
                              {isLoading("delete", `image-${index}`) ? "..." : "×"}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="add-more-images">
                      <h5>Add More Images:</h5>
                      <div
                        onDrop={(e) => {
                          e.preventDefault();
                          handleRoomImagesUpload(e.dataTransfer.files, roomId);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className="drop-area"
                      >
                        <p>Drag & Drop Images Here</p>
                        <p>or</p>
                        <div className="browse-btn-container">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleRoomImagesUpload(e.target.files, roomId)}
                            id={`room-images-${roomId}`}
                            className="hidden-file-input"
                          />
                          <label 
                            htmlFor={`room-images-${roomId}`} 
                            className={`browse-btn ${isLoading("add", `room-images-${roomId}`) ? "disabled" : ""}`}
                          >
                            {isLoading("add", `room-images-${roomId}`) ? "Uploading..." : "Browse Files"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  };

  /* ================= IMAGES TABLE ================= */
  const renderImages = () => {
    return (
      <>
        <h3>Add Image</h3>
  
        {/* Image Title */}
        <input
          type="text"
          placeholder="Image Title"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
  
        {/* Image URL */}
        <input
          type="text"
          placeholder="Or enter Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
  
        {/* URL Preview */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ width: 120, marginBottom: 10 }}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
  
        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
          style={{ marginBottom: 10 }}
        />
  
        {/* Add Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <button
            onClick={() => {
              if (!selectedImage && !imageUrl) {
                alert("Please select an image or enter an image URL");
                return;
              }
  
              handleImageUpload(selectedImage, imageTitle, imageUrl);
  
              setSelectedImage(null);
              setImageTitle("");
              setImageUrl("");
            }}
            style={{
              background: "transparent",
              color: "#6f4647",
              padding: "16px 32px",
              border: "1px solid #6f4647",
              cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              transition: "all 0.4s ease",
              minWidth: 160
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#6f4647";
              e.target.style.color = "#fff";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#6f4647";
              e.target.style.transform = "translateY(0)";
            }}
            disabled={uploadLoading}
          >
            {uploadLoading ? "Uploading..." : "Add Image"}
          </button>
        </div>
  
        {/* Image Filter */}
        <div className="filter-section">
          <h4>Filter Images</h4>
          <input
            type="text"
            placeholder="Search by title"
            value={imageFilter.title}
            onChange={(e) => setImageFilter({...imageFilter, title: e.target.value})}
            className="filter-input"
            style={{ width: "100%", padding: 8, marginBottom: 20 }}
          />
        </div>
  
        {/* Images Table - Now using filteredImages */}
        <h3>Images ({filteredImages.length})</h3>
  
        {filteredImages.length === 0 ? (
          <p>No images found</p>
        ) : (
          <table border="1" cellPadding="6" width="100%">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((img, i) => {
                const rowIndex = images.findIndex(image => image[0] === img[0]) + 2;
                return (
                  <tr key={img[0]}>
                    <td>
                      <img
                        src={img[1]}
                        alt=""
                        style={{ width: 80, objectFit: "cover" }}
                      />
                    </td>
                    <td>{img[2]}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteRow("images", rowIndex, img[0])}
                        disabled={isLoading("delete", rowIndex)}
                      >
                        {isLoading("delete", rowIndex) ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  };

  /* ================= OFFERS TABLE ================= */
  const renderOffers = () => {
    return (
      <>
        <div className="filter-section">
          <h4>Filter Offers</h4>
          <div className="toggle-buttons">
            <button 
              className={`toggle-btn ${offerFilter === "all" ? "active" : ""}`}
              onClick={() => setOfferFilter("all")}
            >
              All Offers ({offers.length})
            </button>
            <button 
              className={`toggle-btn ${offerFilter === "active" ? "active" : ""}`}
              onClick={() => setOfferFilter("active")}
            >
              Active ({offers.filter(o => o[3]?.toLowerCase() === "active").length})
            </button>
            <button 
              className={`toggle-btn ${offerFilter === "inactive" ? "active" : ""}`}
              onClick={() => setOfferFilter("inactive")}
            >
              Inactive ({offers.filter(o => o[3]?.toLowerCase() !== "active").length})
            </button>
          </div>
          <p className="filter-results">
            {offers.length === 0 
              ? "No offers available" 
              : filteredOffers.length === 0 
                ? `No offers found (${offers.length} total offers)` 
                : `Showing ${filteredOffers.length} offers`
            }
          </p>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="no-data-message">
            <p>No offers found matching your filters.</p>
            <button 
              className="clear-filter-btn"
              onClick={() => setOfferFilter("all")}
            >
              Show All Offers
            </button>
          </div>
        ) : (
          <table border="1" cellPadding="6" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer, i) => {
                const status = offer[3] || "inactive";
                const rowIndex = offers.findIndex(o => o[0] === offer[0]) + 2;
                
                return (
                  <tr key={i}>
                    <td>{offer[0]}</td>
                    <td>{offer[1]}</td>
                    <td>{offer[2]}</td>
                    <td>
                      <button
                        onClick={() => toggleOfferStatus(offer, rowIndex)}
                        className={`status-toggle ${status === "active" ? "active" : "inactive"}`}
                        disabled={isLoading("update", `offer-${rowIndex}`)}
                      >
                        {isLoading("update", `offer-${rowIndex}`) 
                          ? "Updating..." 
                          : status === "active" ? "Active" : "Inactive"
                        }
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setEditData({
                            rowIndex: rowIndex,
                            values: [...offer],
                          });
                          setEditSheet("offers");
                        }}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteRow("offers", rowIndex, offer[0])}
                        className="delete-btn"
                        disabled={isLoading("delete", rowIndex)}
                      >
                        {isLoading("delete", rowIndex) ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  };

  /* ================= REVIEWS ================= */
  const renderReviews = () => {
    return (
      <>
        {reviews.length === 0 ? (
          <div className="no-data-message">
            <p>No reviews available.</p>
          </div>
        ) : (
          <table border="1" cellPadding="6" width="100%">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, i) => {
                const rowIndex = i + 2;
                return (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j}>
                        {j === 3 ? "★".repeat(c) : c}
                      </td>
                    ))}
                    <td>
                      <button 
                        onClick={() => deleteRow("reviews", rowIndex, r[0])}
                        className="delete-btn"
                        disabled={isLoading("delete", rowIndex)}
                      >
                        {isLoading("delete", rowIndex) ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  };

  /* ================= UI ================= */
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="tab-buttons">
        {["menu","rooms","images","offers","reviews","password"].map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t)}
            className={`tab-btn ${tab === t ? "active" : ""}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tab === "menu" && (
          <>
            <AddForm 
              sheetName="menu" 
              onAdded={refreshData} 
              loading={isLoading("add", "menu")} 
            />
            {renderMenu()}
          </>
        )}

        {tab === "rooms" && renderRooms()}

        {tab === "images" && renderImages()}

        {tab === "offers" && (
          <>
            <AddForm 
              sheetName="offers" 
              onAdded={refreshData} 
              loading={isLoading("add", "offers")} 
            />
            {renderOffers()}
          </>
        )}

        {tab === "reviews" && renderReviews()}

        {tab === "password" && (
          <div className="password-section">
            <input
              type="password"
              placeholder="New password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="password-input"
            />
            <button 
              onClick={changeAdminPassword} 
              className="update-password-btn"
              disabled={isLoading("update", "password")}
            >
              {isLoading("update", "password") ? "Updating..." : "Update Password"}
            </button>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editData && editSheet && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit {editSheet} Data</h3>
            
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await submitEdit();
              }}
              className="edit-form"
            >
              {editData.values.map((v, i) => (
                <div key={i} className="form-group">
                  <label>
                    {editSheet === "rooms" 
                      ? ["ID", "Name", "Description", "Price"][i] || `Field ${i + 1}`
                      : editSheet === "menu"
                      ? ["ID", "Category", "Name", "Price"][i] || `Field ${i + 1}`
                      : editSheet === "images"
                      ? ["ID", "Image URL", "Title"][i] || `Field ${i + 1}`
                      : editSheet === "offers"
                      ? ["ID", "Title", "Description", "Status"][i] || `Field ${i + 1}`
                      : `Field ${i + 1}`
                    }
                  </label>
                  {(editSheet === "rooms" && i === 2) || (editSheet === "images" && i === 2) ? (
                    <textarea
                      value={v}
                      onChange={(e) => {
                        const updated = [...editData.values];
                        updated[i] = e.target.value;
                        setEditData({ ...editData, values: updated });
                      }}
                      className="form-textarea"
                    />
                  ) : editSheet === "offers" && i === 3 ? (
                    <select
                      value={v}
                      onChange={(e) => {
                        const updated = [...editData.values];
                        updated[i] = e.target.value;
                        setEditData({ ...editData, values: updated });
                      }}
                      className="form-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <input
                      type={editSheet === "rooms" && i === 3 ? "number" : "text"}
                      value={v}
                      onChange={(e) => {
                        const updated = [...editData.values];
                        updated[i] = e.target.value;
                        setEditData({ ...editData, values: updated });
                      }}
                      className="form-input"
                    />
                  )}
                </div>
              ))}
              
              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isLoading("update", editData.rowIndex)}
                >
                  {isLoading("update", editData.rowIndex) ? "Updating..." : "Update"}
                </button>
                <button type="button" onClick={() => setEditData(null)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}