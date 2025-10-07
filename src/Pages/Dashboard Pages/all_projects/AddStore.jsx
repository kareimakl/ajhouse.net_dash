import React, { useState } from "react";

const AddStoryForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    mediaFile: null,
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "العنوان مطلوب";
    if (!formData.description) newErrors.description = "الوصف مطلوب";
    if (!formData.mediaFile && !initialData)
      newErrors.mediaFile = "الصورة أو الفيديو مطلوب";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await onSubmit(formData);
      console.log("Form submitted successfully", formData);
      setFormData({
        title: "",
        description: "",
        mediaFile: null,
      });
      setError({});
    }
  };

  return (
    <form
      className="forms-sample"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="form-group col-sm-12">
        <div className="row">
          {/* Title */}
          <div className="col-sm-6 my-2">
            <label htmlFor="title">العنوان</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="ادخل العنوان"
              value={formData.title}
              onChange={handleChange}
            />
            {error.title && <p className="text-danger">{error.title}</p>}
          </div>

          {/* Media File */}
          <div className="col-sm-6 my-2">
            <label htmlFor="mediaFile">الصورة أو الفيديو</label>
            <input
              type="file"
              className="form-control"
              id="mediaFile"
              name="mediaFile"
              accept="image/*,video/*"
              onChange={handleChange}
            />

            {/* Preview uploaded media */}
            {formData.mediaFile && (
              <>
                {formData.mediaFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(formData.mediaFile)}
                    alt={formData.title}
                    className="img-fluid mt-2"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(formData.mediaFile)}
                    controls
                    className="img-fluid mt-2"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </>
            )}
            {initialData?.mediaUrl && !formData.mediaFile && (
              <>
                {initialData.mediaType === "photo" ? (
                  <img
                    src={initialData.mediaUrl}
                    alt={initialData.title}
                    className="img-fluid mt-2"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <video
                    src={initialData.mediaUrl}
                    controls
                    className="img-fluid mt-2"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </>
            )}
            {error.mediaFile && (
              <p className="text-danger">{error.mediaFile}</p>
            )}
          </div>

          {/* Description */}
          <div className=" my-2">
            <label htmlFor="description">الوصف</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="ادخل وصف القصة"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
            {error.description && (
              <p className="text-danger">{error.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button type="submit" className="btn btn-gradient-primary me-2">
          حفظ
        </button>
      </div>
    </form>
  );
};

export default AddStoryForm;
