import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import AddLogoForm from "./AddLogo";
import Swal from "sweetalert2";
import "./Offers.css";
import { useCreateFaqMutation, useGetFaqsQuery } from "../../../api/logo";

const Logo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const { data: logo, refetch } = useGetFaqsQuery();
  const [createLogo] = useCreateFaqMutation();
  const [isSidebarOpen] = useState(true);
  console.log(
    "Full image URL:",
    `https://api-gateway.camion-app.com${logo?.path}`
  );

  const handleFormSubmit = async (formData) => {
    try {
      await createLogo(formData).unwrap();
      setShowPopup(false);
      setEditingLogo(null);
      refetch();
    } catch (err) {
      console.error("Failed to save logo:", err);
      Swal.fire("خطأ!", "حدث خطأ أثناء حفظ اللوجو", "error");
    }
  };

  const handleEditLogo = (logoData) => {
    setEditingLogo(logoData);
    setShowPopup(true);
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
            <PageHeader name="اللوجو" icon="fa fa-tag" />
          </div>

          <div className="add-country mb-3">
            <button
              className="btn add-btn btn-gradient-primary"
              onClick={() => setShowPopup(true)}
            >
              {logo?.path ? "تعديل اللوجو" : "إضافة لوجو جديد"}
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
                    setEditingLogo(null);
                  }}
                >
                  &times;
                </button>
                <h4 className="card-title mb-4">
                  {editingLogo ? "تعديل اللوجو" : "إضافة لوجو جديد"}
                </h4>
                <AddLogoForm
                  onSubmit={handleFormSubmit}
                  initialData={editingLogo}
                  isEdit={!!editingLogo}
                />
              </div>
            </div>
          )}

          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card p-3">
                <h3 className="latest_users mt-2 mb-3 text-center">
                  <i className="fa fa-angle-double-left"></i>
                  اللوجو
                  <i className="fa fa-angle-double-right"></i>
                  <hr />
                </h3>
                <div className="table-responsive">
                  <table className="table text-center table-hover">
                    <thead className="table-dark">
                      <tr style={{ fontWeight: "bold" }}>
                        <th>#</th>
                        <th>اللوجو</th>
                        <th>إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logo?.path ? (
                        <tr>
                          <td>1</td>
                          <td>
                            <img
                              src={`https://api-gateway.camion-app.com${logo?.path}`}
                              alt="Company Logo"
                              style={{ width: "150px", objectFit: "cover" }}
                            />
                          </td>
                          <td>
                            <button
                              className="btn text-success me-1"
                              onClick={() => handleEditLogo(logo)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="3">لا يوجد لوجو مضاف بعد</td>
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

export default Logo;
