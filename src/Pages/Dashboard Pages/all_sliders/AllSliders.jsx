import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import AddOffersForm from "./AddSliders";
import Swal from "sweetalert2";
import "./Sliders.css";
import {
  useCreateCountryMutation,
  useDeleteCountryMutation,
  useGetCountriesQuery,
  useUpdateCountryMutation,
} from "../../../api/sliders";

const AllSliders = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const { data: offers, refetch } = useGetCountriesQuery();
  const [createOffer] = useCreateCountryMutation();
  const [updateOffer] = useUpdateCountryMutation();
  const [deleteOffer] = useDeleteCountryMutation();
  const [isSidebarOpen] = useState(true);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingOffer) {
        // تعديل → JSON
        const dataToSend = {
          title: formData.title,
          description: formData.description,
          discount: formData.discount,
          imageUrl: formData.imageUrl, // رابط الصورة موجود مسبقًا
        };

        await updateOffer({
          id: editingOffer.id, // id في الرابط
          updatedCountry: dataToSend,
        }).unwrap();
      } else {
        // إنشاء جديد → FormData
        const dataToSend = new FormData();
        dataToSend.append("title", formData.title);
        dataToSend.append("description", formData.description);
        dataToSend.append("discount", formData.discount);
        if (formData.image) dataToSend.append("image", formData.image);

        await createOffer(dataToSend).unwrap();
      }

      setShowPopup(false);
      setEditingOffer(null);
      refetch();
    } catch (err) {
      console.error("Failed to save offer:", err);
      Swal.fire("خطأ!", "حدث خطأ أثناء حفظ البيانات", "error");
    }
  };

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    setShowPopup(true);
  };

  const handleDeleteOffer = async (offerId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "الغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOffer(offerId).unwrap();
          Swal.fire("تم الحذف!", "تم حذف الاسلايدر  بنجاح.", "success");
          refetch();
        } catch (err) {
          Swal.fire("خطأ!", "حدث خطأ أثناء محاولة حذف الاسلايدر .", "error");
        }
      }
    });
  };

  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only");
  }, []);

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav isSidebarOpen={isSidebarOpen} />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="كل اسلايدر " icon="fa fa-tag" />
          </div>

          <div className="add-country mb-3">
            <button
              className="btn add-btn btn-gradient-primary"
              onClick={() => setShowPopup(true)}
            >
              اضافة اسلايدر  جديد
              <i className="fa fa-plus ms-2"></i>
            </button>
          </div>

          {/* Popup form */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowPopup(false);
                    setEditingOffer(null);
                  }}
                >
                  &times;
                </button>
                <h4 className="card-title mb-4">
                  {editingOffer ? "تعديل الاسلايدر " : "نموذج إضافة اسلايدر  جديد"}
                </h4>
                <AddOffersForm
                  onSubmit={handleFormSubmit}
                  initialData={editingOffer}
                  isEdit={!!editingOffer}
                />
              </div>
            </div>
          )}

          {/* جدول اسلايدر  اسلايدر  */}
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card p-3">
                <h3 className="latest_users mt-2 mb-3 text-center">
                  <i className="fa fa-angle-double-left"></i>
                  كل اسلايدر 
                  <i className="fa fa-angle-double-right"></i>
                  <hr />
                </h3>
                <div className="table-responsive">
                  <table className="table text-center table-hover">
                    <thead className="table-dark">
                      <tr style={{ fontWeight: "bold" }}>
                        <th>#</th>
                        <th>العنوان</th>
                        <th>الوصف</th>
                        <th>الخصم</th>
                        <th>الصورة</th>
                        <th>اجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offers?.map((offer, index) => (
                        <tr key={offer.id}>
                          <td>{index + 1}</td>
                          <td>{offer.title}</td>
                          <td>{offer.description}</td>
                          <td>{offer.discount}%</td>
                          <td>
                            <img
                              src={offer.imageUrl}
                              alt={offer.title}
                              style={{
                                width: "70px",
                                height: "70px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>
                            <button
                              className="btn text-success me-1"
                              onClick={() => handleEditOffer(offer)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <button
                              className="btn text-danger"
                              onClick={() => handleDeleteOffer(offer.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
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

export default AllSliders;
