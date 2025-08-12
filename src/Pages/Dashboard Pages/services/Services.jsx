import { useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useGetServicesQuery } from "../../../api/servicesSlice";

const Services = () => {
  const { data, isLoading, error } = useGetServicesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const services = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
    ? data.products
    : [];

  const totalPages = Math.ceil(services.length / itemsPerPage);

  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditService = (service) => {
    console.log("Edit service:", service);
    // TODO: افتح مودال التعديل هنا
  };

  const handleDeleteService = (id) => {
    console.log("Delete service ID:", id);
    // TODO: نفذ الحذف هنا
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="كل الكبونات" icon="fa fa-cogs" />
          </div>

          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i className="fa fa-angle-double-left"></i>
                    كل المنتجات
                    <i className="fa fa-angle-double-right"></i>
                    <hr />
                  </h3>

                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="center-loader">
                        <div className="loader"></div>
                      </div>
                    ) : error ? (
                      <div className="text-danger text-center">
                        Error loading services
                      </div>
                    ) : services.length === 0 ? (
                      <div className="text-center">لا يوجد بيانات</div>
                    ) : (
                      <>
                        <table className="table text-center table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>#</th>
                              <th>الاسم</th>
                              <th>الصورة/الفيديو</th>
                              <th>الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedServices.map((service, index) => {
                              const isVideo =
                                service.mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

                              return (
                                <tr key={service.id}>
                                  {/* رقم الترتيب */}
                                  <td>
                                    {(currentPage - 1) * itemsPerPage +
                                      index +
                                      1}
                                  </td>

                                  {/* اسم المنتج */}
                                  <td>{service.title}</td>

                                  {/* صورة أو فيديو صغير */}
                                  <td>
                                    {isVideo ? (
                                      <video
                                        src={service.mediaUrl}
                                        style={{
                                          width: "70px",
                                          height: "70px",
                                          objectFit: "cover",
                                          borderRadius: "6px",
                                          backgroundColor: "#000",
                                        }}
                                        muted
                                      />
                                    ) : (
                                      <img
                                        src={service.mediaUrl}
                                        alt={service.title}
                                        style={{
                                          width: "70px",
                                          height: "70px",
                                          objectFit: "cover",
                                          borderRadius: "6px",
                                        }}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="d-flex justify-content-center mt-3">
                          <nav>
                            <ul className="pagination">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(currentPage - 1)
                                  }
                                >
                                  السابق
                                </button>
                              </li>

                              {Array.from({ length: totalPages }, (_, i) => (
                                <li
                                  key={i}
                                  className={`page-item ${
                                    currentPage === i + 1 ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(i + 1)}
                                  >
                                    {i + 1}
                                  </button>
                                </li>
                              ))}

                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(currentPage + 1)
                                  }
                                >
                                  التالي
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
