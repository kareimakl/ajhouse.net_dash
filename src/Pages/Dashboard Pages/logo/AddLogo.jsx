import React, { useState, useEffect } from "react";

const BASE_URL = "https://api-gateway.camion-app.com";

const AddLogo = ({ onSubmit, initialData, isEdit }) => {
  const [formData, setFormData] = useState({
    logo: null,
    logoUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        logo: null,
        logoUrl: initialData.path ? `${initialData.path}` : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({
      ...prev,
      logo: files ? files[0] : null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.logo) {
      data.append("logo", formData.logo);
    } else if (isEdit && formData.logoUrl) {
      // لو اللوجو ما اتغيرش نحافظ على الـ path
      data.append("path", formData.logoUrl.replace(""));
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label>اللوجو</label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      {isEdit && formData.logoUrl && (
        <div className="form-group mt-2">
          <label>اللوجو الحالي</label>
          <div>
            <img
              src={formData.logoUrl}
              alt="Current Logo"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-gradient-primary mt-3">
        حفظ
      </button>
    </form>
  );
};

export default AddLogo;
