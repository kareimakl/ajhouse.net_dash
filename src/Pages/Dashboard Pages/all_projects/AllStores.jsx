import React, { useState, useEffect } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import Swal from "sweetalert2";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../../api/projectsApi";
import { useGetCategoriesQuery } from "../../../api/categoriesApi"; 

const AllProjects = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const { data, refetch } = useGetProjectsQuery("en");
  const { data: categoriesData } = useGetCategoriesQuery("en");

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const projects = data?.data || [];
  const categories = categoriesData?.data || [];

  const [formData, setFormData] = useState({
    title_en: "",
    description_en: "",
    title_ar: "",
    description_ar: "",
    categoryId: "",
    image: null,
    projectUrl: "",
  });

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title[en]", formData.title_en);
    formDataToSend.append("description[en]", formData.description_en);
    formDataToSend.append("title[ar]", formData.title_ar);
    formDataToSend.append("description[ar]", formData.description_ar);
    formDataToSend.append("projectUrl", formData.projectUrl);
    formDataToSend.append("categoryId", formData.categoryId);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingProject) {
        await updateProject({
          id: editingProject.id,
          updatedProject: formDataToSend,
        }).unwrap();
        Swal.fire("تم التحديث!", "تم تعديل المشروع بنجاح", "success");
      } else {
        await createProject(formDataToSend).unwrap();
        Swal.fire("تم الإضافة!", "تمت إضافة المشروع بنجاح", "success");
      }

      setShowPopup(false);
      setEditingProject(null);
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("خطأ!", "حدث خطأ أثناء الحفظ", "error");
    }
  };

  // Edit project
  const handleEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      title_en: proj.title,
      description_en: proj.description,
      title_ar: "", 
      description_ar: "",
      categoryId: proj.categoryId,
      image: null,
      projectUrl: proj.projectUrl,
    });
    setShowPopup(true);
  };

  // Delete project
  const handleDelete = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن يمكنك التراجع بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProject(id).unwrap();
          Swal.fire("تم الحذف!", "تم حذف المشروع بنجاح", "success");
          refetch();
        } catch {
          Swal.fire("خطأ!", "حدث خطأ أثناء الحذف", "error");
        }
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="جميع المشاريع" icon="fa fa-briefcase" />
          </div>

          <div className="add-country mb-3">
            <button
              className="btn add-btn btn-gradient-primary"
              onClick={() => setShowPopup(true)}
            >
              إضافة مشروع جديد
              <i className="fa fa-plus ms-2"></i>
            </button>
          </div>

          {/* Popup */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                >
                  &times;
                </button>

                <h4 className="card-title mb-4">
                  {editingProject ? "تعديل المشروع" : "إضافة مشروع جديد"}
                </h4>

                <form onSubmit={handleFormSubmit}>
                  {/* English */}
                  <div className="mb-3">
                    <label>العنوان (EN)</label>
                    <input
                      type="text"
                      name="title_en"
                      className="form-control"
                      value={formData.title_en}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>الوصف (EN)</label>
                    <textarea
                      name="description_en"
                      className="form-control"
                      value={formData.description_en}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Arabic */}
                  <div className="mb-3">
                    <label>العنوان (AR)</label>
                    <input
                      type="text"
                      name="title_ar"
                      className="form-control"
                      value={formData.title_ar}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>الوصف (AR)</label>
                    <textarea
                      name="description_ar"
                      className="form-control"
                      value={formData.description_ar}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <label>الفئة</label>
                    <select
                      name="categoryId"
                      className="form-select"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">اختر الفئة</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* URL */}
                  <div className="mb-3">
                    <label>رابط المشروع</label>
                    <input
                      type="text"
                      name="projectUrl"
                      className="form-control"
                      value={formData.projectUrl}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Image */}
                  <div className="mb-3">
                    <label>صورة المشروع</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-gradient-primary">
                    {editingProject ? "تحديث" : "حفظ"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="table-responsive mt-4">
            <table className="table text-center table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>الصورة</th>
                  <th>العنوان</th>
                  <th>الوصف</th>
                  <th>الفئة</th>
                  <th>الرابط</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj, i) => (
                  <tr key={proj.id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:4000${proj.image}`}
                        alt="project"
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{proj.title}</td>
                    <td>{proj.description}</td>
                    <td>{proj.category?.name || "—"}</td>
                    <td>
                      {proj.projectUrl ? (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          فتح
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn text-success me-2"
                        onClick={() => handleEdit(proj)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn text-danger"
                        onClick={() => handleDelete(proj.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="7">لا توجد مشاريع حالياً</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
