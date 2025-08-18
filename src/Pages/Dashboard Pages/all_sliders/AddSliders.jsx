import React, { useState, useEffect } from "react";

const AddSlidersForm = ({ onSubmit, initialData, isEdit }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    discount: initialData?.discount || "",
    image: null,
    imageUrl: initialData?.imageUrl || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        discount: initialData.discount,
        image: null,
        imageUrl: initialData.imageUrl,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType={isEdit ? undefined : "multipart/form-data"}
    >
      <div className="form-group">
        <label>العنوان</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>لنك</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>الخصم (%)</label>
        <input
          type="number"
          name="discount"
          className="form-control"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>

      {!isEdit && (
        <div className="form-group">
          <label>الصورة</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      )}

      {isEdit && formData.imageUrl && (
        <div className="form-group">
          <label>الصورة الحالية</label>
          <img
            src={formData.imageUrl}
            alt="Current"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}

      <button type="submit" className="btn btn-gradient-primary mt-3">
        حفظ
      </button>
    </form>
  );
};

export default AddSlidersForm;
