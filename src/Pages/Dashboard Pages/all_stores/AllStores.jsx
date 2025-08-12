import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import AddCountriesForm from "./AddStore";
import Swal from "sweetalert2";
import "./Stores.css";
import {
  useCreateCountryMutation,
  useDeleteCountryMutation,
  useGetCountriesQuery,
  useUpdateCountryMutation,
} from "../../../api/stories";

const AllStores = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const { data: countries, refetch } = useGetCountriesQuery();
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();
  const [isSidebarOpen] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState({});

  const [storyVideo, setStoryVideo] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleFormSubmit = async (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("mediaFile", formData.mediaFile);

    try {
      if (editingCountry) {
        await updateCountry({
          id: editingCountry.id,
          updatedCountry: formDataToSend,
        }).unwrap();
        refetch();
        setShowPopup(false);
      } else {
        await createCountry(formDataToSend).unwrap();
      }
      setShowPopup(false);
      refetch();
    } catch (err) {
      console.error("Failed to save country:", err);
    }
  };

  const handleEditCountry = (country) => {
    setEditingCountry(country);
    setShowPopup(true);
  };

  const handleDeleteCountry = async (countryId) => {
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
          await deleteCountry(countryId).unwrap();
          Swal.fire("تم الحذف!", "تم حذف الدولة بنجاح.", "success");
          refetch();
        } catch (err) {
          Swal.fire("خطأ!", "حدث خطأ أثناء محاولة حذف الدولة.", "error");
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
            <PageHeader name="كل الاستوري " icon="fa fa-globe" />
          </div>
          <div className="add-country">
            <button
              className="btn add-btn btn-gradient-primary"
              onClick={() => setShowPopup(true)}
            >
              اضافة استوري جديد
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>

          {/* Popup form */}
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
                  {editingCountry ? "تعديل الدولة" : "نموذج اضافة خدمه جديد"}
                </h4>
                <AddCountriesForm
                  onSubmit={handleFormSubmit}
                  initialData={editingCountry}
                  isEditMode={editingCountry !== null}
                />
              </div>
            </div>
          )}

          {/* جدول عرض الاستوري */}
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left"></i>
                    كل الاستوري
                    <i className="fa fa-angle-double-right"></i>
                    <hr />
                  </h3>
                  <div className="table-responsive">
                    <table className="table text-center table-hover">
                      <thead className="table-dark">
                        <tr style={{ fontWeight: "bold" }}>
                          <th>#</th>
                          <th>الاسم</th>
                          <th>الصورة/الفيديو</th>
                          <th>اجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {countries?.map((story, index) => {
                          const isVideo = story.mediaUrl?.match(
                            /\.(mp4|mov|avi|webm)$/i
                          );

                          return (
                            <tr key={story.id}>
                              <td>{index + 1}</td>
                              <td>{story.title}</td>
                              <td>
                                {isVideo ? (
                                  <div>
                                    <video
                                      style={{ borderRadius: "50%" }}
                                      width="70"
                                      height="70"
                                      controls
                                      onLoadedData={() =>
                                        setVideoLoaded((prev) => ({
                                          ...prev,
                                          [story.id]: true,
                                        }))
                                      }
                                    >
                                      <source
                                        src={story.mediaUrl}
                                        type="video/mp4"
                                      />
                                      متصفحك لا يدعم تشغيل الفيديو
                                    </video>

                                    {!videoLoaded[story.id] && (
                                      <div
                                        style={{
                                          width: "100%",
                                          background: "#ddd",
                                          height: "4px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "100%",
                                            height: "4px",
                                            background: "#4caf50",
                                            animation:
                                              "loadingAnim 1s infinite linear",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <img
                                    src={story.mediaUrl}
                                    alt="story"
                                    style={{
                                      width: "70px",
                                      height: "70px",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </td>
                              <td>
                                <button
                                  className="btn text-success"
                                  title="تعديل"
                                  onClick={() => handleEditCountry(story)}
                                  disabled={isVideo && !videoLoaded[story.id]}
                                >
                                  <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                <button
                                  className="btn text-danger"
                                  onClick={() => handleDeleteCountry(story.id)}
                                  title="حذف"
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* مودال عرض الفيديو كستوري */}
          {storyVideo && (
            <div className="story-modal">
              <div
                className="story-backdrop"
                onClick={() => setStoryVideo(null)}
              ></div>
              <div className="story-content">
                {loadingProgress < 100 && (
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                )}
                <video
                  src={storyVideo}
                  autoPlay
                  controls
                  style={{ maxHeight: "90vh", maxWidth: "90vw" }}
                  onLoadedData={() => setLoadingProgress(100)}
                  onProgress={(e) => {
                    if (e.target.buffered.length > 0) {
                      const loaded = e.target.buffered.end(0);
                      const total = e.target.duration;
                      setLoadingProgress((loaded / total) * 100);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS داخلي سريع */}
      <style>{`
        .story-modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        }
        .story-backdrop {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.7);
        }
        .story-content {
          position: relative;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .progress-bar {
          position: absolute;
          top: -10px;
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.3);
        }
        .progress-fill {
          height: 100%;
          background: #ffcc00;
          transition: width 0.2s;
        }
      `}</style>
    </div>
  );
};

export default AllStores;
