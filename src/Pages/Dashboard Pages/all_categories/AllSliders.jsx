import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import Swal from "sweetalert2";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../api/categoriesApi";

const AllCategories = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const { data: dataAr, refetch: refetchAr } = useGetCategoriesQuery("ar");
  const { data: dataEn, refetch: refetchEn } = useGetCategoriesQuery("en");

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    isActive: true,
  });


  const categories = (dataAr?.data || []).map((catAr) => {
    const catEn = (dataEn?.data || []).find((cat) => cat.id === catAr.id);
    return {
      id: catAr.id,
      name_ar: catAr.name || "",
      name_en: catEn?.name || "",
      description_ar: catAr.description || "",
      description_en: catEn?.description || "",
      isActive: catAr.isActive,
    };
  });

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: { ar: formData.name_ar, en: formData.name_en },
      description: { ar: formData.description_ar, en: formData.description_en },
      isActive: formData.isActive,
    };

    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory.id,
          updatedCategory: body,
        }).unwrap();
        Swal.fire("تم التحديث!", "تم تعديل الفئة بنجاح", "success");
      } else {
        await createCategory(body).unwrap();
        Swal.fire("تم الإضافة!", "تمت إضافة الفئة بنجاح", "success");
      }

      setShowPopup(false);
      setEditingCategory(null);
      setFormData({
        name_ar: "",
        name_en: "",
        description_ar: "",
        description_en: "",
        isActive: true,
      });

      // ✅ إعادة تحميل البيانات
      refetchAr();
      refetchEn();
    } catch (error) {
      console.error("Error saving category:", error);
      Swal.fire("خطأ!", "حدث خطأ أثناء حفظ الفئة", "error");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name_ar: category.name_ar,
      name_en: category.name_en,
      description_ar: category.description_ar,
      description_en: category.description_en,
      isActive: category.isActive,
    });
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من استعادة هذه الفئة بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id).unwrap();
          Swal.fire("تم الحذف!", "تم حذف الفئة بنجاح.", "success");
          refetchAr();
          refetchEn();
        } catch (error) {
          Swal.fire("خطأ!", "حدث خطأ أثناء الحذف.", "error");
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
            <PageHeader name="جميع الفئات" icon="fa fa-list" />
          </div>

          <div className="add-country mb-3">
            <button
              className="btn add-btn btn-gradient-primary"
              onClick={() => setShowPopup(true)}
            >
              إضافة فئة جديدة
              <i className="fa fa-plus ms-2"></i>
            </button>
          </div>


          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowPopup(false);
                    setEditingCategory(null);
                    setFormData({
                      name_ar: "",
                      name_en: "",
                      description_ar: "",
                      description_en: "",
                      isActive: true,
                    });
                  }}
                >
                  &times;
                </button>
                <h4 className="card-title mb-4">
                  {editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}
                </h4>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">الاسم (عربي)</label>
                    <input
                      type="text"
                      name="name_ar"
                      value={formData.name_ar}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">الاسم (إنجليزي)</label>
                    <input
                      type="text"
                      name="name_en"
                      value={formData.name_en}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">الوصف (عربي)</label>
                    <textarea
                      name="description_ar"
                      value={formData.description_ar}
                      onChange={handleInputChange}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">الوصف (إنجليزي)</label>
                    <textarea
                      name="description_en"
                      value={formData.description_en}
                      onChange={handleInputChange}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      id="isActive"
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      نشط
                    </label>
                  </div>

                  <button type="submit" className="btn btn-gradient-primary">
                    {editingCategory ? "تحديث" : "حفظ"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ✅ جدول الفئات */}
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card p-3">
                <h3 className="latest_users mt-2 mb-3 text-center">
                  <i className="fa fa-angle-double-left"></i> قائمة الفئات{" "}
                  <i className="fa fa-angle-double-right"></i>
                  <hr />
                </h3>
                <div className="table-responsive">
                  <table className="table text-center table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>الاسم (عربي)</th>
                        <th>الاسم (إنجليزي)</th>
                        <th>الوصف (عربي)</th>
                        <th>الوصف (إنجليزي)</th>
                        <th>الحالة</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((cat, index) => (
                          <tr key={cat.id}>
                            <td>{index + 1}</td>
                            <td>{cat.name_ar || "—"}</td>
                            <td>{cat.name_en || "—"}</td>
                            <td>{cat.description_ar || "—"}</td>
                            <td>{cat.description_en || "—"}</td>
                            <td>
                              {cat.isActive ? (
                                <span className="badge bg-success">نشط</span>
                              ) : (
                                <span className="badge bg-secondary">
                                  متوقف
                                </span>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn text-success me-2"
                                onClick={() => handleEdit(cat)}
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="btn text-danger"
                                onClick={() => handleDelete(cat.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">لا توجد فئات حالياً</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
